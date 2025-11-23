import { Person, StartupLocation } from '../types';

// Expanded list of Italian cities for better distribution of the 30 team members
const TEAM_CITIES = [
  { name: 'Milano', lat: 45.4642, lng: 9.1900 },
  { name: 'Roma', lat: 41.9028, lng: 12.4964 },
  { name: 'Torino', lat: 45.0703, lng: 7.6869 },
  { name: 'Bologna', lat: 44.4949, lng: 11.3426 },
  { name: 'Firenze', lat: 43.7696, lng: 11.2558 },
  { name: 'Napoli', lat: 40.8518, lng: 14.2681 },
  { name: 'Palermo', lat: 38.1157, lng: 13.3615 },
  { name: 'Bari', lat: 41.1171, lng: 16.8719 },
  { name: 'Cagliari', lat: 39.2238, lng: 9.1217 },
  { name: 'Genova', lat: 44.4056, lng: 8.9463 },
  { name: 'Venezia', lat: 45.4408, lng: 12.3155 },
  { name: 'Verona', lat: 45.4384, lng: 10.9916 },
  { name: 'Perugia', lat: 43.1107, lng: 12.3908 },
];

// Expanded global cities for the 10 international members
const GLOBAL_CITIES = [
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Sao Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241 },
];

const NAMES = ['Alessandro', 'Giulia', 'Marco', 'Francesca', 'Luca', 'Chiara', 'Matteo', 'Sara', 'Davide', 'Elena', 'Lorenzo', 'Valentina', 'Andrea', 'Silvia'];
const SURNAMES = ['Rossi', 'Bianchi', 'Ferrari', 'Esposito', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomOffset = (magnitude = 0.5) => (Math.random() - 0.5) * magnitude; 

// A granular list of coordinates covering the actual landmass of Italy
// This ensures points are distributed homogeneously inside the borders
const ITALY_SHAPE_GRID = [
    // North West
    { lat: 45.07, lng: 7.68 }, { lat: 44.4, lng: 7.5 }, { lat: 45.5, lng: 8.0 },
    // North Center (Lombardy)
    { lat: 45.46, lng: 9.19 }, { lat: 45.6, lng: 9.8 }, { lat: 45.1, lng: 10.0 }, { lat: 46.1, lng: 9.5 },
    // North East (Veneto/Friuli)
    { lat: 45.43, lng: 12.3 }, { lat: 45.6, lng: 11.5 }, { lat: 46.0, lng: 13.2 }, { lat: 45.9, lng: 12.5 },
    // Emilia Romagna Strip
    { lat: 44.5, lng: 11.3 }, { lat: 44.8, lng: 10.3 }, { lat: 44.2, lng: 12.0 },
    // Liguria
    { lat: 44.4, lng: 8.9 },
    // Tuscany
    { lat: 43.7, lng: 11.2 }, { lat: 43.3, lng: 11.3 }, { lat: 42.9, lng: 11.0 },
    // Central (Umbria/Marche)
    { lat: 43.1, lng: 12.4 }, { lat: 43.6, lng: 13.5 }, { lat: 42.9, lng: 13.8 },
    // Lazio
    { lat: 41.9, lng: 12.5 }, { lat: 42.4, lng: 12.0 }, { lat: 41.5, lng: 13.0 },
    // Abruzzo/Molise
    { lat: 42.3, lng: 13.4 }, { lat: 41.6, lng: 14.6 },
    // Campania
    { lat: 40.8, lng: 14.2 }, { lat: 41.1, lng: 14.8 }, { lat: 40.5, lng: 15.0 },
    // Puglia (The Heel)
    { lat: 41.1, lng: 16.8 }, { lat: 40.5, lng: 17.2 }, { lat: 41.4, lng: 15.6 }, { lat: 40.1, lng: 18.0 },
    // Basilicata/Calabria (The Toe)
    { lat: 40.6, lng: 15.8 }, { lat: 39.3, lng: 16.2 }, { lat: 38.9, lng: 16.6 }, { lat: 38.1, lng: 15.6 },
    // Sicily
    { lat: 38.1, lng: 13.3 }, { lat: 37.5, lng: 15.0 }, { lat: 37.3, lng: 13.6 }, { lat: 37.6, lng: 14.1 },
    // Sardinia
    { lat: 39.2, lng: 9.1 }, { lat: 40.7, lng: 8.5 }, { lat: 40.3, lng: 9.3 }
];

export const generateTeamData = (): Person[] => {
  const team: Person[] = [];

  // Generate 30 people in Italy (Team)
  for (let i = 0; i < 30; i++) {
    const city = getRandomElement(TEAM_CITIES);
    team.push({
      id: `it-${i}`,
      name: `${getRandomElement(NAMES)} ${getRandomElement(SURNAMES)}`,
      role: 'Team Member',
      city: city.name,
      location: {
        // Slightly larger spread for world map visibility
        lat: city.lat + getRandomOffset(0.8),
        lng: city.lng + getRandomOffset(0.8),
      },
    });
  }

  // Generate 10 people globally
  for (let i = 0; i < 10; i++) {
    const city = getRandomElement(GLOBAL_CITIES);
    team.push({
      id: `gl-${i}`,
      name: `${getRandomElement(NAMES)} ${getRandomElement(SURNAMES)}`,
      role: 'International Partner',
      city: city.name,
      location: {
        lat: city.lat + getRandomOffset(1.0),
        lng: city.lng + getRandomOffset(1.0),
      },
    });
  }

  return team;
};

export const generateStartupData = (): StartupLocation[] => {
  const startups: StartupLocation[] = [];

  // Generate 1000 startups distributed homogeneously across the shape of Italy
  // By using the detailed grid and smaller offsets, we avoid the sea.
  for (let i = 0; i < 1000; i++) {
    const hub = getRandomElement(ITALY_SHAPE_GRID);
    
    // Use a much smaller random offset (approx 15-20km radius) to keep points near the valid land coordinate
    const smallJitter = () => (Math.random() - 0.5) * 0.25; 

    startups.push({
      id: `st-${i}`,
      location: {
        lat: hub.lat + smallJitter(),
        lng: hub.lng + smallJitter(),
      },
    });
  }
  return startups;
};