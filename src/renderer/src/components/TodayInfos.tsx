import styled from "styled-components";
import { useCityInfo } from "../context/CityInfoContext";
import { convertCtoF, useFahrenheit } from "../context/FahrenheitContext";

type TodayInfosProps = object;

const TodayInfos: React.FC<TodayInfosProps> = () => {
  const { cityInfo } = useCityInfo();
  const { far } = useFahrenheit();
  const temp_min = far
    ? convertCtoF(cityInfo?.main.temp_min)
    : cityInfo?.main.temp_min;
  const temp_max = far
    ? convertCtoF(cityInfo?.main.temp_max)
    : cityInfo?.main.temp_max;
  return (
    <StyledTodayInfos>
      <Line>
        <Box>
          <p className="title">Mínima</p>
          <p className="info">
            {temp_min !== undefined
              ? `${temp_min.toFixed(2)}°${far ? "F" : "C"}`
              : "N/A"}
          </p>
        </Box>
        <Box>
          <p className="title">Máxima</p>
          <p className="info">
            {temp_max !== undefined
              ? `${temp_max.toFixed(2)}°${far ? "F" : "C"}`
              : "N/A"}
          </p>
        </Box>
      </Line>
      <Line>
        <Box>
          <p className="title">Umidade</p>
          <p className="info">{cityInfo?.main.humidity}%</p>
        </Box>
        <Box>
          <p className="title">Velocidade do vento</p>
          <p className="info">{cityInfo?.wind.speed} m/s</p>
        </Box>
      </Line>

      {cityInfo?.main?.temp_min !== undefined &&
      cityInfo?.main?.temp_min > 17 ? (
        <p className="phrase">Não, você não deve levar um casaquinho!</p>
      ) : (
        <p className="phrase">Você deve levar um casaquinho!</p>
      )}
    </StyledTodayInfos>
  );
};

export default TodayInfos;

const StyledTodayInfos = styled.div`
  display: flex;
  flex-direction: column;

  .phrase {
    color: #afadad;
    font-size: 1.5vw;
    font-style: italic;
    font-weight: 400;
    margin-top: 5%;
  }

  @media (max-width: 600px) {
    .phrase {
      font-size: 2vh;
      margin-top: 2vh;
    }
  }
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4%;
  justify-content: center;
  align-items: flex-start;

  height: 90%;
  width: 40%;
  max-height: 180px;
  max-width: 500px;

  border-radius: 32px;
  background: linear-gradient(117deg, #4d4494 22.83%, #4f43ae 90.03%);

  box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);

  .title {
    color: #fff;
    font-size: 1.5vw;
    font-weight: 700;
  }

  .info {
    color: #fff;
    font-size: 2vw;
    font-style: normal;
    font-weight: 600;
    margin-top: 2%;
  }

  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
    margin-top: 2vh;
    border-radius: 16px;
    .title {
      font-size: 2vh;
    }
    .info {
      font-size: 4vh;
    }
  }
`;
