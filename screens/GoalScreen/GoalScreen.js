import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/customButton';
import * as Progress from 'react-native-progress';

const GoalScreen = () => {
    const navigation = useNavigation();

    const handleWeight = (goal) => {
        alert(`You pressed your goal: ${goal}`);
        navigation.navigate('GoalTime');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>
                Tell us about yourself!
            </Text>
            <View style={styles.styleContainer}>
                <Progress.Bar
                    progress={0.0}
                    width={250}
                    color="#203C3B"
                    borderRadius={10}
                    borderWidth={2}
                    unfilledColor="#D3D3D3"
                    style={styles.progressBar}
                />
                <Text style={styles.textStyle}>
                    What is your goal?
                </Text>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Lose Weight"
                        onPress={() => handleWeight('Lose Weight')}
                        style={styles.buttonStyle}
                    />
                    <CustomButton
                        text="Weight Recomposition"
                        onPress={() => handleWeight('Weight Recomposition')}
                        style={styles.buttonStyle}
                    />
                    <CustomButton
                        text="Maintain Weight"
                        onPress={() => handleWeight('Maintain Weight')}
                        style={styles.buttonStyle}
                    />
                    <CustomButton
                        text="Gain Weight"
                        onPress={() => handleWeight('Gain Weight')}
                        style={styles.buttonStyle}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#203C3B',
    },
    styleContainer: {
        width: '80%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 50,
    },
    textStyle: {
        color: '#203C3B',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        marginTop: 60,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
    },

    headerStyle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },

    buttonStyle: {
        width: '80%'
    }
});

export default GoalScreen;
