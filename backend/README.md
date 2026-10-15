# ParkingBay Backend API 🚗🅿️

A modular, enterprise-grade Node.js / Express REST API designed for the **ParkingBay** Smart Parking platform (Kolhapur).

---

## 📸 Feature Mapping (From UI Design)

| UI Component / Feature | Corresponding Backend Component | Endpoint |
|---|---|---|
| **Login / User Profiles** | `src/components/auth`, `src/components/user` | `/api/v1/auth`, `/api/v1/users` |
| **Search (Name, Landmark, City)** | `src/components/parking` | `GET /api/v1/parkings?search=...&city=Kolhapur` |
| **Filters (Car, Two-Wheeler, EV, Covered)** | `src/components/parking` | `GET /api/v1/parkings?vehicleType=car&amenities=ev_charging` |
| **Near Me (Geospatial Query)** | `src/components/parking` | `GET /api/v1/parkings?latitude=16.69&longitude=74.22&maxDistanceKm=5` |
| **Interactive Map Pins (Status Markers)** | `src/components/parking` | `GET /api/v1/parkings/map-pins?city=Kolhapur` |
| **My Bookings** | `src/components/booking` | `POST /api/v1/bookings`, `GET /api/v1/bookings/my-bookings` |
| **Favorites** | `src/components/favorite` | `GET /api/v1/favorites`, `POST /api/v1/favorites` |
| **Ratings & Reviews (e.g. 4.5 ⭐ (128))** | `src/components/review` | `GET /api/v1/reviews?parkingId=...`, `POST /api/v1/reviews` |
| **About Kolhapur & Landmarks** | `src/components/city` | `GET /api/v1/cities/Kolhapur` |
| **Help & Support** | `src/components/support` | `POST /api/v1/support` |

---

## 🗂️ Project Directory Structure

```text
parkingbay-backend/
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.model.js
│   │   │   ├── auth.policy.js
│   │   │   ├── auth.route.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validator.js
│   │   │
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   ├── user.policy.js
│   │   │   ├── user.route.js
│   │   │   ├── user.service.js
│   │   │   └── user.validator.js
│   │   │
│   │   ├── parking/
│   │   │   ├── parking.controller.js
│   │   │   ├── parking.model.js
│   │   │   ├── parking.policy.js
│   │   │   ├── parking.route.js
│   │   │   ├── parking.service.js
│   │   │   └── parking.validator.js
│   │   │
│   │   ├── booking/
│   │   │   ├── booking.controller.js
│   │   │   ├── booking.model.js
│   │   │   ├── booking.policy.js
│   │   │   ├── booking.route.js
│   │   │   ├── booking.service.js
│   │   │   └── booking.validator.js
│   │   │
│   │   ├── favorite/
│   │   │   ├── favorite.controller.js
│   │   │   ├── favorite.model.js
│   │   │   ├── favorite.policy.js
│   │   │   ├── favorite.route.js
│   │   │   ├── favorite.service.js
│   │   │   └── favorite.validator.js
│   │   │
│   │   ├── review/
│   │   │   ├── review.controller.js
│   │   │   ├── review.model.js
│   │   │   ├── review.policy.js
│   │   │   ├── review.route.js
│   │   │   ├── review.service.js
│   │   │   └── review.validator.js
│   │   │
│   │   ├── city/
│   │   │   ├── city.controller.js
│   │   │   ├── city.model.js
│   │   │   ├── city.policy.js
│   │   │   ├── city.route.js
│   │   │   ├── city.service.js
│   │   │   └── city.validator.js
│   │   │
│   │   └── support/
│   │       ├── support.controller.js
│   │       ├── support.model.js
│   │       ├── support.policy.js
│   │       ├── support.route.js
│   │       ├── support.service.js
│   │       └── support.validator.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── upload.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   ├── app.config.js
│   │   ├── constants.js
│   │   └── seed.js
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── response.js
│   │   ├── errors.js
│   │   ├── pagination.js
│   │   └── helpers.js
│   │
│   ├── validators/
│   │   └── common.validator.js
│   │
│   ├── docs/
│   │   └── swagger.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── unit/
│   │   └── parking.service.test.js
│   └── integration/
│       └── health.test.js
│
├── uploads/
│   └── .gitkeep
│
├── logs/
│   └── .gitkeep
│
├── .env
├── .env.development
├── .env.production
├── .gitignore
├── package.json
├── README.md
└── nodemon.json
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Initial Kolhapur Parking Spots
Seeds the exact spots shown on the UI design (Mahadwar Parking, Shahu Market Parking, New Palace Parking, Station Road Parking, RK Nagar Parking):
```bash
node src/config/seed.js
```

### 3. Start Development Server
```bash
npm run dev
```
The server will boot up at `http://localhost:5000`.

### 4. Interactive API Documentation
Open your browser and navigate to:
```
http://localhost:5000/api-docs
```
