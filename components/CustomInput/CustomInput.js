import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, style }) => {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={styles.input}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,

        paddingHorizontal: 10,
        
        marginTop: 10,
        marginVertical: 15,
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        height: '100%',
        paddingVertical: 5,
    },
});

export default CustomInput;
