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

  //todo add token manager with expiracy
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

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

  return (
    <div className="container m-auto relative max-h-100">
      {!token ? (
        <Button type="primary" href={"http://localhost:8888/auth/login"}>
          {" "}
          Login{" "}
        </Button>
      ) : (
        <div className="" style={{ maxHeight: "100%" }}>
          <button className="mt-5 text-black l-0" onClick={logout}>
            Logout
          </button>
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

      <div className="fixed bottom-0 left-0 right-0 w-100 bg-red h-20 flex items-center m-auto justify-center">
        {trackToPlay ? <Player track={trackToPlay} isPlaying={false} progressMs={500000} /> : <p>no tracks to play</p>}
      </div>
    </div>
  );
}

export default Jukebox;
