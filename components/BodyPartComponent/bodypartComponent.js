import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Chest from '../../assets/images/chest.webp';
import Shoulders from '../../assets/images/shoulders.webp';
import Upperarm from '../../assets/images/upperarms.webp';
import Back from '../../assets/images/back.webp';
import Lowerarm from '../../assets/images/lowerarm.webp';
import Lowerlegs from '../../assets/images/lowerlegs.webp';
import Upperlegs from '../../assets/images/upperlegs.webp';
import Neck from '../../assets/images/neck.webp';
import Cardio from '../../assets/images/cardio.webp';
import Waist from '../../assets/images/waist.webp'
import CustomButton from '../customButton/customButton';
import { fetchBodyPartList } from '../../services/apiExerciseServices';

const BodyPartComponent = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const bodyPartImages = {
    'chest': Chest,
    'shoulders': Shoulders,
    'upper arms': Upperarm,
    'back': Back,
    'lower arms': Lowerarm,
    'lower legs': Lowerlegs,
    'upper legs': Upperlegs,
    'neck': Neck,
    'cardio': Cardio,
    'waist': Waist,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBodyPartList();
        setBodyParts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOnPress = () => {
    navigation.navigate('Fitness');
  };

  const handleImagePress = (bodyPart) => {
    navigation.navigate('ExerciseInfo', { bodyPart });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#203C3B" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <View style={styles.carouselItem}>
        <Image
          source={bodyPartImages[item.toLowerCase()] || Cardio}
          style={styles.image}
        />
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerStyle}>Discover Exercises by Body Part!</Text>
        <Text style={styles.infoStyle}> Swipe left or right to see more body parts</Text>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={bodyParts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />
        <CustomButton 
          text='Go back'
          type='PRIMARY'
          onPress={handleOnPress}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203C3B',
    flexDirection: 'column',
  },
  topContainer: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 50,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  carousel: {
    paddingLeft: 10,
  },
  carouselItem: {
    backgroundColor: '#FFFFFF',
    height: height * 0.43,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemText: {
    color: '#FFFFFF',
    backgroundColor: '#203C3B',
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonStyle: {
    width: '60%',
    marginVertical: 20,
  },
  infoStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '400',
  }
});

export default BodyPartComponent;