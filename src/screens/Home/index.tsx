import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { format, getHours } from "date-fns";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { API_KEY, UNSPLASH_KEY } from "react-native-dotenv";
import { RFValue } from "react-native-responsive-fontsize";
import NightBG from "../../assets/nightBG.png";
import { IWeatherInformation } from "./types";

const Home: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [weatherInformation, setWeatherInformation] =
    useState<IWeatherInformation>(null);
  const [timestamp, setTimestamp] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>(null);

  const getWeatherInformation = useCallback(async () => {
    if (location) {
      setLoading(true);
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const { data } = await axios.get(url);
        console.log("data => ", data);
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        console.log("error get weather information: ", error);
      }
    }
  }, [location]);

  const updateLocation = async () => {
    const data = await Location.getCurrentPositionAsync({});
    setLocation(data);
    console.log(data);
    return data;
  };
  const getBackgroundImage = useCallback(async () => {
    try {
      const hours = getHours(timestamp);
      const query =
        hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
      const url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}&orientation=portrait&query=${query}`;
      const { data } = await axios.get(url);
      console.log(data.urls.full);
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
        setWeatherInformation(data);
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
        style={[
          {
            position: "absolute",
            width: Dimensions.get("window").width,
            height: "100%",
          },
        ]}
      />
      <View style={styles.header}>
        <View style={styles.headerName}>
          <Ionicons name="location-sharp" size={41} color="white" />
          <Text style={styles.title}>{weatherInformation.name}</Text>
        </View>
        <Text style={styles.temp}>
          {weatherInformation.main.temp.toFixed()}°
        </Text>
        <View style={styles.information}>
          {weatherInformation.weather.map((item) => (
            <View key={item.id} style={styles.descriptionContainer}>
              <Image
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
              Max: {weatherInformation.main.temp_max.toFixed()}°
            </Text>
            <Text style={styles.textVariant}>
              Min: {weatherInformation.main.temp_min.toFixed()}°
            </Text>
          </View>
          <TouchableOpacity
            disabled={Loading}
            onPress={updateLocation}
            style={styles.reload}
          >
            {Loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Text style={styles.reloadText}>{format(timestamp, "p")}</Text>
                <Ionicons name="reload" size={24} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "#4a4e90",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: RFValue(98),
  },
  headerName: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(41),
    color: "#fff",
  },
  temp: {
    fontSize: RFValue(96),
    color: "#fff",
  },
  reload: {
    flexDirection: "row",
    alignItems: "center",
  },
  reloadText: {
    fontSize: RFValue(16),
    color: "#fff",
    marginRight: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: RFValue(20),
    color: "#ffffff80",
  },
  descriptionImage: {
    width: 30,
    height: 30,
  },
  variantTemp: {
    flexDirection: "row",
  },
  textVariant: {
    fontSize: RFValue(20),
    color: "#ffffff",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  information: {
    alignItems: "center",
  },
});
export default Home;
