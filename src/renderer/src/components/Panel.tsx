import { useState, useEffect } from "react";
import styled from "styled-components";
import CitySearchBar from "./CitySearchBar";
import ToggleSwitch from "./ToggleSwitch";
import { useCityInfo } from "../context/CityInfoContext";
import { FaCircle } from "react-icons/fa6";
import { convertCtoF, useFahrenheit } from "../context/FahrenheitContext";
import { useDarkMode } from "../context/DarkModeContext";
import casaco from "@renderer/assets/casaco.svg";

interface PanelProps {}

const Panel: React.FC<PanelProps> = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const { darkMode, setDarkMode } = useDarkMode();
  const { cityInfo } = useCityInfo();
  const { far, setFar } = useFahrenheit();
  const temperature = far
    ? convertCtoF(cityInfo?.main.temp)
    : cityInfo?.main.temp;
  const [toggleUnit, setToggleUnit] = useState("°F");
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [color, setColor] = useState<string>();

  const handleCityChange = (city: string) => {
    console.log(`Cidade selecionada: ${city}`);
  };

  const toggleFahrenheit = () => {
    setIsFahrenheit((prev) => !prev);

    if (isFahrenheit) {
      setToggleUnit("°C");
      setFar(!far);
    } else {
      setToggleUnit("°F");
      setFar(!far);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const formatWeather = (weather: string | undefined): string => {
    return weather ? weather.charAt(0).toUpperCase() + weather.slice(1) : "";
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("pt-BR", options);
  };

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedTime = date.toLocaleTimeString("pt-BR", options);

    const capitalizedWeekday =
      formattedTime.charAt(0).toUpperCase() + formattedTime.slice(1);

    return capitalizedWeekday;
  };

  const getColor = (main: string | undefined, dark: boolean): void => {
    const colorMap: { [key: string]: string } = {
      Clear: "#FFA500",
      Clouds: dark ? "#D3D3D3" : "#444244",
      Rain: "#31aee0",
      Snow: dark ? "#FFFFFF" : "#737073",
      Thunderstorm: "#4f43ae",
      Drizzle: "#87CEEB",
      Mist: dark ? "#D3D3D3" : "#737073",
      Haze: dark ? "#D3D3D3" : "#737073",
    };

    setColor(main ? colorMap[main] : "#defaultColor");
  };

  useEffect(() => {
    setCurrentDateTime(new Date());

    if (
      cityInfo &&
      cityInfo.weather &&
      cityInfo.weather[0] &&
      cityInfo.weather[0].main
    ) {
      getColor(cityInfo.weather[0].main, darkMode);
    }
  }, [cityInfo, darkMode]);

  return (
    <StyledPanel>
      <TitleLabel>
        <img src={casaco} alt="Casaco" />
        <h1>Leva um casaquinho?</h1>
      </TitleLabel>

      <CitySearchBar onCityChange={handleCityChange} />

      <TemperatureSection>
        <TemperatureLabel color={color}>
          <div>
            <StyledFaCircle color={color} />
          </div>
          <p className="number">
            {temperature !== undefined
              ? `${temperature.toFixed(2)}°${far ? "F" : "C"}`
              : "N/A"}
          </p>
        </TemperatureLabel>
        <p className="text">
          {formatWeather(cityInfo?.weather[0].description)}
        </p>
      </TemperatureSection>

      <DateSection>
        <p>{formatDate(currentDateTime)}</p>
        <p>{formatTime(currentDateTime)}</p>
      </DateSection>

      <ButtonsSection>
        <ToggleSwitch label={toggleUnit} onToggle={() => toggleFahrenheit()} />
        <ToggleSwitch label="Dark Mode" onToggle={toggleDarkMode} />
      </ButtonsSection>

      <p className="footer">Todos os direitos reservados. 2023.</p>
    </StyledPanel>
  );
};

const StyledPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1% 1% 5%;
  place-content: space-around;

  img {
    width: 6vw;
    max-width: 120px;
    height: auto;
  }

  h1 {
    color: #222;
    font-family: Poppins;
    font-size: 3vw;
    font-weight: 600;
    width: min-content;
  }

  @media (min-width: 601px) {
    .footer {
      position: absolute;
      bottom: 2%;
    }
  }

  @media (max-width: 600px) {
    height: 100vh;
    flex: none;

    h1 {
      font-size: 5vh;
    }
    img {
      width: 10vh;
    }
  }
`;

const TitleLabel = styled.div`
  display: flex;
  flex-direction: row;
`;

const TemperatureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    text-align: center;
    font-size: 1.5vw;
    margin-top: 7vh;
    height: 8vh;
    width: 100%;
    border-bottom: 5px solid #ededed;
  }
  @media (max-width: 600px) {
    .text {
      font-size: 2.5vh;
    }
  }
`;

const StyledFaCircle = styled(FaCircle)`
  width: 3vw;
  height: 3vw;
  margin-right: 1vw;

  @media (max-width: 600px) {
    width: 4.5vh;
    height: 4.5vh;
    margin-right: 1vh;
  }
`;

const TemperatureLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  max-height: 150px;

  .number {
    color: ${(props) => props.color};
    font-size: 6vw;
    font-weight: 300;
  }

  .unit {
    color: ${(props) => props.color};
    font-size: 4vw;
    font-style: normal;
    font-weight: 300;
  }

  @media (max-width: 600px) {
    .number {
      font-size: 10vh;
    }
    .unit {
      font-size: 10vh;
    }
  }
`;

const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Panel;
