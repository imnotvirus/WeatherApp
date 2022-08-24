import { List } from "../../@types/ForecastInformation";

export interface ForecastItemProps {
  data: information;
}
interface information {
  dt_txt: string;
  weather: weather[];
  main: main;
}
interface weather {
  icon: string;
}
interface main {
  temp: number;
}
