const mongoose = require('mongoose');
const env = require('./environment');
const Parking = require('../components/parking/parking.model');
const City = require('../components/city/city.model');

const seedData = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('[Seeder] Connected to database');

    await Parking.deleteMany({});
    await City.deleteMany({});

    // Seed City: Kolhapur with its main landmarks
    await City.create({
      name: 'Kolhapur',
      tagline: 'Easy Parking. Happier Journeys.',
      centerCoordinates: [74.2433, 16.705],
      landmarks: [
        { name: 'Mahalaxmi Temple', coordinates: [74.22278, 16.69485] },
        { name: 'Rankala Lake Chowpatty', coordinates: [74.21635, 16.68733] },
        { name: 'New Palace Museum', coordinates: [74.23170, 16.71943] },
        { name: 'Chhatrapati Shahu Maharaj Terminus', coordinates: [74.23777, 16.70270] },
        { name: 'Central Bus Stand (CBS)', coordinates: [74.24322, 16.70335] },
        { name: 'Dasara Chowk', coordinates: [74.22775, 16.70284] },
        { name: 'Bindu Chowk', coordinates: [74.22713, 16.69562] },
        { name: 'Shivaji University', coordinates: [74.25756, 16.67786] },
        { name: 'Panchganga Ghat', coordinates: [74.22400, 16.68900] }
      ]
    });

    // 16 Kolhapur Parking Locations from the provided PDF document
    const spots = [
      {
        name: 'Saraswati Talkies Parking',
        city: 'Kolhapur',
        landmark: 'Near Saraswati Talkies, Mangalwar Peth',
        address: 'Mangalwar Peth, Kolhapur',
        location: { type: 'Point', coordinates: [74.21956, 16.69476] },
        pricingPerHour: { car: 25, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'open'],
        status: 'Available',
        totalSlots: { car: 60, two_wheeler: 50 },
        availableSlots: { car: 45, two_wheeler: 35 },
        rating: 4.2,
        totalReviews: 64,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Gokul Hotel Multi-level Parking',
        city: 'Kolhapur',
        landmark: 'Near Gokul Hotel, Station Road',
        address: 'Station Road, Shahupuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.23531, 16.70292] },
        pricingPerHour: { car: 30, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 120, two_wheeler: 80 },
        availableSlots: { car: 95, two_wheeler: 60 },
        rating: 4.6,
        totalReviews: 142,
        image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bindu Chowk Parking',
        city: 'Kolhapur',
        landmark: 'Near Bindu Chowk & Subhash Road',
        address: 'Bindu Chowk, Laxmipuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.22713, 16.69562] },
        pricingPerHour: { car: 20, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['open'],
        status: 'Available',
        totalSlots: { car: 70, two_wheeler: 60 },
        availableSlots: { car: 50, two_wheeler: 40 },
        rating: 4.1,
        totalReviews: 88,
        image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dasara Chowk Parking',
        city: 'Kolhapur',
        landmark: 'Near Dasara Chowk & Town Hall Museum',
        address: 'Dasara Chowk, Kolhapur',
        location: { type: 'Point', coordinates: [74.22775, 16.70284] },
        pricingPerHour: { car: 30, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'open'],
        status: 'Available',
        totalSlots: { car: 80, two_wheeler: 50 },
        availableSlots: { car: 60, two_wheeler: 35 },
        rating: 4.4,
        totalReviews: 110,
        image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mahalaxmi Temple Parking',
        city: 'Kolhapur',
        landmark: 'Near Ambabai / Mahalaxmi Temple, Mahadwar',
        address: 'Mahadwar Road, B Ward, Kolhapur',
        location: { type: 'Point', coordinates: [74.22278, 16.69485] },
        pricingPerHour: { car: 30, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'open', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 120, two_wheeler: 100 },
        availableSlots: { car: 85, two_wheeler: 70 },
        rating: 4.7,
        totalReviews: 320,
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Rankala Lake Chowpatty',
        city: 'Kolhapur',
        landmark: 'Near Rankala Lake Promenade & Chowpatty',
        address: 'Rankala Chowpatty Road, Kolhapur',
        location: { type: 'Point', coordinates: [74.21635, 16.68733] },
        pricingPerHour: { car: 20, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['open', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 90, two_wheeler: 75 },
        availableSlots: { car: 65, two_wheeler: 50 },
        rating: 4.5,
        totalReviews: 185,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bhausingji Road Pay & Park',
        city: 'Kolhapur',
        landmark: 'Near Town Hall & Bhausingji Road',
        address: 'Bhausingji Road, Kolhapur',
        location: { type: 'Point', coordinates: [74.22443, 16.70035] },
        pricingPerHour: { car: 25, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered'],
        status: 'Available',
        totalSlots: { car: 50, two_wheeler: 40 },
        availableSlots: { car: 30, two_wheeler: 25 },
        rating: 4.0,
        totalReviews: 52,
        image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Central Bus Stand Parking',
        city: 'Kolhapur',
        landmark: 'Near CBS Bus Depot & Main Gate',
        address: 'CBS Road, Shahupuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.24322, 16.70335] },
        pricingPerHour: { car: 25, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'open'],
        status: 'Available',
        totalSlots: { car: 100, two_wheeler: 80 },
        availableSlots: { car: 70, two_wheeler: 55 },
        rating: 4.3,
        totalReviews: 198,
        image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Chhatrapati Shahu Maharaj Terminus',
        city: 'Kolhapur',
        landmark: 'Near Kolhapur Railway Station Main Porch',
        address: 'Station Road, Shahupuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.23777, 16.70270] },
        pricingPerHour: { car: 20, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'open', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 110, two_wheeler: 90 },
        availableSlots: { car: 80, two_wheeler: 65 },
        rating: 4.4,
        totalReviews: 240,
        image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'New Palace Museum',
        city: 'Kolhapur',
        landmark: 'Near New Palace Museum Main Gate',
        address: 'Bhavani Mandap Road, New Palace, Kolhapur',
        location: { type: 'Point', coordinates: [74.23170, 16.71943] },
        pricingPerHour: { car: 30, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 60, two_wheeler: 40 },
        availableSlots: { car: 45, two_wheeler: 30 },
        rating: 4.5,
        totalReviews: 95,
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Rajarampuri 1st Lane Lot',
        city: 'Kolhapur',
        landmark: 'Near Rajarampuri 1st Lane Shopping Hub',
        address: '1st Lane, Rajarampuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.24322, 16.69815] },
        pricingPerHour: { car: 25, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['open'],
        status: 'Available',
        totalSlots: { car: 50, two_wheeler: 60 },
        availableSlots: { car: 35, two_wheeler: 40 },
        rating: 4.2,
        totalReviews: 78,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shahupuri Commercial Complex',
        city: 'Kolhapur',
        landmark: 'Near Shahupuri Trade Centre & Market',
        address: 'Shahupuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.24316, 16.70194] },
        pricingPerHour: { car: 20, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'open'],
        status: 'Available',
        totalSlots: { car: 70, two_wheeler: 50 },
        availableSlots: { car: 50, two_wheeler: 35 },
        rating: 4.1,
        totalReviews: 68,
        image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Tarabai Park Ground',
        city: 'Kolhapur',
        landmark: 'Near Tarabai Park Circle & Gymkhana',
        address: 'Tarabai Park, Kolhapur',
        location: { type: 'Point', coordinates: [74.24875, 16.71351] },
        pricingPerHour: { car: 30, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['open', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 80, two_wheeler: 60 },
        availableSlots: { car: 60, two_wheeler: 45 },
        rating: 4.4,
        totalReviews: 82,
        image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Panchganga Ghat',
        city: 'Kolhapur',
        landmark: 'Near Panchganga River Ghat & Shivaji Bridge',
        address: 'Panchganga Ghat Road, Kolhapur',
        location: { type: 'Point', coordinates: [74.22400, 16.68900] },
        pricingPerHour: { car: 20, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['open'],
        status: 'Available',
        totalSlots: { car: 60, two_wheeler: 50 },
        availableSlots: { car: 45, two_wheeler: 35 },
        rating: 4.3,
        totalReviews: 112,
        image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Reliance Mall Parking',
        city: 'Kolhapur',
        landmark: 'Near Reliance Mall, Laxmipuri',
        address: 'Laxmipuri, Kolhapur',
        location: { type: 'Point', coordinates: [74.23105, 16.69901] },
        pricingPerHour: { car: 30, two_wheeler: 15 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['covered', 'ev_charging'],
        status: 'Available',
        totalSlots: { car: 90, two_wheeler: 70 },
        availableSlots: { car: 70, two_wheeler: 55 },
        rating: 4.5,
        totalReviews: 165,
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shivaji University Gate',
        city: 'Kolhapur',
        landmark: 'Near Shivaji University Main Gate, Vidyanagar',
        address: 'Vidyanagar, Kolhapur',
        location: { type: 'Point', coordinates: [74.25756, 16.67786] },
        pricingPerHour: { car: 20, two_wheeler: 10 },
        vehicleTypes: ['car', 'two_wheeler'],
        amenities: ['open', 'covered'],
        status: 'Available',
        totalSlots: { car: 100, two_wheeler: 120 },
        availableSlots: { car: 80, two_wheeler: 90 },
        rating: 4.6,
        totalReviews: 210,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
      }
    ];

    await Parking.insertMany(spots);
    console.log(`[Seeder] Successfully seeded all ${spots.length} Kolhapur parking spots and landmarks!`);
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();
