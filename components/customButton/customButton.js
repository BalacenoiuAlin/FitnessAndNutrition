    import React from 'react';
    import { View, Text, StyleSheet, Pressable } from 'react-native'; 

    const CustomButton = ({ onPress, text, type = 'PRIMARY', style }) => {
        return (
            <Pressable style={[styles.container, styles[`container_${type}`], style]} onPress={onPress}>
                <Text style={[styles.text, styles[`text_${type}`]]}>
                    {text}
                </Text>
            </Pressable>
        );
    }
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#203C3B',

            width: '70%',

            padding: 15,
            marginVertical: 10,

            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 20,
        },

        container_PRIMARY: {
            backgroundColor: '#203C3B',
        },

        container_TERTIARY: {
            backgroundColor: 'transparent',
        },

        text: {

            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
        },

        text_TERTIARY: {
            color: 'grey',
        },
    });

    export default CustomButton;
