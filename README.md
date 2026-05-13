# NookAway – Your nook, anywhere in the world.

NookAway is a full-stack property listing web application where users can create, explore, and manage accommodation listings. Users can securely authenticate, upload listing images, search properties, view locations on interactive maps, and leave reviews on listings.

The project demonstrates core full-stack development concepts including authentication, authorization, CRUD operations, RESTful routing, cloud deployment, image storage integration, and database relationships.

---

## Live Demo

https://nookaway.onrender.com/listings

---

## Features

- User Authentication (Signup / Login / Logout)
- Authorization for listing and review owners
- Create, edit, and delete property listings
- Image upload and storage using Cloudinary
- Interactive maps for property locations
- Search functionality for listings
- Review and rating system
- Form validation using Joi
- Flash messages for user feedback
- Full CRUD operations for listings and reviews
- Fully deployed production application

---

## Tech Stack

### Frontend
- EJS
- Bootstrap
- JavaScript

### Backend
- Node.js
- Express.js
- Passport.js
- Express Router

### Database & Cloud
- MongoDB Atlas
- Mongoose
- Cloudinary
- Render

### Validation & Utilities
- Joi
- connect-flash
- Middleware
- MVC Architecture

---

## Project Structure

models/ – Mongoose schemas for database models (User, Listing, Review)

routes/ – Express route handlers for listings, reviews, and authentication

controllers/ – Business logic for listings, reviews, and users

views/ – EJS templates used to render dynamic frontend pages

public/ – Static assets such as CSS, JavaScript, and images

utils/ – Utility functions for error handling and async wrappers

init/ – Database initialization and seed scripts

app.js – Main application file configuring Express server and routes

middleware.js – Custom middleware for authentication, authorization, and validation

schema.js – Joi validation schemas

cloudConfig.js – Cloudinary configuration for image uploads

---

## Future Improvements

- Booking and reservation system
- Wishlist/favorites feature
- Pagination for listings
- Advanced filters and sorting
- Improved responsive UI
- Docker support and CI/CD pipeline

---

## Status

Project is actively being improved with new features and optimizations.
