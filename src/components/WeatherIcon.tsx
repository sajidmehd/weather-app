import React from "react";
import Image from "next/image";

type Props = {};

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { icon_name: string }
) {
  return (
    <div title={props.icon_name} {...props} className="relative h-20 w-20">
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.icon_name}@4x.png`}
      />
    </div>
  );
}
