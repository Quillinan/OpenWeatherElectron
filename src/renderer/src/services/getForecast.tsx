import { GraphicInfo } from "../context/CityInfoContext";
import { api, apiKey, apiUrl } from "./api";

export const getForecast = async (cityName: string): Promise<GraphicInfo> => {
  const url = `${apiUrl}/forecast?q=${encodeURIComponent(
    cityName
  )}&lang=pt_br&appid=${apiKey}&units=metric&ctn=40`;

  console.log(apiKey);

  return api(url);
};
