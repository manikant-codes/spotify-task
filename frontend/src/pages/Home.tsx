/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddToPlaylistModal from "../components/home/AddToPlaylistModal";
import TrackCard, { SpotifyTrack } from "../components/home/TrackCard";
import { spotifyLogin, spotifySearchTracks } from "../services/apiServices";

function Home() {
  const [isTracksLoading, setIsTracksLoading] = useState(false);
  const [tracks, setTracks] = useState(null);
  const [tracksError, setTracksError] = useState("");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    if (!isOpen) {
      setSelectedTrack(null);
    }
    setIsOpen(!isOpen);
  }

  const fetchSpotifyToken = async () => {
    try {
      const result = await spotifyLogin();
      localStorage.setItem("spotify_token", JSON.stringify(result));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("spotify_token")) {
      fetchSpotifyToken();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsTracksLoading(true);

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData) as {
        search: string;
      };

      const result = await spotifySearchTracks(data.search, "track");

      if (result.error) {
        localStorage.removeItem("spotify_token");
        await fetchSpotifyToken();
        return;
      }

      setTracks(result.tracks);
    } catch (error) {
      alert("Failed to fetch tracks.");
      setTracksError("Failed to fetch tracks. Reload to retry.");
      console.log("Error: ", error);
    } finally {
      setIsTracksLoading(false);
    }
  };

  if (isTracksLoading) {
    return (
      <div className="p-8 font-semibold text-center text-xl">Loading...</div>
    );
  }

  if (tracksError) {
    return (
      <div className="p-8 font-semibold text-center text-red-700 text-xl">
        {tracksError}
      </div>
    );
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <TextField
          id="search"
          name="search"
          type="text"
          label="Search Songs Here"
          variant="outlined"
          fullWidth
        />
        <Button type="submit" className="h-[55.98px]" variant="contained">
          Search
        </Button>
      </form>

      {tracks && (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {(tracks as any)?.items.map((track: SpotifyTrack) => (
            <TrackCard
              key={track.id}
              track={track}
              setSelectedTrack={setSelectedTrack}
              toggleIsOpen={toggleIsOpen}
            />
          ))}
        </div>
      )}

      {!tracks && (
        <div className="p-8 font-semibold text-center text-xl">
          Search Songs to Add to Playlists :)
        </div>
      )}

      {isOpen && (
        <AddToPlaylistModal
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          selectedTrack={selectedTrack as any}
        />
      )}
    </div>
  );
}

export default Home;
