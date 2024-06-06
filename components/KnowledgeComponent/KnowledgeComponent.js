import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import EducativeContent from "../../contents/EducativeContent";

const EducativeItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.rowContainer}>
      <Image source={item.imageUrl} style={styles.imageStyle} />
      <View style={styles.columnContainer}>
        <Text style={styles.titleStyle}>{item.title}</Text>
        <Text style={styles.descriptionStyle}>{item.description}</Text>
        <Text style={styles.dateStyle}>{item.date}</Text>
      </View>
    </View>
  </View>
);

const KnowledgeComponent = () => (
  <FlatList
    data={EducativeContent}
    renderItem={({ item }) => <EducativeItem item={item} />}
    keyExtractor={(item) => item.id.toString()}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#203C3B",
    marginVertical: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    height: 100,
    width: 380,
    marginLeft: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    marginHorizontal: 10,
  },
  columnContainer: {
    flexDirection: "column",
    marginVertical: 5,
    width: 300,
    marginRight: 20,
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
    textAlign: "left",
  },
  descriptionStyle: {
    color: "white",
    fontSize: 12,
    fontWeight: "normal",
    marginVertical: 5,
    textAlign: 'left',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 59,
  },
  dateStyle: {
    fontSize: 10,
    color: "white",
    fontWeight: "normal",
    textAlign: 'justify',
  },
});

export default KnowledgeComponent;
