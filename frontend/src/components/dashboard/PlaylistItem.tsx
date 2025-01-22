import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Playlist } from "../../pages/Dashboard";
import { deletePlaylist } from "../../services/apiServices";

function PlaylistItem({
  playlist,
  isLast,
  fetchAllPlaylists,
}: {
  playlist: Playlist;
  isLast: boolean;
  fetchAllPlaylists: () => Promise<void>;
}) {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/admin/playlist/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this playlist?")) {
        const result = await deletePlaylist(id);
        if (!result.success) {
          return alert(result.message);
        }

        await fetchAllPlaylists();

        alert("Playlist deleted successfully.");
      }
    } catch (error) {
      alert("Failed to delete playlist.");
      console.log("Error: ", error);
    }
  };

  return (
    <div key={playlist._id}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-xl">{playlist.name}</h3>
          <p>{playlist.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              handleEdit(playlist._id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(playlist._id);
            }}
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
      {!isLast && <hr className="my-4" />}
    </div>
  );
}

export default PlaylistItem;
