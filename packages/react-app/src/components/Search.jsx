import { Button, Form, Input } from "antd";
import { useState } from "react";
import axios from "axios";

function Search() {
  const [toSearch, setToSearch] = useState("");

  async function handleSubmit() {
    console.log("searching ....");
    const result = await axios.get("http://localhost:8888/search", { test: "test" });
    console.log(result.data.response.body);
  }
  function test() {
    console.log("test");
  }

  return (
    <div>
      <Form>
        <div>
          <Input
            type={"text"}
            value={toSearch}
            onChange={e => setToSearch(e.target.value)}
            placeholder={"Search Artiste / Track"}
          />
          <Button
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Search
          </Button>
        </div>
      </Form>
      Search
    </div>
  );
}

export default Search;
