# 🎬 TheatreHub

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

TheatreHub is a premium, full-stack MERN (MongoDB, Express, React, Node.js) application designed for movie enthusiasts. It allows users to browse an extensive catalog of films, filter them by genres, and watch trailers. Administrators have exclusive access to a built-in content management system (CMS) to seamlessly add new movies and genres to the platform.

---

## ✨ Key Features

- **Cinematic UI/UX:** A modern, glassmorphic dark theme inspired by premium streaming services.
- **Authentication System:** Secure Sign In, Sign Up, and Sign Out functionalities using JSON Web Tokens (JWT).
- **Role-Based Access Control (RBAC):** Distinct privileges for standard users and administrative accounts.
- **Content Management:** Admins can easily add, edit, and delete Movies and Genres directly from the user interface.
- **Cloud Media Hosting:** Integrated with the Cloudinary API for secure, optimized movie poster uploads.
- **Email Notifications:** Automated welcome emails sent to new users upon registration using Nodemailer.
- **Smart Filtering:** Effortlessly sort and filter movies by categories and genres.

---

## 🛠️ Technologies Used

### Frontend
- **React.js** (UI Library)
- **Redux** (State Management)
- **React Router** (Navigation)
- **Vanilla CSS / Glassmorphism** (Styling)

### Backend
- **Node.js & Express.js** (Server & API Routing)
- **MongoDB & Mongoose** (Database & ODM)
- **Cloudinary** (Image Hosting API)
- **Nodemailer** (Email Services)
- **Bcrypt & JSON Web Token** (Security & Auth)

---

## 🚀 Getting Started

Follow these instructions to set up TheatreHub on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/buildsbytanmay/TheatreHub.git
   cd TheatreHub
   ```

2. **Install all dependencies**
   This project uses a root `package.json` to manage both backend and frontend dependencies. Run the setup script:
   ```bash
   npm run setup
   ```
   *(Alternatively, run `npm install` in the root directory, and then `npm install` inside the `/frontend` directory).*

### Environment Configuration

Create a `.env` file in the root directory and add the following configuration variables:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/theatrehub
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Setup (For uploading movie posters)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Nodemailer Setup (For welcome emails)
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_email_app_password
```

### Seeding the Database (Optional)

To populate your database with initial movie and genre data, run the seed script:
```bash
npm run seed
```

### Running the Application

You can start both the backend server and the React frontend concurrently with a single command:
```bash
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## 📡 API Reference

### Auth & Users
- `POST /api/auth/signUp` - Register a new user
- `POST /api/auth/signIn` - Authenticate a user and return a token
- `GET /api/users` - Get user details
- `PATCH /api/users/:userId` - Update user information
- `DELETE /api/users/:userId` - Delete a user account

### Movies
- `GET /api/movies` - Fetch all movies
- `GET /api/movies/:movieId` - Fetch a specific movie by ID
- `POST /api/movies/addMovie` - Add a new movie (Admin Only)
- `PATCH /api/movies/:movieId` - Update a movie (Admin Only)
- `DELETE /api/movies/:movieId` - Delete a movie (Admin Only)

### Genres
- `GET /api/genres` - Fetch all genres
- `POST /api/genres/addGenre` - Add a new genre (Admin Only)
- `PATCH /api/genres/:genreId` - Update a genre (Admin Only)
- `DELETE /api/genres/:genreId` - Delete a genre (Admin Only)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Copyright (c) 2024 TheatreHub
