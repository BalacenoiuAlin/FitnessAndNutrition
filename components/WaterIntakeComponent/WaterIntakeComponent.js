import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WaterIntakeComponent = () => {
    const [currentIntake, setCurrentIntake] = useState(0);
    const goalIntake = 3; 

    const handleAddWater = () => {
        setCurrentIntake((prevIntake) => Math.min(prevIntake + 0.25, goalIntake));
    };

    const handleRemoveWater = () => {
        setCurrentIntake((prevIntake) => Math.max(prevIntake - 0.25, 0));
    };

    const glasses = Math.ceil((currentIntake / goalIntake) * 12); 
    const emptyGlasses = 12 - glasses;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="water" size={40} color="#203C3B" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Water Intake</Text>
                    <Text style={styles.subtitle}>{`${currentIntake.toFixed(2)} / ${goalIntake} litres`}</Text>
                </View>
                <TouchableOpacity style={styles.addButtonContainer} onPress={handleRemoveWater}>
                    <MaterialCommunityIcons name="minus-circle" size={35} color="#203C3B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddWater}>
                    <MaterialCommunityIcons name="plus-circle" size={35} color="#203C3B" />
                </TouchableOpacity>
            </View>
            <View style={styles.glassesContainer}>
                {[...Array(glasses)].map((_, index) => (
                    <MaterialCommunityIcons key={index} name="water" size={30} color="#203C3B" style={styles.glass} />
                ))}
                {[...Array(emptyGlasses)].map((_, index) => (
                    <MaterialCommunityIcons key={index + glasses} name="water" size={30} color="#E0E0E0" style={styles.glass} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#203C3B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '95%',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#203C3B',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
    },
    addButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    glassesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    glass: {
        marginHorizontal: 5,
    },
});

export default WaterIntakeComponent;
