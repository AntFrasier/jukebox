import React, { useContext } from "react";
import { Row, Typography } from "antd";
import Deezer_Logo_RVB_Black from "../img/Deezer_Logo_RVB_Black.svg";
import Deezer_Logo_RVB_White from "../img/Deezer_Logo_RVB_White.svg";
import { useThemeSwitcher } from "react-css-theme-switcher";

const { Title, Text } = Typography;

// displays a page header

export default function Header({ link, title, subTitle, ...props }) {
  var logo = Deezer_Logo_RVB_Black;
  const theme = useThemeSwitcher();
  console.log(theme.currentTheme);
  if (theme.currentTheme == "dark") {
    logo = Deezer_Logo_RVB_White;
  } else {
    logo = Deezer_Logo_RVB_Black;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "start" }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Title level={4} style={{ margin: "0 0.5rem 0 0" }}>
            {title}
          </Title>
        </a>
        <Row>
          <Text type="secondary" style={{ textAlign: "left" }}>
            {subTitle}
          </Text>
          <img src={logo} style={{ maxWidth: "80px", marginLeft: "5px" }} />
        </Row>
      </div>
      {props.children}
    </div>
  );
}

Header.defaultProps = {
  link: "https://github.com/scaffold-eth/jukebox",
  title: "🏗 Scaffold-Eth Jukebox 🎵 🎶 🎵",
  subTitle: "A pay as you go jukebox powered by Ethereum and ",
};
