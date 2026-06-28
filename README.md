# 🌍 WanderHub - Full Stack Travel Stay Booking Platform

![WanderHub Banner](https://github.com/user-attachments/assets/eb849f63-620d-4a7c-ac98-535f307ad5e3)

## 🚀 Overview

**WanderHub** is a full-stack travel accommodation platform inspired by Airbnb that enables users to discover, create, and manage travel stay listings.

The application provides a complete host and traveler experience with secure authentication, property management, image hosting, location-based discovery, and user reviews.

Built with a scalable MVC architecture, the project demonstrates backend API design, database modeling, authentication workflows, cloud integration, and production-level error handling.

---

# ✨ Features

## 👤 User Management & Authentication

- Secure user registration and login
- Session-based authentication using Passport.js
- Protected routes with authorization middleware
- User-specific listing and review management
- Logout functionality

---

## 🏠 Property Listing Management

Users can:

- Create new property listings
- Upload property images
- Edit existing listings
- Delete their own listings
- View detailed property information
- Browse available stays

Implemented complete CRUD operations following RESTful API principles.

---

## 📷 Cloud Image Management

- Image uploads using Multer
- Image storage and optimization using Cloudinary
- Dynamic image rendering for listings

---

## 🗺️ Location-Based Features

- Integrated Mapbox API
- Display property locations on interactive maps
- Geographical visualization of listings

---

## ⭐ Reviews & Ratings

Users can:

- Add reviews to listings
- Delete their own reviews
- View community feedback

---

## 🛡️ Validation & Error Handling

- Server-side validation using Joi
- Custom Express error handling middleware
- Async error handling wrapper
- User-friendly flash messages

---

# 🏗️ System Architecture

The application follows the **MVC (Model-View-Controller) architecture**.

```
User
 |
 | HTTP Requests
 |
 v
Routes Layer
 |
 v
Controllers Layer
 |
 v
Models Layer
 |
 v
MongoDB Database
```

### Architecture Flow:

1. User interacts with the frontend (EJS + Bootstrap)
2. Request reaches Express routes
3. Controllers process business logic
4. Mongoose models communicate with MongoDB
5. Response is returned to the client

---

# 🧰 Tech Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| EJS | Server-side templating |
| Bootstrap 5 | Responsive UI |
| CSS | Custom styling |


## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | ODM |
| Passport.js | Authentication |
| Joi | Data validation |
| Multer | File handling |
| Cloudinary | Image storage |
| Mapbox SDK | Maps integration |


---

# 📂 Project Structure

```
WanderHub/

│
├── models/
│   ├── listings.js        # Property schema
│   ├── reviews.js         # Review schema
│   └── users.js           # User schema
│
├── routes/
│   ├── listings.js        # Listing routes
│   ├── reviews.js         # Review routes
│   └── users.js           # Authentication routes
│
├── controllers/
│   ├── listings.js        # Listing business logic
│   ├── reviews.js         # Review controllers
│   └── users.js           # User controllers
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── error.ejs
│
├── public/
│   ├── css/
│   └── javascript/
│
├── utils/
│   ├── wrapAsync.js       # Async error handling
│   └── ExpressError.js    # Custom errors
│
├── middleware.js          # Authentication middleware
├── schema.js              # Joi validation schemas
├── cloudConfig.js         # Cloudinary configuration
├── app.js                 # Application entry point
└── package.json
```

---

# 🗄️ Database Design

## User Collection

```javascript
{
 username,
 email,
 password,
 listings[]
}
```

---

## Listing Collection

```javascript
{
 title,
 description,
 price,
 location,
 country,
 image,
 owner,
 reviews[]
}
```

---

## Review Collection

```javascript
{
 comment,
 rating,
 author,
 listing
}
```

---

# 🔌 API Endpoints

## Listings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /listings | Get all listings |
| POST | /listings | Create listing |
| GET | /listing/:id | Get listing details |
| PUT | /listing/:id | Update listing |
| DELETE | /listing/:id | Delete listing |


---

## Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /listing/:id/reviews | Add review |
| DELETE | /listing/:id/reviews/:reviewId | Delete review |


---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /signup | Signup page |
| POST | /signup | Register user |
| GET | /login | Login page |
| POST | /login | Authenticate user |
| GET | /logout | Logout user |


---

# 🔐 Authentication Flow

```
User Signup
     |
     v
Password Hashing
     |
     v
MongoDB Storage
     |
     v
Login Request
     |
     v
Passport Authentication
     |
     v
Session Creation
     |
     v
Protected Routes Access
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Mahak0747/WanderHub.git
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```
ATLASDB_URL=your_mongodb_url

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

MAP_TOKEN=your_mapbox_token

SECRET=your_session_secret
```

---

## Run Application

```bash
npm start
```

Application runs on:

```
http://localhost:8080
```

---

# 🧪 Engineering Highlights

✅ RESTful API design  
✅ MVC backend architecture  
✅ Secure authentication system  
✅ Database schema modeling  
✅ Cloud-based image storage  
✅ Third-party API integration  
✅ Middleware-based request handling  
✅ Server-side validation  
✅ Error handling strategies  

---

# 🚀 Future Improvements

- Payment gateway integration
- Booking calendar system
- Real-time chat between hosts and travelers
- Recommendation system
- Admin dashboard
- Advanced search and filtering
- Deployment using AWS/Docker

---

# 📸 Screenshots

<img width="350" src="https://github.com/user-attachments/assets/eb849f63-620d-4a7c-ac98-535f307ad5e3" />
<img width="350" src="https://github.com/user-attachments/assets/b4909f4d-4389-44a7-a949-d11226eb7299" />
<img width="350" src="https://github.com/user-attachments/assets/219662f9-ba4b-42c3-b775-0698852c87b2" />
<img width="350" src="https://github.com/user-attachments/assets/d98dd519-1523-4c96-8785-a4230370e25d" />

---

# 👨‍💻 Author

**Mahak Goswami**

Full Stack Developer

---

# 📜 License

This project is licensed under the ISC License.
