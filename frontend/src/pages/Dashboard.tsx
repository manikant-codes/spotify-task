import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaylistItem from "../components/dashboard/PlaylistItem";
import { getAllPlaylists } from "../services/apiServices";

export interface Track {
  _id: string;
  trackId: string;
  trackName: string;
  albumName: string;
  artistName: string;
  albumArt?: string;
  duration: number;
  trackUrl: null;
}

export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  tracks: [Track];
}

function Dashboard() {
  const [playlists, setPlaylists] = useState([]);

  const fetchAllPlaylists = async () => {
    try {
      const result = await getAllPlaylists();

      if (!result.success) {
        return alert(result.message);
      }

      setPlaylists(result.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchAllPlaylists();
  }, []);

  return (
    <div className="p-8">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl">Dashboard</h2>
      </div>
      <hr className="mt-2 mb-8" />

      {/* Subtitle and Add New Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl">Playlists</h3>
        <Button component={Link} to="/admin/playlist/new" variant="contained">
          Add New
        </Button>
      </div>

      <div>
        {playlists?.length > 0 && (
          <div className="border-gray-300 p-4 border">
            {playlists.map((playlist: Playlist, index) => (
              <PlaylistItem
                key={playlist._id}
                playlist={playlist}
                isLast={playlists.length - 1 === index}
                fetchAllPlaylists={fetchAllPlaylists}
              />
            ))}
          </div>
        )}

        {playlists?.length === 0 && (
          <div className="border-gray-300 p-4 border">
            <p>No playlists found. Create one now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
