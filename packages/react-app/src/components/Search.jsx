import { Button, Form, Input } from "antd";
import { useState } from "react";
import axios from "axios";

function Search({ setArtists, setTracks, setAlbums }) {
  const [toSearch, setToSearch] = useState("");

  async function handleSubmit() {
    console.log("searching ....");
    const result = await axios.get("http://localhost:8888/search", {
      params: {
        toSearch: toSearch,
      },
    });
    console.log("retour :", result.data.response.body.data);
    const response = await result.data.response.body.data;
    const newArtists = [];
    const newTracks = [];
    const newAlbums = [];
    const temp = response.map(item => {
      if (item.artist) newArtists.push(item.artist);
      if (item.type == "track") newTracks.push(item);
      if (item.album) newAlbums.push(item.album);
      return item.id;
    });
    setArtists(newArtists);
    setAlbums(newAlbums);
    setTracks(newTracks);
  }

  const { Search } = Input;

  return (
    <div>
      <Form>
        <div>
          <Search
            type={"text"}
            value={toSearch}
            onChange={e => setToSearch(e.target.value)}
            placeholder={"Search Artiste / Track"}
            onSearch={() => {
              handleSubmit();
            }}
          />
          {/* <Button
            type="submit"
            autoFocus="true"
            onClick={() => {
              handleSubmit();
            }}
          >
            Search
          </Button> */}
        </div>
      </Form>
    </div>
  );
}

export default Search;
