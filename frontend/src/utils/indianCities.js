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

// Aliases, prominent localities, and historical city names mapped to canonical INDIAN_CITIES
const CITY_ALIASES = [
  // Multi-word matches first
  { term: 'navi mumbai', city: 'Navi Mumbai' },
  { term: 'new delhi', city: 'Delhi' },
  { term: 'greater noida', city: 'Noida' },
  { term: 'chhatrapati sambhaji nagar', city: 'Aurangabad' },
  { term: 'sambhajinagar', city: 'Aurangabad' },
  { term: 'fort kochi', city: 'Kochi' },
  { term: 'marine drive kochi', city: 'Kochi' },
  { term: 'connaught place', city: 'Delhi' },
  { term: 'hauz khas', city: 'Delhi' },
  { term: 'cyber city', city: 'Gurugram' },
  { term: 'dlf phase', city: 'Gurugram' },
  { term: 'golf course road', city: 'Gurugram' },
  { term: 'hitec city', city: 'Hyderabad' },
  { term: 'cyberabad', city: 'Hyderabad' },
  { term: 'banjara hills', city: 'Hyderabad' },
  { term: 'jubilee hills', city: 'Hyderabad' },
  { term: 'koregaon park', city: 'Pune' },
  { term: 'viman nagar', city: 'Pune' },
  { term: 'kalyani nagar', city: 'Pune' },
  { term: 'hinjewadi', city: 'Pune' },
  { term: 'hsr layout', city: 'Bengaluru' },
  { term: 'electronic city', city: 'Bengaluru' },
  { term: 'btm layout', city: 'Bengaluru' },
  { term: 'jp nagar', city: 'Bengaluru' },
  { term: 'salt lake', city: 'Kolkata' },
  { term: 'park street', city: 'Kolkata' },
  { term: 'new town kolkata', city: 'Kolkata' },
  { term: 'anna nagar', city: 'Chennai' },
  { term: 'besant nagar', city: 'Chennai' },
  { term: 't nagar', city: 'Chennai' },
  { term: 'gomti nagar', city: 'Lucknow' },
  { term: 'hazratganj', city: 'Lucknow' },
  { term: 'white town', city: 'Puducherry' },

  // Single word city aliases & prominent areas
  { term: 'bombay', city: 'Mumbai' },
  { term: 'mumbai', city: 'Mumbai' },
  { term: 'bandra', city: 'Mumbai' },
  { term: 'andheri', city: 'Mumbai' },
  { term: 'colaba', city: 'Mumbai' },
  { term: 'juhu', city: 'Mumbai' },
  { term: 'dadar', city: 'Mumbai' },
  { term: 'powai', city: 'Mumbai' },
  { term: 'borivali', city: 'Mumbai' },
  { term: 'worli', city: 'Mumbai' },
  { term: 'bkc', city: 'Mumbai' },
  { term: 'chembur', city: 'Mumbai' },
  { term: 'thane', city: 'Thane' },
  { term: 'kalyan', city: 'Thane' },
  { term: 'dombivli', city: 'Thane' },
  { term: 'bhayandar', city: 'Thane' },
  { term: 'vashi', city: 'Navi Mumbai' },
  { term: 'kharghar', city: 'Navi Mumbai' },
  { term: 'panvel', city: 'Navi Mumbai' },
  { term: 'nerul', city: 'Navi Mumbai' },
  { term: 'delhi', city: 'Delhi' },
  { term: 'dilli', city: 'Delhi' },
  { term: 'dwarka', city: 'Delhi' },
  { term: 'rohini', city: 'Delhi' },
  { term: 'saket', city: 'Delhi' },
  { term: 'karol bagh', city: 'Delhi' },
  { term: 'bangalore', city: 'Bengaluru' },
  { term: 'bengaluru', city: 'Bengaluru' },
  { term: 'koramangala', city: 'Bengaluru' },
  { term: 'indiranagar', city: 'Bengaluru' },
  { term: 'whitefield', city: 'Bengaluru' },
  { term: 'jayanagar', city: 'Bengaluru' },
  { term: 'bellandur', city: 'Bengaluru' },
  { term: 'malleshwaram', city: 'Bengaluru' },
  { term: 'marathahalli', city: 'Bengaluru' },
  { term: 'hyderabad', city: 'Hyderabad' },
  { term: 'secunderabad', city: 'Hyderabad' },
  { term: 'gachibowli', city: 'Hyderabad' },
  { term: 'madhapur', city: 'Hyderabad' },
  { term: 'kukatpally', city: 'Hyderabad' },
  { term: 'ahmedabad', city: 'Ahmedabad' },
  { term: 'amdavad', city: 'Ahmedabad' },
  { term: 'vastrapur', city: 'Ahmedabad' },
  { term: 'navrangpura', city: 'Ahmedabad' },
  { term: 'bodakdev', city: 'Ahmedabad' },
  { term: 'chennai', city: 'Chennai' },
  { term: 'madras', city: 'Chennai' },
  { term: 'adyar', city: 'Chennai' },
  { term: 'velachery', city: 'Chennai' },
  { term: 'mylapore', city: 'Chennai' },
  { term: 'kolkata', city: 'Kolkata' },
  { term: 'calcutta', city: 'Kolkata' },
  { term: 'ballygunge', city: 'Kolkata' },
  { term: 'alipore', city: 'Kolkata' },
  { term: 'pune', city: 'Pune' },
  { term: 'poona', city: 'Pune' },
  { term: 'kothrud', city: 'Pune' },
  { term: 'baner', city: 'Pune' },
  { term: 'wakad', city: 'Pune' },
  { term: 'aundh', city: 'Pune' },
  { term: 'jaipur', city: 'Jaipur' },
  { term: 'surat', city: 'Surat' },
  { term: 'lucknow', city: 'Lucknow' },
  { term: 'kanpur', city: 'Kanpur' },
  { term: 'nagpur', city: 'Nagpur' },
  { term: 'indore', city: 'Indore' },
  { term: 'bhopal', city: 'Bhopal' },
  { term: 'visakhapatnam', city: 'Visakhapatnam' },
  { term: 'vizag', city: 'Visakhapatnam' },
  { term: 'patna', city: 'Patna' },
  { term: 'vadodara', city: 'Vadodara' },
  { term: 'baroda', city: 'Vadodara' },
  { term: 'alkapuri', city: 'Vadodara' },
  { term: 'ghaziabad', city: 'Ghaziabad' },
  { term: 'indirapuram', city: 'Ghaziabad' },
  { term: 'ludhiana', city: 'Ludhiana' },
  { term: 'agra', city: 'Agra' },
  { term: 'nashik', city: 'Nashik' },
  { term: 'nasik', city: 'Nashik' },
  { term: 'faridabad', city: 'Faridabad' },
  { term: 'meerut', city: 'Meerut' },
  { term: 'rajkot', city: 'Rajkot' },
  { term: 'varanasi', city: 'Varanasi' },
  { term: 'banaras', city: 'Varanasi' },
  { term: 'benares', city: 'Varanasi' },
  { term: 'kashi', city: 'Varanasi' },
  { term: 'srinagar', city: 'Srinagar' },
  { term: 'aurangabad', city: 'Aurangabad' },
  { term: 'dhanbad', city: 'Dhanbad' },
  { term: 'amritsar', city: 'Amritsar' },
  { term: 'prayagraj', city: 'Prayagraj' },
  { term: 'allahabad', city: 'Prayagraj' },
  { term: 'ranchi', city: 'Ranchi' },
  { term: 'howrah', city: 'Howrah' },
  { term: 'coimbatore', city: 'Coimbatore' },
  { term: 'jabalpur', city: 'Jabalpur' },
  { term: 'gwalior', city: 'Gwalior' },
  { term: 'vijayawada', city: 'Vijayawada' },
  { term: 'jodhpur', city: 'Jodhpur' },
  { term: 'madurai', city: 'Madurai' },
  { term: 'raipur', city: 'Raipur' },
  { term: 'kota', city: 'Kota' },
  { term: 'guwahati', city: 'Guwahati' },
  { term: 'gauhati', city: 'Guwahati' },
  { term: 'chandigarh', city: 'Chandigarh' },
  { term: 'mohali', city: 'Chandigarh' },
  { term: 'panchkula', city: 'Chandigarh' },
  { term: 'solapur', city: 'Solapur' },
  { term: 'hubballi', city: 'Hubballi' },
  { term: 'hubli', city: 'Hubballi' },
  { term: 'dharwad', city: 'Hubballi' },
  { term: 'bareilly', city: 'Bareilly' },
  { term: 'mysuru', city: 'Mysuru' },
  { term: 'mysore', city: 'Mysuru' },
  { term: 'gurugram', city: 'Gurugram' },
  { term: 'gurgaon', city: 'Gurugram' },
  { term: 'noida', city: 'Noida' },
  { term: 'aligarh', city: 'Aligarh' },
  { term: 'jalandhar', city: 'Jalandhar' },
  { term: 'tiruchirappalli', city: 'Tiruchirappalli' },
  { term: 'trichy', city: 'Tiruchirappalli' },
  { term: 'bhubaneswar', city: 'Bhubaneswar' },
  { term: 'salem', city: 'Salem' },
  { term: 'warangal', city: 'Warangal' },
  { term: 'thiruvananthapuram', city: 'Thiruvananthapuram' },
  { term: 'trivandrum', city: 'Thiruvananthapuram' },
  { term: 'kochi', city: 'Kochi' },
  { term: 'cochin', city: 'Kochi' },
  { term: 'ernakulam', city: 'Kochi' },
  { term: 'kozhikode', city: 'Kozhikode' },
  { term: 'calicut', city: 'Kozhikode' },
  { term: 'dehradun', city: 'Dehradun' },
  { term: 'shimla', city: 'Shimla' },
  { term: 'udaipur', city: 'Udaipur' },
  { term: 'panaji', city: 'Goa (Panaji)' },
  { term: 'panjim', city: 'Goa (Panaji)' },
  { term: 'goa', city: 'Goa (Panaji)' },
  { term: 'mangaluru', city: 'Mangaluru' },
  { term: 'mangalore', city: 'Mangaluru' },
  { term: 'puducherry', city: 'Puducherry' },
  { term: 'pondicherry', city: 'Puducherry' },
  { term: 'shillong', city: 'Shillong' },
  { term: 'gangtok', city: 'Gangtok' },
];

const PINCODE_PREFIXES = [
  { prefix: /^400/, city: 'Mumbai' },
  { prefix: /^401/, city: 'Thane' },
  { prefix: /^41[012]/, city: 'Pune' },
  { prefix: /^110/, city: 'Delhi' },
  { prefix: /^560/, city: 'Bengaluru' },
  { prefix: /^600/, city: 'Chennai' },
  { prefix: /^700/, city: 'Kolkata' },
  { prefix: /^500/, city: 'Hyderabad' },
  { prefix: /^380/, city: 'Ahmedabad' },
  { prefix: /^302/, city: 'Jaipur' },
  { prefix: /^395/, city: 'Surat' },
  { prefix: /^226/, city: 'Lucknow' },
  { prefix: /^208/, city: 'Kanpur' },
  { prefix: /^440/, city: 'Nagpur' },
  { prefix: /^452/, city: 'Indore' },
  { prefix: /^462/, city: 'Bhopal' },
  { prefix: /^530/, city: 'Visakhapatnam' },
  { prefix: /^800/, city: 'Patna' },
  { prefix: /^390/, city: 'Vadodara' },
  { prefix: /^2010/, city: 'Ghaziabad' },
  { prefix: /^141/, city: 'Ludhiana' },
  { prefix: /^282/, city: 'Agra' },
  { prefix: /^422/, city: 'Nashik' },
  { prefix: /^121/, city: 'Faridabad' },
  { prefix: /^250/, city: 'Meerut' },
  { prefix: /^360/, city: 'Rajkot' },
  { prefix: /^221/, city: 'Varanasi' },
  { prefix: /^190/, city: 'Srinagar' },
  { prefix: /^431/, city: 'Aurangabad' },
  { prefix: /^826/, city: 'Dhanbad' },
  { prefix: /^143/, city: 'Amritsar' },
  { prefix: /^211/, city: 'Prayagraj' },
  { prefix: /^834/, city: 'Ranchi' },
  { prefix: /^711/, city: 'Howrah' },
  { prefix: /^641/, city: 'Coimbatore' },
  { prefix: /^482/, city: 'Jabalpur' },
  { prefix: /^474/, city: 'Gwalior' },
  { prefix: /^520/, city: 'Vijayawada' },
  { prefix: /^342/, city: 'Jodhpur' },
  { prefix: /^625/, city: 'Madurai' },
  { prefix: /^492/, city: 'Raipur' },
  { prefix: /^324/, city: 'Kota' },
  { prefix: /^781/, city: 'Guwahati' },
  { prefix: /^160/, city: 'Chandigarh' },
  { prefix: /^413/, city: 'Solapur' },
  { prefix: /^580/, city: 'Hubballi' },
  { prefix: /^243/, city: 'Bareilly' },
  { prefix: /^570/, city: 'Mysuru' },
  { prefix: /^122/, city: 'Gurugram' },
  { prefix: /^2013/, city: 'Noida' },
  { prefix: /^202/, city: 'Aligarh' },
  { prefix: /^144/, city: 'Jalandhar' },
  { prefix: /^620/, city: 'Tiruchirappalli' },
  { prefix: /^751/, city: 'Bhubaneswar' },
  { prefix: /^636/, city: 'Salem' },
  { prefix: /^506/, city: 'Warangal' },
  { prefix: /^695/, city: 'Thiruvananthapuram' },
  { prefix: /^682/, city: 'Kochi' },
  { prefix: /^673/, city: 'Kozhikode' },
  { prefix: /^248/, city: 'Dehradun' },
  { prefix: /^171/, city: 'Shimla' },
  { prefix: /^313/, city: 'Udaipur' },
  { prefix: /^403/, city: 'Goa (Panaji)' },
  { prefix: /^575/, city: 'Mangaluru' },
  { prefix: /^605/, city: 'Puducherry' },
  { prefix: /^793/, city: 'Shillong' },
  { prefix: /^737/, city: 'Gangtok' },
];

const STATE_MAPPINGS = [
  { state: 'maharashtra', city: 'Mumbai' },
  { state: 'karnataka', city: 'Bengaluru' },
  { state: 'tamil nadu', city: 'Chennai' },
  { state: 'west bengal', city: 'Kolkata' },
  { state: 'telangana', city: 'Hyderabad' },
  { state: 'gujarat', city: 'Ahmedabad' },
  { state: 'rajasthan', city: 'Jaipur' },
  { state: 'uttar pradesh', city: 'Lucknow' },
  { state: 'kerala', city: 'Kochi' },
  { state: 'madhya pradesh', city: 'Indore' },
  { state: 'punjab', city: 'Chandigarh' },
  { state: 'haryana', city: 'Gurugram' },
  { state: 'bihar', city: 'Patna' },
  { state: 'jharkhand', city: 'Ranchi' },
  { state: 'odisha', city: 'Bhubaneswar' },
  { state: 'assam', city: 'Guwahati' },
  { state: 'uttarakhand', city: 'Dehradun' },
  { state: 'himachal pradesh', city: 'Shimla' },
  { state: 'goa', city: 'Goa (Panaji)' },
];

export const detectCityFromAddress = (address) => {
  if (!address || typeof address !== 'string' || !address.trim()) {
    return { ...INDIAN_CITIES[0], matchedBy: 'default' };
  }

  const clean = address.toLowerCase();

  // 1. Check city names and common aliases / localities
  for (const { term, city } of CITY_ALIASES) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    if (regex.test(clean)) {
      const match = INDIAN_CITIES.find((c) => c.name.toLowerCase() === city.toLowerCase());
      if (match) {
        return { ...match, matchedBy: 'alias', detectedTerm: term };
      }
    }
  }

  // 2. Check 6-digit Indian PIN codes (e.g., 400050, 560038)
  const pinMatch = clean.match(/\b([1-9][0-9]{5})\b/);
  if (pinMatch) {
    const pin = pinMatch[1];
    for (const { prefix, city } of PINCODE_PREFIXES) {
      if (prefix.test(pin)) {
        const match = INDIAN_CITIES.find((c) => c.name.toLowerCase() === city.toLowerCase());
        if (match) {
          return { ...match, matchedBy: 'pincode', detectedPincode: pin };
        }
      }
    }
  }

  // 3. Check Indian states
  for (const { state, city } of STATE_MAPPINGS) {
    const regex = new RegExp(`(^|[^a-z0-9])${state}([^a-z0-9]|$)`, 'i');
    if (regex.test(clean)) {
      const match = INDIAN_CITIES.find((c) => c.name.toLowerCase() === city.toLowerCase());
      if (match) {
        return { ...match, matchedBy: 'state', detectedState: state };
      }
    }
  }

  // Default fallback: Mumbai
  return { ...INDIAN_CITIES[0], matchedBy: 'default' };
};

