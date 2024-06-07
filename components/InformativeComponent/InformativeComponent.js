import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InformativeContent from '../../contents/InformativeContent';
import CustomButton from '../customButton/customButton';

const InformativeComponent = ({ route }) => {
  const { index } = route.params;
  const item = InformativeContent[index];
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.titleStyle}>{item.title}</Text>
      <View style={styles.bodyContainer}>
        <Image source={item.imageUrl} style={styles.imageStyle} />
        <Text style={styles.descriptionStyle}>{item.description}</Text>
        <Text style={styles.dateStyle}>{item.date}</Text>
        <CustomButton
          text="Go back"
          type="PRIMARY"
          onPress={handleBackPress}
          style={styles.styleButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#203C3B',
    paddingVertical: 20,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 10,
  },
  titleStyle: {
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
    marginTop: 20,
  },
});

export default InformativeComponent;
