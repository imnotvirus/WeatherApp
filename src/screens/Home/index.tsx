import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import * as Location from "expo-location";
import { API_KEY } from "react-native-dotenv";
const Home: React.FC = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>{text}</Text> */}
      <Text>{API_KEY}</Text>
    </View>
  );
};

export default Home;
