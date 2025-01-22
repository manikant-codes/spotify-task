# How to Run this Project Locally: A Step-by-Step Guide

1. **Download the Zip File**: Download the zip file of this repository on your local device.
2. **Unzip and Open**: Unzip it and open it with your preferred code editor that has a built-in terminal. If your editor doesn't have a built-in terminal, you'll need to run commands in a separate terminal. VS Code is a good code editor with a built-in terminal.
3. **Install Prerequisites**: Make sure you have Node.js, MongoDB Community Server, and MongoDB Compass installed to follow the instructions ahead.
4. **Install Frontend Dependencies**: Navigate to the frontend folder using the `cd` command in your terminal and run the command `npm i`. This will install all the dependencies for the frontend.
5. **Install Backend Dependencies**: Navigate to the backend folder using the `cd` command in your terminal and run the same command: `npm i`. This will install all the dependencies for the backend.
6. **Setup Environment Variables**:
   - For the backend, make a new `.env` file and copy the contents of the `.env.example` file into it. Replace the values of `JWT_SECRET` and `JWT_EXPIRY` variables with your own.
   - For the frontend, make a new `.env.local` file and copy the contents of the `.env.example` file into it. You'll need to set the values of `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET` which you will receive after signing up for Spotify's developer account.
7. **Run the Project**: You can now run both the frontend and backend using the `npm start` command in their respective terminals. Your project should be running in your browser at the port specified in the frontend's terminal.

# API Documentation

## Auth Routes

### Register Route

Registers a new user.

- **URL:** `/register`
- **Method:** `POST`
- **Header:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `201 Created`: User created successfully.
  - `400 Bad Request`: Missing or invalid fields.
  - `500 Internal Server Error`: Error message.

### Login Route

Authenticates a user.

- **URL:** `/login`
- **Method:** `POST`
- **Header:**
  - `Content-Type: application/json`
- **Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

- **Response:**

  - `200 OK`: Token provided.
  - `400 Bad Request`: Missing or invalid fields.
  - `404 Not Found`: Invalid email or password.
  - `500 Internal Server Error`: Error message.

### Logout Route

Logs out a user.

- **URL:** `/logout`
- **Method:** `GET`
- **Header:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: Logged out successfully.
  - `500 Internal Server Error`: Error message.

## Playlist Routes

### Get All Playlists Route

Fetches all playlists for a user.

- **URL:** `/playlists`
- **Method:** `GET`
- **Header:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: All playlists fetched successfully.
  - `500 Internal Server Error`: Error message.

### Get Playlist by ID Route

Fetches a single playlist by its ID.

- **URL:** `/playlists/:id`
- **Method:** `GET`
- **Header:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: Playlist fetched successfully.
  - `404 Not Found`: Playlist not found.
  - `500 Internal Server Error`: Error message.

### Add Playlist Route

Creates a new playlist.

- **URL:** `/playlists`
- **Method:** `POST`
- **Header:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "My Playlist",
    "description": "A collection of my favorite tracks."
  }
  ```
- **Response:**
  - `200 OK`: Playlist created successfully.
  - `400 Bad Request`: Name is required.
  - `500 Internal Server Error`: Error message.

### Update Playlist Route

Updates an existing playlist.

- **URL:** `/playlists/:id`
- **Method:** `PUT`
- **Header:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "Updated Playlist Name",
    "description": "Updated description.",
    "tracks": [
      {
        "trackId": "asd1283908adjld",
        "trackName": "Name of the track.",
        "artistName": "John Doe",
        "albumName": "Test Album",
        "albumArt": "Test Art",
        "duration": 21312,
        "trackUrl": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
      }
    ]
  }
  ```
- **Response:**
  - `200 OK`: Playlist updated successfully.
  - `404 Not Found`: Playlist not found.
  - `500 Internal Server Error`: Error message.

### Delete Playlist Route

Deletes a playlist by its ID.

- **URL:** `/playlists/:id`
- **Method:** `DELETE`
- **Header:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: Playlist deleted successfully.
  - `404 Not Found`: Playlist not found.
  - `500 Internal Server Error`: Error message.
