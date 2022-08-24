import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ForecastItemProps } from './types';

const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
	const dateTime = data.dt_txt;
	const [date] = dateTime.split(' ');
	return (
		<View style={styles.container}>
			<View style={styles.containerDate}>
				<Text style={styles.time}>
					{format(parseISO(data.dt_txt), 'eee', { locale: ptBR })}
				</Text>
				<Text style={styles.time}>
					{format(new Date(date + 'T10:30:00-03:00'), 'dd', { locale: ptBR })}
				</Text>
				<Text style={styles.time}>
					{format(parseISO(data.dt_txt), 'hh a', { locale: ptBR })}
				</Text>
			</View>
			<Image
				source={{
					uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
				}}
				style={styles.image}
			/>
			<Text style={styles.temp}>{data.main.temp.toFixed()}°</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		width: RFValue(70),
		height: RFValue(156),
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#00000075',
		marginHorizontal: 10,
		elevation: 10,
		paddingVertical: 10,
	},
	containerDate: {
		alignItems: 'center',
	},
	time: {
		color: '#fff',
	},
	image: {
		width: 40,
		height: 40,
	},
	temp: {
		color: '#fff',
	},
});
export default ForecastItem;
