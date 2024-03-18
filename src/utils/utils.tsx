export function formatDate(input: number): string {
  const date: Date = new Date(input);

  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  const formattedDate: string = `${dayOfWeek} ${day
    .toString()
    .padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${year}`;

  return formattedDate;
}

export function getTime(dateTime: string): string {
  const date = new Date(dateTime);
  const formattedHour = (((date.getHours() + 11) % 12) + 1)
    .toString()
    .padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() < 12 ? "AM" : "PM";
  return `${formattedHour}:${minute} ${period}`;
}

export function convertKelvinToCelsius(tempInKelvin: number): number {
  const tempInCelsius = tempInKelvin - 273.15;
  return Math.floor(tempInCelsius);
}

export function metersToKilometers(visibilityInMeters: number): string {
  const visibilityInKilometers = visibilityInMeters / 1000;
  return `${visibilityInKilometers.toFixed(0)}km`; // Round to 0 decimal places and add 'km' unit
}
export function convertWindSpeed(speedInMetersPerSecond: number): string {
  const speedInKilometersPerHour = speedInMetersPerSecond * 3.6; // Conversion from m/s to km/h
  return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}
