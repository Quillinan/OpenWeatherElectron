import { CityInfo } from "../context/CityInfoContext";
import { api, apiKey, apiUrl } from "./api";

export const getWeatherByCoord = async (
  latitude: number,
  longitude: number
): Promise<CityInfo> => {
  const url = `${apiUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  return api(url);
};
