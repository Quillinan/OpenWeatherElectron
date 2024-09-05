import { CityInfo } from "../context/CityInfoContext";
import { api, apiKey, apiUrl } from "./api";

export const getWeather = async (cityName: string): Promise<CityInfo> => {
  const url = `${apiUrl}/weather?q=${encodeURIComponent(
    cityName
  )}&lang=pt_br&appid=${apiKey}&units=metric`;

  return api(url);
};
