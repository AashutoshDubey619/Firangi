# Firangi

Firangi is a Full stack web application for listing and exploring rental properties and accommodations. Users can browse listings, create new listings, leave reviews, and manage their accounts.

## Live Link : https://firangiiiiii.onrender.com

## Features

- User authentication with Passport.js (signup, login, logout)
- Create, read, update, and delete property listings
- Upload images for listings using Multer and Cloudinary
- Search listings by title with a dynamic search bar
- Leave reviews on listings with nested user references
- Flash messages for success and error notifications
- Responsive UI with EJS templating and Bootstrap

## Technologies Used

- Node.js and Express.js for backend server
- MongoDB with Mongoose for database and data modeling
- Passport.js for user authentication
- Multer and Cloudinary for image uploads and storage
- EJS and ejs-mate for server-side templating
- Joi for request validation
- Connect-flash for flash messaging
- Method-override for HTTP verbs support
- dotenv for environment variable management

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd Firangi
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary variables such as database URL, Cloudinary credentials, session secret, etc.

5. Start the server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   nodemon app.js
   ```

## Usage

- Access the application at `http://localhost:8080`
- Use the search bar in the navbar to find listings by title
- Register or login to create, edit, or delete listings and leave reviews
- Browse listings on the homepage and view details on individual listing pages

## Folder Structure

- `controllers/` - Route handler logic
- `Models/` - Mongoose schemas and models
- `routes/` - Express route definitions
- `views/` - EJS templates for rendering UI
- `public/` - Static assets like CSS, JS, images
- `utils/` - Utility functions and middleware


