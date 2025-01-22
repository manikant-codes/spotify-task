/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Playlist } from "../../pages/Dashboard";
import { getAllPlaylists, updatePlaylist } from "../../services/apiServices";
import { SpotifyTrack } from "./TrackCard";
import { useFetch } from "../../customHooks/useFetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddToPlaylistModal({
  isOpen,
  toggleIsOpen,
  selectedTrack,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
  selectedTrack: SpotifyTrack;
}) {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  const {
    data: playlists,
    // error: playlistsError,
    // isLoading: isPlaylistsLoading,
  } = useFetch(getAllPlaylists, [] as any) as any;

  const handleSubmit = async () => {
    try {
      for (const id of selectedPlaylists) {
        const foundPlaylist = playlists.find(
          (playlist: Playlist) => playlist._id === id
        );

        if (!foundPlaylist) {
          return;
        }

        await updatePlaylist(id, {
          tracks: [
            ...foundPlaylist.tracks,
            {
              trackId: selectedTrack.id,
              trackName: selectedTrack.name,
              artistName: selectedTrack.artists[0].name,
              albumName: selectedTrack.album.name,
              albumArt: selectedTrack.album.images[0].url,
              duration: selectedTrack.duration_ms,
              trackUrl: selectedTrack.preview_url,
            },
          ],
        });

        alert("Playlist updated successfully.");

        toggleIsOpen();
      }
    } catch (error) {
      alert("Failed to update the playlist.");
      console.log("Error: ", error);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if ((selectedPlaylists as string[]).includes(id)) {
      setSelectedPlaylists(
        selectedPlaylists.filter((playlist: string) => playlist !== id)
      );
    } else {
      const updatedPlaylists = [
        ...selectedPlaylists,
        id,
      ] as unknown as string[];
      setSelectedPlaylists(updatedPlaylists as any);
    }
  };

  if (!isLoggedIn) {
    return (
      <Modal open={isOpen} onClose={toggleIsOpen}>
        <Box sx={style}>
          <Typography id="title" variant="h6" component="h2">
            Please login first!
          </Typography>
          <p className="!mb-8">
            You need to be logged in to add a track to a playlist.
          </p>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            fullWidth
            className="mt-4"
          >
            Login
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={isOpen} onClose={toggleIsOpen}>
      <Box sx={style}>
        <Typography id="title" variant="h6" component="h2">
          Choose A Playlist
        </Typography>
        <hr className="mt-2" />
        <ul className="my-2 max-h-[200px] overflow-auto">
          {playlists?.map((playlist: Playlist) => (
            <li key={playlist._id}>
              <FormControlLabel
                name="playlists"
                checked={(selectedPlaylists as string[]).includes(playlist._id)}
                control={<Checkbox />}
                label={playlist.name}
                onChange={() => {
                  handleCheckboxChange(playlist._id);
                }}
              />
            </li>
          ))}
        </ul>
        <Button onClick={handleSubmit} fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default AddToPlaylistModal;
