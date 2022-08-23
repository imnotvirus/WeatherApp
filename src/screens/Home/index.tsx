import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { format, getHours } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { API_KEY, UNSPLASH_KEY } from "react-native-dotenv";
import { RFValue } from "react-native-responsive-fontsize";
import { IForecast } from "../../@types/ForecastInformation";
import { IWeatherInformation } from "../../@types/WeatherInformation";
import NightBG from "../../assets/nightBG.png";
import Footer from "../../components/Footer";
import ForecastItem from "../../components/ForecastItem";
import Header from "../../components/Header";

const Home: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [weatherInformation, setWeatherInformation] =
    useState<IWeatherInformation>(null);
  const [forecastInformation, setForecastInformation] =
    useState<IForecast>(null);
  const [timestamp, setTimestamp] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>(null);

  const getWeatherInformation = useCallback(async () => {
    if (location) {
      setLoading(true);
      try {
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const [{ data: DataWeather }, { data: DataForecast }] =
          await Promise.all([axios.get(urlWeather), axios.get(urlForecast)]);
        setLoading(false);
        return [DataWeather, DataForecast];
      } catch (error) {
        setLoading(false);
        console.log("error get weather information: ", error);
      }
    }
  }, [location]);

  const updateLocation = async () => {
    const data = await Location.getCurrentPositionAsync({});
    setLocation(data);
    return data;
  };
  const getBackgroundImage = useCallback(async () => {
    try {
      const hours = getHours(timestamp);
      const query =
        hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
      const url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}&orientation=portrait&query=${query}`;
      const { data } = await axios.get(url);
      setBackgroundImage(data.urls.full);
    } catch (error) {
      console.log("Error get background image: ", error);
    }
  }, [timestamp]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let data = await updateLocation();
      setLocation(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (location) {
        const data = await getWeatherInformation();
        setTimestamp(new Date());
        setWeatherInformation(data[0]);
        setForecastInformation(data[1]);
      }
    })();
  }, [location]);

  useEffect(() => {
    getBackgroundImage();
  }, [timestamp]);

  if (!location || !weatherInformation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2d2941" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          backgroundImage
            ? {
                uri: backgroundImage,
              }
            : NightBG
        }
        resizeMode="cover"
        style={styles.imageBG}
      />
      <Header
        data={weatherInformation}
        Loading={Loading}
        updateData={updateLocation}
        timestamp={timestamp.getTime()}
      />
      {forecastInformation && <Footer data={forecastInformation} />}
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageBG: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: "100%",
  },
});
export default Home;
