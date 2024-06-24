import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import CustomButton from '../../components/customButton/customButton';
import WeightSelectorComponent from '../../components/weightSelectorComponent/WeightSelectorComponent';

const WeightSelectorActualScreen = () => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('WeightSelector');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>
                Tell us about yourself!
            </Text>
            <View style={styles.styleContainer}>
                <Progress.Bar
                    progress={0.3}
                    width={250}
                    color="#203C3B"
                    borderRadius={10}
                    borderWidth={2}
                    unfilledColor="#D3D3D3"
                    style={styles.progressBar}
                />
                <Text style={styles.textStyle}>
                    What is your actual weight?
                </Text>

                <WeightSelectorComponent />

                <Text style={styles.basementText}>
                        Press on the value to lock it in!
                </Text>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Continue"
                        onPress={onPress}
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
        marginBottom: 60,
    },
    textStyle: {
        color: '#203C3B',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
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

    basementText: {
        color: '#203C3B',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default WeightSelectorActualScreen;
