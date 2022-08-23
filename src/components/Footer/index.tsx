import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { IForecast } from "../../@types/ForecastInformation";
import ForecastItem from "../ForecastItem";

interface FooterProps {
  data: IForecast;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsões da semana</Text>
      <FlatList
        data={data.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{
          height: RFValue(156),
          alignItems: "flex-end",
          marginTop: 50,
        }}
        keyExtractor={(item) => String(item.dt)}
        renderItem={({ item }) => <ForecastItem data={item} />}
      />
      <Text style={styles.sign}>created by: Luiz Claudio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    backgroundColor: "#00000090",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
  sign: { color: "#fff", fontSize: 16 },
});

export default Footer;
