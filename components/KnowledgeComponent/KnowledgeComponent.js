import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import EducativeContent from "../../contents/EducativeContent";

const EducativeItem = ({ item, index, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.touchable}>
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
  </TouchableOpacity>
);

const KnowledgeComponent = ({ navigation }) => {
  const handlePress = (index) => {
    navigation.navigate('Informative', { index });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Educative Content</Text>
      <Text style={styles.headerDescription}>Explore various educational materials to enhance your knowledge.</Text>
    </View>
  );

  return (
    <FlatList
      data={EducativeContent}
      renderItem={({ item, index }) => (
        <EducativeItem
          item={item}
          index={index}
          onPress={() => handlePress(index)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 10,
  },
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
  headerContainer: {
    backgroundColor: "#203C3B",
    padding: 20,
    marginTop: 60,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  headerDescription: {
    fontSize: 14,
    color: "white",
    fontWeight: "normal",
  },
});

export default KnowledgeComponent;
