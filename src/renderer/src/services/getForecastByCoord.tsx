import { GraphicInfo } from "../context/CityInfoContext";
import { api, apiKey, apiUrl } from "./api";

export const getForecastByCoord = async (
  latitude: number,
  longitude: number,
): Promise<GraphicInfo> => {
  const url = `${apiUrl}/forecast?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=${apiKey}&units=metric&ctn=40`;

  return api(url);
};
