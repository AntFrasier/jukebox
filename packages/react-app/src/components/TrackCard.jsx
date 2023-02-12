import { PlayCircleOutlined, PlayCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { Button, List, Progress } from "antd";
import Text from "antd/lib/typography/Text";

function TrackCard({ track, setTrackToPlay }) {
  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function secondsToMinutesAndSeconds(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = (sec % 60).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  console.log("track", track);
  const { id, artist, album, duration, title: name } = track;
  return (
    <List.Item
      key={id}
      style={{ padding: "5px", fontSize: "0.9em" }}
      extra={
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img style={{ borderRadius: "50%", overflow: "hidden" }} width={35} alt={name} src={album.cover} />
          <span style={{ fontSize: "0.75em" }}>
            Duration: <b>{secondsToMinutesAndSeconds(duration)}</b>
          </span>
        </div>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "10% 28% 24% 28% 10%",
          justifyContent: "space-evenly",
          textAlign: "left",
        }}
      >
        <div style={{ width: "75px" }}>
          {/* rank goes from 0 to 1M */}
          <Progress percent={(track.rank / 10000).toFixed(0)} showInfo={false} />
        </div>
        <div style={{ cursor: "pointer" }}>
          <Text>{name}</Text>
        </div>
        <div>{artist.name}</div>
        <div>{album.title}</div>
        <div className="flex">
          <Button icon={<PlayCircleTwoTone />} onClick={() => setTrackToPlay(track)}>
            Play
          </Button>
          <Button icon={<PlusCircleTwoTone />}>Add</Button>
        </div>
      </div>
    </List.Item>
  );
}

export default TrackCard;
