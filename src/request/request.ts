import axios from "axios";

const WeatherUrl = 'http://localhost:3001/weather/'

export const instance = axios.create({
    timeout: 10000,
    baseURL: WeatherUrl,
});

class IState implements IState{
}

export const fetchWeatherData = async (zip: string) => {
    const result = await instance.get<IState>(`${zip}`);
    return result;
};