import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const api = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        Swal.fire({
          title: "Não autorizado",
          text: "Chave da API inválida.",
          icon: "error",
        });
      } else if (axiosError.response?.status === 404) {
        Swal.fire({
          title: "Não encontrado",
          text: "Cidade não existe ou não foi encontrada.",
          icon: "error",
        });
      } else if (axiosError.response?.status === 429) {
        Swal.fire({
          title: "Muitas chamadas",
          text: "Muitas chamadas para a API. Tente novamente mais tarde.",
          icon: "warning",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro na requisição da API.",
          footer:
            '<a href="https://home.openweathermap.org/questions">Entre em contato com a OpenWeather</a>',
        });
      }
    } else {
      Swal.fire({
        title: "Erro",
        text: "Erro na requisição da API.",
        icon: "error",
      });
    }
  }
};
