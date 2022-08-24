import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export interface HeaderProps {
	data: Information;
	updateData: () => void;
	Loading: boolean;
	timestamp: number;
}

interface Information {
	name: string;
	main: Main;
	weather: weather[];
}
interface Main {
	temp: number;
	temp_max: number;
	temp_min: number;
}
interface weather {
	id: number;
	icon: string;
	description: string;
}
const Header: React.FC<HeaderProps> = ({
	data,
	updateData,
	Loading,
	timestamp,
}) => {
	return (
		<View style={styles.header}>
			<View style={styles.headerName}>
				<Ionicons name="location-sharp" size={41} color="white" />
				<Text style={styles.title}>{data.name}</Text>
			</View>
			<Text style={styles.temp}>{data.main.temp.toFixed()}°</Text>
			<View style={styles.information}>
				{data.weather.map((item) => (
					<View key={item.id} style={styles.descriptionContainer}>
						<Image
							testID="icon"
							source={{
								uri: `https://openweathermap.org/img/wn/${item.icon}.png`,
							}}
							style={styles.descriptionImage}
						/>
						<Text style={styles.descriptionText}>{item.description}</Text>
					</View>
				))}
				<View style={styles.variantTemp}>
					<Text style={styles.textVariant}>
						Max: {data.main.temp_max.toFixed()}°
					</Text>
					<Text style={styles.textVariant}>
						Min: {data.main.temp_min.toFixed()}°
					</Text>
				</View>
				<TouchableOpacity
					disabled={Loading}
					onPress={updateData}
					style={styles.reload}
					testID="button"
				>
					{Loading ? (
						<ActivityIndicator size="large" />
					) : (
						<>
							<Text style={styles.reloadText}>{format(timestamp, 'p')}</Text>
							<Ionicons name="reload" size={24} color="white" />
						</>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	header: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: RFValue(98),
		backgroundColor: '#00000080',
		borderRadius: 8,
	},
	headerName: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		fontSize: RFValue(41),
		color: '#fff',
	},
	temp: {
		fontSize: RFValue(96),
		color: '#fff',
	},
	reload: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	reloadText: {
		fontSize: RFValue(16),
		color: '#fff',
		marginRight: 10,
	},
	descriptionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	descriptionText: {
		fontSize: RFValue(20),
		color: '#ffffff80',
	},
	descriptionImage: {
		width: 30,
		height: 30,
	},
	variantTemp: {
		flexDirection: 'row',
	},
	textVariant: {
		fontSize: RFValue(20),
		color: '#ffffff',
		marginHorizontal: 10,
		marginVertical: 15,
	},
	information: {
		alignItems: 'center',
	},
});

export default Header;
