import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/customButton/customButton';
import * as Progress from 'react-native-progress';

const ActivityScreen = () => {
    const handleActivity = (activity) => {
        alert(`You pressed your activity: ${activity}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>
            Tell us about yourself!
            </Text>
            <View style={styles.styleContainer}>
                <Progress.Bar
                    progress={1}
                    width={250}
                    color="#203C3B"
                    borderRadius={10}
                    borderWidth={2}
                    unfilledColor="#D3D3D3"
                    style={styles.progressBar}
                />
                <Text style={styles.textStyle}>
                    Weekly level of activity!
                </Text>
                    <CustomButton
                        text="Sedentary"
                        onPress={() => handleWeight('Sedentary')}
                        style={styles.buttonStyle}
                    />
                    <Text style={styles.textDescription}>
                        No training per week and under 3000 steps a day.
                    </Text>
                    <CustomButton
                        text="Light Activity"
                        onPress={() => handleWeight('Light Activity')}
                        style={styles.buttonStyle}
                    />
                    <Text style={styles.textDescription}>
                        Two trainins per week and under 5000 steps a day.
                    </Text>
                    <CustomButton
                        text="Moderate Activity"
                        onPress={() => handleWeight('Moderate Activity')}
                        style={styles.buttonStyle}
                    />
                    <Text style={styles.textDescription}>
                        Three/Four trainings per week and under 7000 steps a day.
                    </Text>
                    <CustomButton
                        text="Hard Activity"
                        onPress={() => handleWeight('Hard Activity')}
                        style={styles.buttonStyle}
                    />
                    <Text style={styles.textDescription}>
                        More than four trainings per week and above 10000 steps a day.
                    </Text>
            </View>
            <Text style={styles.basementText}>
                If your activity level is not the same as here, select what you believe is close.
            </Text>
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
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20, 
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 10,
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
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },

    buttonStyle: {
        width: '80%'
    },

    textDescription: {
        color: '#203C3B',
        fontSize: 11,
        width: 200,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    basementText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 30,
    },
});

export default ActivityScreen;
