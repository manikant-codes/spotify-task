/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { spotifyLogin } from "../../services/apiServices";

// Would have implemented thunk if I  had more time.

const fetchSpotifyToken = createAsyncThunk(
  "auth/fetchSpotifyToken",
  async () => {
    try {
      const result = await spotifyLogin();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    } catch (error) {
      return error;
    }
  }
);

export interface AuthState {
  spotifyToken: string;
  spotifyTokenLoading: boolean;
  spotifyTokenError: string;
}

const initialState: AuthState = {
  spotifyToken: "",
  spotifyTokenLoading: false,
  spotifyTokenError: "",
};

export const authSlice = createSlice({
  name: "spotifyAuth",
  initialState,
  reducers: {
    removeSpotifyToken: (state) => {
      localStorage.removeItem("spotify_token");
      state.spotifyToken = "";
      state.spotifyTokenLoading = false;
      state.spotifyTokenError = "";
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchSpotifyToken.pending, (state: any) => {
      state.spotifyTokenLoading = true;
      state.spotifyTokenError = "";
      state.spotifyToken = "";
    });

    builder.addCase(fetchSpotifyToken.fulfilled, (state: any, action: any) => {
      localStorage.setItem("spotify_token", action.payload);
      state.spotifyToken = action.payload;
      state.spotifyTokenLoading = false;
      state.spotifyTokenError = "";
    });

    builder.addCase(fetchSpotifyToken.rejected, (state: any, action: any) => {
      state.spotifyTokenLoading = false;
      state.spotifyTokenError = action.error.message;
      state.spotifyToken = "";
    });
  },
});

const spotifyAuthReducer = authSlice.reducer;

export default spotifyAuthReducer;
