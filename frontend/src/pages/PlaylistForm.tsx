import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPlaylist,
  getPlaylistById,
  updatePlaylist,
} from "../services/apiServices";
import { Track } from "./Dashboard";

const initialFormState = {
  name: "",
  description: "",
  tracks: [],
};

function PlaylistForm() {
  const { id } = useParams();
  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();

  const isNew = id === "new";

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const result = await getPlaylistById(id as string);

        if (!result.success) {
          return alert(result.message);
        }

        setFormState(result.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (!isNew) {
      fetchPlaylist();
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      let result;

      if (isNew) {
        result = await addPlaylist(formState);
      } else {
        result = await updatePlaylist(id as string, formState);
      }

      if (!result.success) {
        return alert(result.message);
      }

      alert(`Playlist ${isNew ? "added" : "updated"} successfully.`);

      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    setFormState({
      ...formState,
      tracks: formState.tracks.filter((track: Track) => track.trackId !== id),
    });
  };

  return (
    <div className="p-8">
      <h2 className="mb-4 font-semibold text-2xl">
        {isNew ? "Add" : "Update"} Playlist
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          type="text"
          label="Playlist Name"
          variant="outlined"
        />
        <TextField
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          type="text"
          multiline
          rows={4}
          label="Playlist Description"
          variant="outlined"
        />
        {formState.tracks && (
          <div>
            <p className="mb-4">Songs:</p>
            <ul className="flex flex-col gap-2">
              {formState.tracks.map((track: Track) => (
                <li
                  key={track._id}
                  className="flex justify-between items-center border-gray-300 p-4 border"
                >
                  <div>
                    <p className="font-semibold">{track.trackName}</p>
                    <p>{track.artistName}</p>
                  </div>
                  <Button
                    onClick={() => handleDelete(track.trackId)}
                    color="error"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" variant="contained">
          {isNew ? "Add" : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default PlaylistForm;
