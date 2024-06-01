import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons

const GenderButton = ({ onPress, text, style, type, iconName }) => {
    return (
        <Pressable style={[styles.container, styles[`container_${type}`], style]} onPress={onPress}>
            {/* Using Icon with text in a row layout inside the button */}
            <Icon name={iconName} size={20} color="white" style={styles.icon} />
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Items are laid out in a row
        justifyContent: 'center', // Center items horizontally
        alignItems: 'center', // Center items vertically
        backgroundColor: '#203C3B',
        width: '70%',
        padding: 15,
        marginVertical: 10,
        borderRadius: 20,
    },
    container_male: {
        backgroundColor: '#1E90FF', // Example color for male
    },
    container_female: {
        backgroundColor: '#FF69B4', // Example color for female
    },
    container_other: {
        backgroundColor: '#778899', // Example color for other
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10, // Spacing between the icon and the text
    },
    icon: {
        // Additional styling can be applied if needed
    },
});

export default GenderButton;
