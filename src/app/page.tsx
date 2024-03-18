"use client";
import { useEffect, useState } from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "../components/SearchBox";
import axios from "axios";
import {
  formatDate,
  convertKelvinToCelsius,
  metersToKilometers,
  getTime,
  convertWindSpeed,
} from "../utils/utils";
import WeatherContainer from "@/components/WeatherContainer";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetailsContainer from "@/components/WeatherDetailsContainer";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: number;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: string;
    sunset: string;
  };
}

export default function Home() {
  const [weatherData, setweatherData] = useState<WeatherData | null>(null);
  const [todayForecast, setTodayForecast] = useState<WeatherDetail | null>(
    null
  );
  const [isLoading, setisLoading] = useState(false);
  const [place, setPlace] = useState("berlin");
  const baseUrl = "https://api.openweathermap.org/data/2.5/";
  const API_KEY = "13e936f37776c8974193a683f099f69f";
  const url = `${baseUrl}forecast?q=${place}&appid=${API_KEY}&cnt=50`;

  async function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (place.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${place}&appid=${API_KEY}`
        );
        setweatherData(response.data);
        setTodayForecast(response.data.list[0]);
      } catch (error) {
        console.log(error);
      }
    }
    setPlace(place);
  }

  async function handleInputChang(value: string) {
    setPlace(value);
  }

  const getWeatherData = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(url);
      setweatherData(response.data);
      setTodayForecast(response.data.list[0]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return weatherData?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading Weather Data...</p>
      </div>
    );
  return (
    <>
      {/* <Navbar /> */}
      <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
          <span className="flex items-center justify-center gap-2  ">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny />
          </span>
          <section className="flex gap-2 items-center">
            <MdOutlineLocationOn />
            <p className="text-slate-900/80 text-sm"> {place} </p>
            {/* SearchBox */}

            <SearchBox
              value={place}
              onSubmit={handleSubmiSearch}
              onChange={(e) => handleInputChang(e.target.value)}
            />
          </section>
        </div>
      </nav>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4 ">
        <section className="space-y-4 ">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              <p className="text-xl">
                {todayForecast ? formatDate(todayForecast.dt_txt) : ""}
              </p>
            </h2>
          </div>
        </section>

        {/* =========  Today Forecast Data ========= */}

        <WeatherContainer>
          <div className=" flex flex-col px-4 ">
            <span className="text-5xl">
              {convertKelvinToCelsius(todayForecast?.main.temp ?? 296.37)}°
            </span>
            <p className="text-xs space-x-1 whitespace-nowrap">
              <span> Feels like</span>
              <span>
                {convertKelvinToCelsius(todayForecast?.main.feels_like ?? 0)}°
              </span>
            </p>
            <p className="text-xs space-x-2">
              <span>
                {convertKelvinToCelsius(todayForecast?.main.temp_min ?? 0)}
                °↓
              </span>
              <span>
                {convertKelvinToCelsius(todayForecast?.main.temp_max ?? 0)}
                °↑
              </span>
            </p>
          </div>

          {/* Right side of the forecast */}
          <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
            {weatherData?.list.map((d, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
              >
                <p className="whitespace-nowrap">{getTime(d.dt_txt)}</p>
                <WeatherIcon icon_name={d.weather[0].icon} />
                <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
              </div>
            ))}
          </div>
        </WeatherContainer>

        <WeatherContainer>
          <p className="capitalize text-center">
            {todayForecast?.weather[0].description}{" "}
          </p>
          <WeatherDetailsContainer
            visability={metersToKilometers(todayForecast?.visibility ?? 10000)}
            airPressure={`${todayForecast?.main.pressure} hPa`}
            humidity={`${todayForecast?.main.humidity}%`}
            sunrise={getTime(weatherData?.city?.sunrise ?? "1702949452")}
            sunset={getTime(weatherData?.city?.sunset ?? "1702517657")}
            windSpeed={convertWindSpeed(todayForecast?.wind.speed ?? 1.64)}
          />
        </WeatherContainer>

        {/* =========  Next Five Days Forecast Data ========= */}

        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forcast (Next 5 days)</p>
        </section>
        {firstDataForEachDate.map((d, i) => (
          <ForecastWeatherDetail
            key={i}
            description={d?.weather[0].description ?? ""}
            weatehrIcon={d?.weather[0].icon ?? "01d"}
            date={d ? getTime(d.dt_txt?.toString()) : ""}
            day={d ? getTime(d.dt_txt?.toString()) : ""}
            feels_like={d?.main.feels_like ?? 0}
            temp={d?.main.temp ?? 0}
            temp_max={d?.main.temp_max ?? 0}
            temp_min={d?.main.temp_min ?? 0}
            airPressure={`${d?.main.pressure} hPa `}
            humidity={`${d?.main.humidity}% `}
            sunrise={getTime(weatherData?.city?.sunrise ?? "1702517657")}
            sunset={getTime(weatherData?.city?.sunset ?? "1702517657")}
            visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
            windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
          />
        ))}
      </main>
    </>
  );
}
