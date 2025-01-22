/* eslint-disable @typescript-eslint/no-explicit-any */
// Auth
export const login = async (data: { email: string; password: string }) => {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const register = async (data: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const logout = async () => {
  const response = await fetch("http://localhost:5000/auth/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
};

// Playlists
export const getAllPlaylists = async () => {
  const response = await fetch("http://localhost:5000/playlists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
};

export const getPlaylistById = async (id: string) => {
  const response = await fetch(`http://localhost:5000/playlists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
};

export const addPlaylist = async (data: {
  name: string;
  description: string;
}) => {
  const response = await fetch("http://localhost:5000/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const updatePlaylist = async (id: string, data: any) => {
  const response = await fetch(`http://localhost:5000/playlists/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deletePlaylist = async (id: string) => {
  const response = await fetch(`http://localhost:5000/playlists/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
};

// Spotify
export const spotifyLogin = async () => {
  const authHeader = `Basic ${btoa(
    `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
      import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    }`
  )}`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
    },
    body: params,
  });

  return await response.json();
};

export const spotifySearchTracks = async (query: string, type: string) => {
  const token = JSON.parse(localStorage.getItem("spotify_token") || "");

  if (!token) {
    return { error: "Spotify token not found." };
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token.access_token}` },
    }
  );

  return await response.json();
};
