import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: [{ url: string }];
    name: string;
  };
  artists: [{ name: string }];
  duration_ms: number;
  preview_url: string;
}

function TrackCard({
  track,
  toggleIsOpen,
  setSelectedTrack,
}: {
  track: SpotifyTrack;
  toggleIsOpen: () => void;
  setSelectedTrack: Dispatch<SetStateAction<null>>;
}) {
  return (
    <div>
      <div key={track.id} className="border-gray-300 border">
        <img src={track.album?.images[0].url} alt="" className="w-full" />
        <div className="p-4">
          <p className="mt-1 font-semibold">{track.name}</p>

          <Button
            onClick={() => {
              toggleIsOpen();
              setSelectedTrack(track);
            }}
            variant="contained"
            className="block !mt-4"
          >
            Add to Playlist
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TrackCard;
