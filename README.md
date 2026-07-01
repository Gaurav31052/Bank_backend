# Bank Backend

A simple Node.js, Express, and MongoDB backend for banking-related operations with JWT authentication.

## Prerequisites

Make sure you have the following installed on your system:

* Node.js (v18 or later recommended)
* npm
* MongoDB Atlas account or a local MongoDB instance

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Bank_backend
```

### 2. Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Example

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bankDB
JWT_SECRET=mySuperSecretKey
PORT=3000
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on:

```bash
http://localhost:3000
```

---

## Project Structure

```text
Bank_backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Features

* User Registration
* User Authentication using JWT
* Password Hashing with bcryptjs
* MongoDB Integration with Mongoose
* Environment Variable Configuration
* RESTful API Structure

---

## API Endpoints

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Gaurav",
  "email": "gaurav@example.com",
  "password": "XXXXXXXX"
}
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* dotenv

---

## Author

Developed by Gaurav Kumar.
