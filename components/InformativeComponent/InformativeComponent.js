import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import InformativeContent from "../../contents/InformativeContent";
import CustomButton from "../customButton/customButton";

const InformativeItem = ({ item, onBackPress }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.titleStlye}>{item.title}</Text>
    <View style={styles.bodyContainer}>
      <Image source={item.imageUrl} style={styles.imageStyle} />
      <Text style={styles.descriptionStyle}>{item.description}</Text>
      <Text style={styles.dateStyle}>{item.date}</Text>
      <CustomButton
        text="Go back"
        type="PRIMARY"
        onPress={onBackPress}
        style={styles.styleButton}
      />
    </View>
  </View>
);

const InformativeComponent = () => {
  const [backButtonPressed, setBackButtonPressed] = useState(false);

  const handleBackPress = () => {
    setBackButtonPressed(true);
    Alert.alert('Back button pressed');
  };

  return (
    <FlatList
      data={InformativeContent}
      renderItem={({ item }) => (
        <InformativeItem
          item={item}
          onBackPress={handleBackPress}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#203C3B',
    alignItems: 'center',
  },
  bottomContainer: {
    backgroundColor: '#203C3B',
    alignItems: 'center',
  },
  titleStlye: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  imageStyle: {
    marginVertical: 10,
    width: 400,
    height: 200,
    alignContent: 'center',
    borderRadius: 20,
  },
  descriptionStyle: {
    color: '#203C3B',
    fontWeight: '500',
    marginHorizontal: 10,
    textAlign: 'left',
    fontSize: 12,
  },
  dateStyle: {
    color: '#203C3B',
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 30,
    textAlign: 'right',
    marginHorizontal: 10,
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  styleButton: {
    color: '#FFFFFF',
    backgroundColor: '#203C3B',
    width: 150,
  },
});

export default InformativeComponent;
