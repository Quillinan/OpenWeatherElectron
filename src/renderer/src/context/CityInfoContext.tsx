import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CityInfo {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
}

interface CityDetails {
  coord: { lat: number; lon: number };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface WeatherItem {
  clouds: {};
  dt: number;
  dt_txt: Date;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  pop: number;
  rain: {};
  sys: { pod: string };
  visibility: number;
  weather: [];
  wind: {};
}

export interface GraphicInfo {
  city: CityDetails;
  cnt: number;
  cod: string;
  list: WeatherItem[];
  message: number;
}

interface CityInfoContextType {
  cityInfo: CityInfo | null;
  graphicInfo: GraphicInfo | null;
  setCityInfo: Dispatch<SetStateAction<CityInfo | null>>;
  setGraphicInfo: Dispatch<SetStateAction<GraphicInfo | null>>;
}

const CityInfoContext = createContext<CityInfoContextType | undefined>(
  undefined
);

export const CityInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
  const [graphicInfo, setGraphicInfo] = useState<GraphicInfo | null>(null);

  return (
    <CityInfoContext.Provider
      value={{ cityInfo, setCityInfo, graphicInfo, setGraphicInfo }}>
      {children}
    </CityInfoContext.Provider>
  );
};

export const useCityInfo = () => {
  const context = useContext(CityInfoContext);
  if (!context) {
    throw new Error("useCityInfo must be used within a CityInfoProvider");
  }
  return context;
};
