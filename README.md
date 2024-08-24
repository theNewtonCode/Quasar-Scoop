# Quasar Scoop - Astronomy Blog Website

Quasar Scoop is a full-fledged astronomy blog website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is deployed on MongoDB Atlas and includes features like user authentication, blog creation, and a search functionality.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **User Authentication**: Sign up, login, and secure authentication using JWT tokens.
- **Blog Creation**: Authenticated users can create, edit, and delete blogs.
- **Profile Management**: Each user has a profile displaying their blogs.
- **Search Functionality**: Users can search blogs based on keywords.
- **Responsive Design**: The website is designed to be responsive across devices.

## Project Structure

```
Backend/
├── middleware/
│   └── auth.js
├── models/
│   ├── blog.js
│   ├── comment.js
│   └── user.js
├── routes/
│   ├── blog_route.js
│   ├── email_validation.js
│   ├── home.js
│   ├── search.js
│   └── user_routes.js
├── .env
├── server.js
└── package.json

Frontend/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── css/
│   │   ├── html and css/
│   ├── Pages/
│   │   ├── AuthorProfile.js
│   │   ├── Authors.js
│   │   ├── BlogData.js
│   │   ├── BlogList.js
│   │   ├── CreateBlog.js
│   │   ├── Header.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── App.js
│   └── api.js
├── .env
└── package.json
```

## Installation

### Backend

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone https://github.com/your-username/quasar-scoop.git
   cd quasar-scoop/Backend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following environment variables:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongo_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../Frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the API endpoint:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or log in to create and view astronomy blogs.
3. Use the search bar to find specific blogs by keywords.

## API Endpoints

### User Routes
- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login a user

### Blog Routes
- **POST** `/api/blogs` - Create a new blog
- **GET** `/api/blogs` - Get all blogs
- **GET** `/api/blogs/:id` - Get a single blog by ID
- **PUT** `/api/blogs/:id` - Update a blog by ID
- **DELETE** `/api/blogs/:id` - Delete a blog by ID

## Environment Variables

The project requires the following environment variables:

### Backend
- `PORT`: The port on which the server runs.
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key for JWT token generation.

### Frontend
- `REACT_APP_API_URL`: The base URL for the API.

## Screenshots

### Homepage
![Homepage](./screenshots/homepage.png)

### Blog View
![Blog View](./screenshots/blog-view.png)

### Author Profile
![Author Profile](./screenshots/author-profile.png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
