import { useState, useEffect } from "react";
import styled from "styled-components";
import { useCityInfo } from "../context/CityInfoContext";
import { getWeather } from "../services/getWeather";
import { getForecast } from "../services/getForecast";
import lupeIcon from "@resources/lupeIcon.svg";

interface CitySearchBarProps {
  onCityChange: (city: string) => void;
}

const CitySearchBar: React.FC<CitySearchBarProps> = ({ onCityChange }) => {
  const [formData, setFormData] = useState({ city: "" });
  const { setCityInfo, setGraphicInfo } = useCityInfo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchClick = async () => {
    let cityName = formData.city;
    const defaultCity = "Rio de Janeiro";

    if (!cityName) {
      cityName = defaultCity;
    }

    const weatherResponse = await getWeather(cityName);
    if (weatherResponse) {
      setCityInfo(weatherResponse);
      onCityChange(formData.city);
    } else {
      return;
    }

    const forecastResponse = await getForecast(cityName);
    if (forecastResponse) {
      setGraphicInfo(forecastResponse);
      onCityChange(formData.city);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleSearchClick();
  }, []);

  return (
    <StyledLabel>
      <img
        className="lupe"
        src={lupeIcon}
        alt="Lupa"
        onClick={handleSearchClick}
      />
      <StyledInput
        name="city"
        placeholder="Procure por uma cidade"
        value={formData.city}
        onChange={handleInputChange}
      />
    </StyledLabel>
  );
};

const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  padding: 10px;
  gap: 10px;
  max-height: 60px;

  border-radius: 24px;
  background: #ededef;
  box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);

  .lupe {
    width: 2vw;
    height: 2vw;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    height: 10vh;
    max-height: 5vh;
    img {
      width: 4vh;
      height: 4vh;
    }
    .lupe {
      width: 4vh;
      height: 4vh;
    }
  }
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  width: 100%;

  color: #424243;
  font-family: Montserrat;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 2vh;
  }
`;

export default CitySearchBar;
