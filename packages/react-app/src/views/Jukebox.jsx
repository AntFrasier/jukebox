import { useEffect, useState } from "react";
import Deezer_Logo_RVB_Black from "../img/Deezer_Logo_RVB_Black.svg";
import Deezer_Logo_RVB_White from "../img/Deezer_Logo_RVB_White.svg";
import Search from "../components/Search";
import { Button, Divider } from "antd";
import ArtistList from "../components/ArtistList";
import { TrackList } from "../components";
import Player from "../components/Player";

function Jukebox() {
  const [token, setToken] = useState();
  const [artists, setArtists] = useState();
  const [tracks, setTracks] = useState();
  const [albums, setAlbums] = useState();
  const [trackToPlay, setTrackToPlay] = useState();

  //todo add a logOUt

  useEffect(() => {
    async function getToken() {
      //todo to move in a hook or something
      const response = await fetch("http://localhost:8888/auth/token");
      const json = await response.json();
      setToken(json.accessToken);
      window.localStorage.setItem("token", json.accessToken);
    }
    //todo manage refresh token
    getToken();
  }, []);

  // const logo = theme == "light" ? Deezer_Logo_RVB_Black : Deezer_Logo_RVB_White;

  return (
    <div className="container m-auto relative max-h-100">
      {!token ? (
        <Button type="primary" href={"http://localhost:8888/auth/login"}>
          {" "}
          Login{" "}
        </Button>
      ) : (
        <div className="m" style={{ maxHeight: "100%" }}>
          <Search setArtists={setArtists} setTracks={setTracks} setAlbums={setAlbums} />
          {artists ? (
            <>
              {/* <ArtistList artists={artists} />  */}
              <Divider />
            </>
          ) : null}
          {tracks ? <TrackList tracks={tracks} setTrackToPlay={setTrackToPlay} /> : null}
        </div>
      )}

      <div className="b-0">
        {trackToPlay ? <Player track={trackToPlay} isPlaying={false} progressMs={500000} /> : <p>no tracks to play</p>}
      </div>
    </div>
  );
}

export default Jukebox;
