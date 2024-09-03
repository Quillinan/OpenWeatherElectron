import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodayInfos from "./TodayInfos";
import GraphicInfo from "./GraphicInfo";
import { useCityInfo } from "../context/CityInfoContext";
import { useDarkMode } from "../context/DarkModeContext";

interface PrincipalProps {}

const Principal: React.FC<PrincipalProps> = () => {
  const [showTodayInfos, setShowTodayInfos] = useState(true);
  const { cityInfo } = useCityInfo();
  const { darkMode } = useDarkMode();
  const [color, setColor] = useState<string>();

  const handleTabClick = (tab: "today" | "nextDays") => {
    setShowTodayInfos(tab === "today");
  };

  const getColor = (dark: boolean): void => {
    setColor(dark ? "#333" : "#efefef");
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    getColor(darkMode);
  }, [darkMode]);

  return (
    <StyledPrincipal color={color}>
      <TitleLabel>
        <p
          className={showTodayInfos ? "p-select" : "p-unselect"}
          onClick={() => handleTabClick("today")}
        >
          Hoje
        </p>
        <p
          className={!showTodayInfos ? "p-select" : "p-unselect"}
          onClick={() => handleTabClick("nextDays")}
        >
          Próximos dias
        </p>
      </TitleLabel>

      <CityLabel>
        <p className="cityName">{cityInfo?.name}</p>
        <p className="cityCoord">
          Lat: {cityInfo?.coord.lat} Long: {cityInfo?.coord.lon}
        </p>
      </CityLabel>

      {showTodayInfos ? <TodayInfos /> : <GraphicInfo />}

      <Footer>
        <p>Dados fornecidos pela</p>
        <a
          className="enterprise"
          href="https://openweathermap.org/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Weather API
        </a>
      </Footer>
    </StyledPrincipal>
  );
};

const StyledPrincipal = styled.div`
  flex: 2;
  padding: 2% 2% 5%;
  display: flex;
  flex-direction: column;
  place-content: space-around;
  background-color: ${(props) => props.color};

  @media (max-width: 600px) {
    height: 100vh;
    flex: none;
    text-align: center;
    padding: 5% 10%;
  }
`;

const TitleLabel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6%;

  .p-select {
    font-size: 2.5vw;
    cursor: pointer;
  }

  .p-unselect {
    color: #c8c8c8;
    font-size: 2.5vw;
    font-style: normal;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    gap: 6vw;
    .p-select {
      font-size: 4vh;
    }
    .p-unselect {
      font-size: 4vh;
    }
  }
`;

const CityLabel = styled.div`
  display: flex;
  flex-direction: column;

  .cityName {
    font-size: 6.75vw;
  }
  .cityCoord {
    font-size: 1.5vw;
  }

  @media (max-width: 600px) {
    .cityName {
      font-size: 8.5vh;
    }
    .cityCoord {
      font-size: 5vw;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5%;
  align-items: center;

  .enterprise {
    text-decoration: none;
    color: #96a7f2;
    cursor: pointer;
    font-family: "Poppins";
    font-size: 1.25vw;
    font-style: normal;
    font-weight: 400;
  }

  @media (min-width: 601px) {
    position: absolute;
    bottom: 2%;
    width: 50%;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .enterprise {
      font-size: 5vw;
    }
  }
`;

export default Principal;
