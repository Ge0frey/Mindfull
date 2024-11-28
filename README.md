# Mindfull - A Psychotherapy Application

## Overview

Mindfull is a web application designed to connect therapists with clients seeking mental health support. The platform allows users to book appointments, view their upcoming sessions, and manage their profiles. It provides a user-friendly interface for both clients and therapists, ensuring a seamless experience in accessing mental health services.

## Features

- **User Authentication**: Secure login and registration for users.
- **Appointment Management**: Users can view, book, and cancel appointments with therapists.
- **Therapist Directory**: A comprehensive list of therapists with their specializations and availability.
- **Responsive Design**: The application is designed to work on various devices, ensuring accessibility for all users.
- **Error Handling**: User-friendly error messages for failed operations.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - Frameworks: None (Vanilla JS)
  - Libraries: Axios for API requests, Font Awesome for icons

- **Backend**:
  - Node.js with Express for server-side logic
  - MySQL for database management
  - Bcrypt for password hashing
  - dotenv for environment variable management
  - CORS for cross-origin resource sharing

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mindfull.git
   cd mindfull
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a MySQL database named `mindful_db`.
   - Import the necessary SQL schema to create the required tables (users, therapists, appointments).

4. **Configure environment variables**:
   - Create a `.env` file in the root directory and add the following:
     ```
     PORT=6969
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=mindful_db
     SESSION_SECRET=your_secret_key
     ```

5. **Run the application**:
   ```bash
   npm start
   ```

6. **Access the application**:
   - Open your browser and navigate to `http://localhost:6969`.

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in an existing user.
- **POST** `/api/auth/logout`: Log out the current user.
- **GET** `/api/auth/profile`: Get the current user's profile.
- **PUT** `/api/auth/profile`: Update the current user's profile.

### Appointments
- **POST** `/api/appointments`: Book a new appointment.
- **GET** `/api/appointments`: Get all appointments for the logged-in user.
- **PUT** `/api/appointments/:id`: Update an existing appointment.
- **DELETE** `/api/appointments/:id`: Cancel an appointment.

### Therapists
- **GET** `/api/therapists`: Get a list of all therapists.
- **GET** `/api/therapists/:id`: Get details of a specific therapist.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
