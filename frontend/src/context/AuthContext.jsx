import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, unwrap } from '../api/client.js';
import { INDIAN_CITIES, findNearestIndianCity } from '../utils/indianCities.js';

const AuthContext = createContext(null);

const DEFAULT_LOCATION = {
  city: 'Mumbai',
  state: 'Maharashtra',
  lat: 19.0760,
  lng: 72.8777,
  isDetected: false,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('revora_user') || 'null'); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('revora_token'));

  const [location, setLocation] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('revora_location') || 'null');
      if (saved && saved.city) return saved;
    } catch {}
    if (user && user.city) {
      const match = INDIAN_CITIES.find((c) => c.name.toLowerCase() === user.city.toLowerCase());
      return {
        city: user.city,
        state: match?.state || 'India',
        lat: user.lat ?? match?.lat ?? 19.0760,
        lng: user.lng ?? match?.lng ?? 72.8777,
        isDetected: false,
      };
    }
    return DEFAULT_LOCATION;
  });

  const persist = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('revora_user', JSON.stringify(payload.user));
    localStorage.setItem('revora_token', payload.token);

    if (payload.user?.city) {
      const match = INDIAN_CITIES.find((c) => c.name.toLowerCase() === payload.user.city.toLowerCase());
      const updatedLoc = {
        city: payload.user.city,
        state: match?.state || location.state,
        lat: payload.user.lat ?? match?.lat ?? location.lat,
        lng: payload.user.lng ?? match?.lng ?? location.lng,
        isDetected: location.isDetected || false,
      };
      setLocation(updatedLoc);
      localStorage.setItem('revora_location', JSON.stringify(updatedLoc));
    }
  };

  const updateLocation = async (newLoc) => {
    const merged = { ...location, ...newLoc };
    setLocation(merged);
    localStorage.setItem('revora_location', JSON.stringify(merged));
    if (token) {
      try {
        await unwrap(api.put('/auth/location', {
          city: merged.city,
          lat: merged.lat,
          lng: merged.lng,
        }));
      } catch (err) {
        console.warn('Failed to sync location to backend:', err);
      }
    }
    return merged;
  };

  const requestBrowserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = new Error('Geolocation is not supported by your browser.');
        reject(error);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const nearest = findNearestIndianCity(lat, lng) || { name: 'Mumbai', state: 'Maharashtra', lat, lng };

          const detectedLocation = {
            city: nearest.name,
            state: nearest.state,
            lat,
            lng,
            isDetected: true,
            accuracyMeters: Math.round(pos.coords.accuracy || 0),
          };

          updateLocation(detectedLocation);
          resolve(detectedLocation);
        },
        (error) => {
          let message = 'Location permission was denied or unavailable.';
          if (error.code === error.PERMISSION_DENIED) {
            message = 'Location permission was denied. Please pick your city from the dropdown.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            message = 'Location information is currently unavailable.';
          } else if (error.code === error.TIMEOUT) {
            message = 'Location request timed out.';
          }
          const err = new Error(message);
          err.code = error.code;
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  const login = async (credentials) => {
    const payload = await unwrap(api.post('/auth/login', credentials));
    persist(payload);
    return payload;
  };

  const signup = async (details) => {
    const payload = await unwrap(api.post('/auth/signup', details));
    persist(payload);
    return payload;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('revora_user');
    localStorage.removeItem('revora_token');
  };

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('revora:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('revora:unauthorized', handleUnauthorized);
  }, []);

  useEffect(() => {
    if (token && user) {
      unwrap(api.get('/auth/me'))
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem('revora_user', JSON.stringify(data.user));
          }
        })
        .catch((err) => {
          console.warn('Session check:', err?.response?.status || err.message);
        });
    }
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    login,
    signup,
    logout,
    location,
    updateLocation,
    requestBrowserLocation,
    isAuthenticated: Boolean(user && token),
  }), [user, token, location]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
