import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const GenderButton = ({ onPress, text, iconName, iconSize = 30, iconColor = 'black', style, selected }) => {
    return (
        <Pressable style={[styles.container, selected && styles.selectedContainer, style]} onPress={onPress}>
            <Ionicons 
            name={iconName} 
            size={iconSize} 
            color={selected ? 'white' : iconColor} 
            style={styles.icon} 
            />

            <Text style={[styles.text, selected && styles.selectedText]}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#203C3B',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderRadius: 20,
    },
    selectedContainer: {
        backgroundColor: '#001211',
    },
    text: {
        color: '#fff',
        size: 10,
        marginTop: 5,
    },
    selectedText: {
        color: 'white',
    },
    icon: {
        marginBottom: 5,
    },
});

export default GenderButton;
