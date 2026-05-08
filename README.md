# 🌍 WanderHub - A Travel Stay Booking Web App

**WanderHub** is a full-stack web application inspired by Airbnb. It allows users to explore, create, and manage property listings for travel stays. With features like image uploads, geolocation, reviews, and secure authentication, the platform offers a complete experience for both hosts and travelers.

<img width="450" src="https://github.com/user-attachments/assets/eb849f63-620d-4a7c-ac98-535f307ad5e3" />
<img width="450" src="https://github.com/user-attachments/assets/b4909f4d-4389-44a7-a949-d11226eb7299" />
<img width="450" src="https://github.com/user-attachments/assets/219662f9-ba4b-42c3-b775-0698852c87b2" />
<img width="450" src="https://github.com/user-attachments/assets/d98dd519-1523-4c96-8785-a4230370e25d" />

---

## 🚀 Features

- 🔐 **User Authentication** – Secure signup, login, and logout using Passport.js
- 🏡 **CRUD Operations** – Create, read, update, and delete listings and reviews
- 📷 **Image Uploads** – Upload listing images using Cloudinary
- 🗺️ **Geolocation** – Location features integrated with Mapbox
- 📱 **Responsive Design** – Built with Bootstrap 5 for mobile-first experience
- ✅ **Validation** – Joi used for validating user inputs and data
- ⚠️ **Error Handling** – Custom error handling with helpful feedback
- 💬 **Flash Messages** – Real-time alerts using connect-flash

---

## 🧰 Tech Stack

### Frontend:
- **Templating**: EJS
- **CSS Framework**: Bootstrap 5
- **Custom CSS**: Additional styling for unique UI

### Backend:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with passport-local-mongoose
- **File Uploads**: Multer and Cloudinary
- **Maps**: Mapbox SDK

---

## 📁 Folder Structure

```
wanderlust/
├── Model/ # Mongoose schemas 
│   ├── listings.js 
│   ├── reviews.js 
│   └── users.js
├── Routes/ # Express route handlers 
│   ├── listings.js 
│   ├── listing.js 
│   ├── reviews.js 
│   └── user.js
├── controllers/ # Route logic 
│   ├── listings.js 
│   ├── reviews.js 
│   └── users.js
├── views/ # EJS templates 
│   ├── layouts/ 
│   ├── listings/ 
│   ├── user/ 
│   ├── includes/ 
│   └── Error.ejs
├── public/ # Static files 
│   ├── css/ 
│   └── js/
├── utils/ # Utility functions 
│   ├── wrapAsync.js 
│   └── ExpressError.js
├── init/ # Sample data 
│   ├── data.js 
│   └── index.js
├── app.js # Main app entry point
├── schema.js # Joi validation schemas
├── cloudConfig.js # Cloudinary configuration
└── package.json # Project metadata
```

---

## 🌐 API Endpoints

### 📌 Listings
| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/listings`      | View all listings         |
| POST   | `/listings`      | Create a new listing      |
| GET    | `/listing/:id`   | View a single listing     |
| PUT    | `/listing/:id`   | Update a listing          |
| DELETE | `/listing/:id`   | Delete a listing          |

### 📝 Reviews
| Method | Endpoint                              | Description             |
|--------|----------------------------------------|-------------------------|
| POST   | `/listing/:id/reviews`                | Add a review            |
| DELETE | `/listing/:id/reviews/:reviewId`      | Delete a review         |

### 👤 User Authentication
| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | `/signup`    | Render signup page        |
| POST   | `/signup`    | Register a new user       |
| GET    | `/login`     | Render login page         |
| POST   | `/login`     | Login existing user       |
| GET    | `/logout`    | Logout current user       |

---

## 📌 Key Files

* `app.js` – Main app file, sets up middleware, routes, and error handlers
* `cloudConfig.js` – Cloudinary image upload config
* `schema.js` – Joi schemas for validating data
* `middleware.js` – Custom middleware functions

---

## 🙋‍♀️ Author

**Shivani Pandey**
Made with ❤️ for travelers and hosts.

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 📎 Notes

* Flash messages give users instant feedback
* Designed to be scalable and easy to maintain

 width="1897" height="860" alt="Image" src="https://github.com/user-attachments/assets/948beb9a-220e-4fb7-9064-81f7a10af0d5" />
