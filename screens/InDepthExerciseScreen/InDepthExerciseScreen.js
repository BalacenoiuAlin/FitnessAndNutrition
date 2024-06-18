import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';

const InDepthExerciseScreen = ({ route }) => {
    const { exercise } = route.params;
    const [detailedExercise, setDetailedExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${exercise.id}`, {
            method: 'GET',
            headers: {
                //'x-rapidapi-key': '394b133098mshc80e29dadfe2e78p1df839jsn843be704bee8',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(data => {
                setDetailedExercise(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [exercise.id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#203C3B" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    const handleOnPress = () => {
        navigation.navigate('Exercise');
      };

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.title}>{detailedExercise.name}</Text>
                <Image source={{ uri: detailedExercise.gifUrl }} style={styles.image} />
                <View style={styles.rowContainer}>
                    <Text style={styles.detail}>Body Part: {detailedExercise.bodyPart}</Text>
                    <Text style={styles.detail}>Target: {detailedExercise.target}</Text>
                    <Text style={styles.detail}>Equipment: {detailedExercise.equipment}</Text>
                </View>
            </View>
                <Text style={styles.instructionsTitle}>Instructions:</Text>
                <View style={styles.bottomContainer}>
                {detailedExercise.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instruction}>{instruction}</Text>
                ))}
            </View>
            <CustomButton 
            text='Go back'
            type='Primary'
            onPress={handleOnPress}
            style={styles.buttonStyle}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
    },
    rowContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        width: '91%',
        height: '7%',

    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upperContainer: {
        flex: 0.65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#203C3B',
        width: '100%',
        shadowColor: '#203C3B',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    bottomContainer: {
        flex: 0.35,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: '80%',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        marginTop: 30,
    },
    detail: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontWeight: '500',
        marginHorizontal: 5,
        marginLeft: 15,
        color: '#203C3B',
    },
    image: {
        width: '90%',
        height: '55%',
        marginVertical: 30,
        borderRadius: 20,
    },
    instructionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 30,
        color: '#203C3B',
    },
    instruction: {
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 3,
        marginVertical: 2,
        color:'#203C3B',

    },
    buttonStyle:{
        width: '60%',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
});

export default InDepthExerciseScreen;
