// Curated list of Indian cities with coordinates for client-side dropdown & geolocation matching
export const INDIAN_CITIES = [
  // Top Metros (Tier 1)
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, tier: 1 },
  { name: 'Delhi', state: 'Delhi NCR', lat: 28.6139, lng: 77.2090, tier: 1 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, tier: 1 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, tier: 1 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, tier: 1 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, tier: 1 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, tier: 1 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, tier: 1 },

  // Tier 2 & Popular Hubs
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, tier: 2 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311, tier: 2 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, tier: 2 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319, tier: 2 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882, tier: 2 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577, tier: 2 },
  { name: 'Thane', state: 'Maharashtra', lat: 19.2183, lng: 72.9781, tier: 2 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126, tier: 2 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185, tier: 2 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376, tier: 2 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lng: 73.1812, tier: 2 },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', lat: 28.6692, lng: 77.4538, tier: 2 },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573, tier: 2 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081, tier: 2 },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898, tier: 2 },
  { name: 'Faridabad', state: 'Haryana', lat: 28.4089, lng: 77.3178, tier: 2 },
  { name: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lng: 77.7064, tier: 2 },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lng: 70.8022, tier: 2 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739, tier: 2 },
  { name: 'Srinagar', state: 'Jammu and Kashmir', lat: 34.0837, lng: 74.7973, tier: 2 },
  { name: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lng: 75.3433, tier: 2 },
  { name: 'Dhanbad', state: 'Jharkhand', lat: 23.7957, lng: 86.4304, tier: 2 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723, tier: 2 },
  { name: 'Navi Mumbai', state: 'Maharashtra', lat: 19.0330, lng: 73.0297, tier: 2 },
  { name: 'Prayagraj', state: 'Uttar Pradesh', lat: 25.4358, lng: 81.8463, tier: 2 },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lng: 85.3096, tier: 2 },
  { name: 'Howrah', state: 'West Bengal', lat: 22.5958, lng: 88.2636, tier: 2 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, tier: 2 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', lat: 23.1815, lng: 79.9864, tier: 2 },
  { name: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2183, lng: 78.1828, tier: 2 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.6480, tier: 2 },
  { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lng: 73.0243, tier: 2 },
  { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198, tier: 2 },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lng: 81.6296, tier: 2 },
  { name: 'Kota', state: 'Rajasthan', lat: 25.2138, lng: 75.8648, tier: 2 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, tier: 2 },
  { name: 'Chandigarh', state: 'Chandigarh / Punjab', lat: 30.7333, lng: 76.7794, tier: 2 },
  { name: 'Solapur', state: 'Maharashtra', lat: 17.6599, lng: 75.9064, tier: 2 },
  { name: 'Hubballi', state: 'Karnataka', lat: 15.3647, lng: 75.1240, tier: 2 },
  { name: 'Bareilly', state: 'Uttar Pradesh', lat: 28.3670, lng: 79.4304, tier: 2 },
  { name: 'Mysuru', state: 'Karnataka', lat: 12.2958, lng: 76.6394, tier: 2 },
  { name: 'Gurugram', state: 'Haryana', lat: 28.4595, lng: 77.0266, tier: 2 },
  { name: 'Noida', state: 'Uttar Pradesh', lat: 28.5355, lng: 77.3910, tier: 2 },
  { name: 'Aligarh', state: 'Uttar Pradesh', lat: 27.8974, lng: 78.0880, tier: 2 },
  { name: 'Jalandhar', state: 'Punjab', lat: 31.3260, lng: 75.5762, tier: 2 },
  { name: 'Tiruchirappalli', state: 'Tamil Nadu', lat: 10.7905, lng: 78.7047, tier: 2 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245, tier: 2 },
  { name: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lng: 78.1460, tier: 2 },
  { name: 'Warangal', state: 'Telangana', lat: 17.9689, lng: 79.5941, tier: 2 },
  { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lng: 76.9366, tier: 2 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673, tier: 2 },
  { name: 'Kozhikode', state: 'Kerala', lat: 11.2588, lng: 75.7804, tier: 2 },
  { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lng: 78.0322, tier: 2 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, tier: 2 },
  { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lng: 73.7125, tier: 2 },
  { name: 'Goa (Panaji)', state: 'Goa', lat: 15.4909, lng: 73.8278, tier: 2 },
  { name: 'Mangaluru', state: 'Karnataka', lat: 12.9141, lng: 74.8560, tier: 2 },
  { name: 'Puducherry', state: 'Puducherry', lat: 11.9416, lng: 79.8083, tier: 2 },
  { name: 'Shillong', state: 'Meghalaya', lat: 25.5788, lng: 91.8933, tier: 2 },
  { name: 'Gangtok', state: 'Sikkim', lat: 27.3389, lng: 88.6065, tier: 2 }
];

export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

export const findNearestIndianCity = (lat, lng) => {
  if (lat == null || lng == null) return null;
  let closest = null;
  let minDistance = Infinity;
  for (const city of INDIAN_CITIES) {
    const dist = calculateDistanceKm(lat, lng, city.lat, city.lng);
    if (dist != null && dist < minDistance) {
      minDistance = dist;
      closest = { ...city, distanceKm: dist };
    }
  }
  return closest;
};
