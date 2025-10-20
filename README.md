# Firangi

Firangi is a Full stack web application for listing and exploring rental properties and accommodations. Users can browse listings, create new listings, leave reviews, and manage their accounts.

## Live Link

**https://firangi-akd.onrender.com**

## 🚀 Run Locally with Docker (Recommended)

This project is fully containerized and includes a `docker-compose.yml` file for easy setup. You can run the entire application with a single command.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Instructions
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AashutoshDubey619/Firangi.git](https://github.com/AashutoshDubey619/Firangi.git)
    cd Firangi
    ```

2.  **Create your environment file:**
    This project uses an `.env` file for secrets. An example is provided; you can copy it to get started.
    ```bash
    # For Windows (in Command Prompt)
    copy example.env .env

    # For Windows (in PowerShell)
    Copy-Item example.env .env

    # For Mac/Linux
    cp example.env .env
    ```
    
3.  **Edit your `.env` file:**
    Open the newly created `.env` file and fill in all your secrets (your `ATLASDB_URL`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`, etc.).

4.  **Run the application:**
    This command will build the Docker image, download the dependencies, and start the application.
    ```bash
    docker compose up --build
    ```
    
The application will be available at **`http://localhost:8081`**. (Note: it runs on port 8081 to avoid conflicts with other local servers).

To stop the application, press `Ctrl + C` in the terminal.

---

## Features

-   **Dockerized:** Fully containerized for consistent, one-command setup.
-   **User Authentication:** Secure signup, login, and logout using Passport.js.
-   **RESTful CRUD:** Create, Read, Update, and Delete property listings.
-   **Image Uploads:** Seamless image uploads to Cloudinary using Multer.
-   **Reviews:** Users can create and delete reviews for listings.
-   **Dynamic Search:** Search for listings by title.
-   **Flash Messages:** Provides user feedback for success and error actions.
-   **Responsive Design:** Built with Bootstrap and EJS for a responsive UI.

## Technologies Used

-   **Containerization:** Docker & Docker Compose
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (via Mongoose)
-   **Templating:** EJS, ejs-mate
-   **Authentication:** Passport.js, Passport-Local
-   **File Storage:** Cloudinary, Multer
-   **Validation:** Joi
-   **Middleware:** connect-flash, method-override, express-session

## Folder Structure

-   `controllers/` - Route handler logic
-   `Models/` - Mongoose schemas and models
-   `routes/` - Express route definitions
-   `views/` - EJS templates for rendering UI
-   `public/` - Static assets like CSS, JS, images
-   `utils/` - Utility functions and middleware
-   `Dockerfile` - Instructions to build the application image.
-   `docker-compose.yml` - Defines and runs the multi-container application.
-   `.dockerignore` - Specifies files to ignore during the Docker build.

---

## (Legacy) Manual Installation

These instructions are for running the application directly on your machine without Docker.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AashutoshDubey619/Firangi.git](https://github.com/AashutoshDubey619/Firangi.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Firangi
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    -   Create a `.env` file in the root directory.
    -   Add necessary variables: `ATLASDB_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`, `SECRET`.

5.  **Start the server:**
    ```bash
    # For development (with auto-restart)
    nodemon app.js
    
    # For production
    npm start
    ```
6.  **Usage:**
    -   Access the application at `http://localhost:8080`.


