import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

import CustomButton from '../../components/customButton/customButton';
import { Dropdown } from 'react-native-element-dropdown';

const GoalTimeScreen = () => {
    const handleActivity = (active) => {
        alert(`You pressed your activity: ${active}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>
                Tell us about yourself!
            </Text>
            <View style={styles.styleContainer}>
                <Progress.Bar
                    progress={0.66}
                    width={250}
                    color="#203C3B"
                    borderRadius={10}
                    borderWidth={2}
                    unfilledColor="#D3D3D3"
                    style={styles.progressBar}
                />
                <Text style={styles.textStyle}>
                    How do you want the calorie trail to be?
                </Text>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Pleasant"
                        onPress={() => handleActivity('Pleasant')}
                        style={styles.buttonStyle}
                    />
                    <CustomButton
                        text="Maintainable"
                        onPress={() => handleActivity('Weight Recomposition')}
                        style={styles.buttonStyle}
                    />
                    <CustomButton
                        text="Aggresive"
                        onPress={() => handleActivity('Aggresive')}
                        style={styles.buttonStyle}
                    />

                    <Text style={styles.basementText}>
                        The options show the level of caloric deficit/add to reach your goal!
                    </Text>

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
        marginBottom: 60,
    },
    textStyle: {
        color: '#203C3B',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:50,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        marginTop: 80,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },

    headerStyle: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },

    buttonStyle: {
        width: '80%'
    },

    basementText: {
        color: '#203C3B',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default GoalTimeScreen;
