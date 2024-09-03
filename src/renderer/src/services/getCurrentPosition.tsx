import { CityInfo, GraphicInfo } from "../context/CityInfoContext";
import { getForecastByCoord } from "./getForecastByCoord";
import { getWeatherByCoord } from "./getWeatherByCoord";
import Swal from "sweetalert2";

export interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const getCurrentPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

export const getWeatherAndForecastByCoord = async (): Promise<
  { weatherResponse: CityInfo; forecastResponse: GraphicInfo } | undefined
> => {
  try {
    if ("geolocation" in navigator) {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const weatherResponse = await getWeatherByCoord(latitude, longitude);
      const forecastResponse = await getForecastByCoord(latitude, longitude);

      return { weatherResponse, forecastResponse };
    } else {
      Swal.fire({
        title: "Cidade não encontrada",
        text: "Geolocalização não suportada pelo navegador.",
        icon: "info",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Erro",
      text: "Erro ao obter coordenadas ou dados do tempo",
      icon: "error",
    });
  }

  return undefined;
};
