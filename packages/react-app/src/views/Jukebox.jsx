import { useEffect, useState } from "react";
import Deezer_Logo_RVB_Black from "../img/Deezer_Logo_RVB_Black.svg";
import Deezer_Logo_RVB_White from "../img/Deezer_Logo_RVB_White.svg";
import Search from "../components/Search";
//${process.env.REACT_APP_DEEZER_CALLBACK_URI}

function Jukebox() {
  const [token, setToken] = useState();

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
  const logo = Deezer_Logo_RVB_Black;
  return (
    <div class="container">
      <img src={logo} />
      <h2>ScafoldEth Juske Box using Deezer API</h2>
      {!token ? (
        <a href={"http://localhost:8888/auth/login"}> Login </a>
      ) : (
        <div>
          <p>LoggedIn</p>
          <Search />
        </div>
      )}
    </div>
  );
}

export default Jukebox;
