import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const carbIntake = 100;
const carbGoal = 300;

const proteinIntake = 100;
const proteinGoal = 300;

const fatIntake = 100;
const fatGoal = 300;

const ProgressBar = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    return (
        <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressPercentage}></Text>
        </View>
    );
};

const ProgressBarCalorie = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    return (
        <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarCalorieContainer}>
                <View style={[styles.progressBarCalorie, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressPercentage}></Text>
        </View>
    );
};

const FoodComponent = ({ name, kcals }) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="food-variant" size={40} color="#203C3B" />
                </View>
                    <Text style={styles.infoStyle}> name</Text>
                    <Text style={styles.infoStyle}> kcal</Text>
            </View>
            <View style={styles.macroContainer}>
                <View style={styles.macroItem}>
                    <Text style={styles.macroText}>Protein</Text>
                    <ProgressBar value={proteinIntake} maxValue={proteinGoal} />
                    <Text style={styles.macroValue}>{proteinIntake} g</Text>
                </View>
                <View style={styles.macroItem}>
                    <Text style={styles.macroText}>Carbs</Text>
                    <ProgressBar value={carbIntake} maxValue={carbGoal} />
                    <Text style={styles.macroValue}>{carbIntake} g</Text>
                </View>
                <View style={styles.macroItem}>
                    <Text style={styles.macroText}>Fat</Text>
                    <ProgressBar value={fatIntake} maxValue={fatGoal} />
                    <Text style={styles.macroValue}>{fatIntake} g</Text>
                </View>
            </View>
        </View>
    );
};

FoodComponent.propTypes = {
    name: PropTypes.string.isRequired,
    kcals: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderColor: '#203C3B',
        width: '95%',
        flexDirection: 'column',
        marginTop: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        borderWidth: 0.1,
        shadowColor: '#203C3B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    infoStyle: {
        fontSize: 12,
        color: '#203C3B',
        textAlign: 'center',
        marginTop: 17,
        marginRight: 2,
    },
    macroContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    progressBarContainer: {
        width: '150%',
        height: 5,
        borderRadius: 10,
        backgroundColor: '#efe5e5',
        marginVertical: 5,
        left: -10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#203C3B',
        borderRadius: 10,
    },
    progressPercentage: {
        marginLeft: 10,
        fontSize: 14,
        color: '#203C3B',
    },
    macroValue: {
        fontSize: 12,
        color: '#203C3B',
        textAlign: 'center',
        bottom: 15,
    },
    macroText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#203C3B',
    },
});

export default FoodComponent;
