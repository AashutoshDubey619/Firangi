# 🌍 Firangi - Property Marketplace

Firangi is a robust, full-stack property marketplace application that allows users to discover, list, and review rental accommodations worldwide. Built with performance, security, and user experience in mind, it features a modern glassmorphism UI, interactive wishlists, advanced search capabilities, and a seamless persistent dark mode.

## 🔗 Live Demo
**http://13.233.94.76**

---

## ✨ Key Features

- **Modern UI/UX:** Responsive glassmorphism aesthetic built with custom CSS, EJS, and Bootstrap.
- **Dark Mode:** Seamless, persistent dark theme with local storage integration.
- **Interactive Wishlist:** Asynchronous save-to-wishlist functionality for logged-in users.
- **Advanced Search & Filters:** Regex-based multi-field search (title, location, country) and dynamic category filtering.
- **Optimized Performance:** Server-side pagination and strategic MongoDB indexing for rapid query responses.
- **Security First:** Fortified with Helmet.js (security headers), express-rate-limit (brute-force protection), and express-mongo-sanitize (NoSQL injection prevention).
- **User Authentication:** Secure sessions using Passport.js with password hashing.
- **RESTful CRUD:** Complete property and review management systems with authorization guards.
- **Image Handling:** Supports both URL-based image links and file uploads via Cloudinary & Multer.

---

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, Bootstrap, EJS, JavaScript (Fetch API)
- **Backend:** Node.js, Express.js (v5)
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** Passport.js, express-session
- **Security:** Helmet.js, express-rate-limit, express-mongo-sanitize
- **Deployment & DevOps:** AWS EC2, Nginx (Reverse Proxy), PM2 (Process Management), Docker & Docker Compose

---

## 🚀 Run Locally

This project is fully containerized with Docker, making local setup a breeze. 

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

### Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AashutoshDubey619/Firangi.git
   cd Firangi
   ```

2. **Setup Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_string
   # Optional: Add Cloudinary keys for image uploads
   # CLOUD_NAME=your_cloud_name
   # CLOUD_API_KEY=your_api_key
   # CLOUD_API_SECRET=your_api_secret
   ```

3. **Run with Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```
   The application will be running at `http://localhost:8081`.

---

## ☁️ Deployment (AWS EC2)

This application is architected for production deployment on AWS EC2.
1. Provision an **Ubuntu** EC2 instance.
2. Clone the repository and install dependencies (`npm install`).
3. Use **PM2** to manage the Node.js process: `pm2 start app.js --name firangi`.
4. Configure **Nginx** as a reverse proxy to forward traffic from port 80 to port 3000.
