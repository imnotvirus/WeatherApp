export interface ForecastItemProps {
	data: information;
}
interface information {
	dt: number;
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
