import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface FahrenheitContextType {
  far: boolean;
  setFar: Dispatch<SetStateAction<boolean>>;
}

export const FahrenheitContext = createContext<
  FahrenheitContextType | undefined
>(undefined);

export const FahrenheitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [far, setFar] = useState<boolean>(false);

  return (
    <FahrenheitContext.Provider value={{ far, setFar }}>
      {children}
    </FahrenheitContext.Provider>
  );
};

export const useFahrenheit = (): FahrenheitContextType => {
  const context = useContext(FahrenheitContext);
  if (!context) {
    throw new Error("useFahrenheit must be used within a FahrenheitProvider");
  }
  return context;
};

export const convertCtoF = (value: number | undefined): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  const convertedValue = (value * 9) / 5 + 32;
  return parseFloat(convertedValue.toFixed(2));
};
