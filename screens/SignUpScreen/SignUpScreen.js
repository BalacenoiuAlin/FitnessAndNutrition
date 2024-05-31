import React from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/customButton';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onSignUnPressed = () => {
        alert(`You pressed sign up`);
    }

    const onAlreadyHaveAccountPressed = () => {
        console.warn("onAlreadyHaveAccountPressed");
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create your account</Text>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
                secureTextEntry={false}
            />
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
                secureTextEntry={false}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomInput
                placeholder="ConfirmPassword"
                value={ConfirmPassword}
                setValue={setConfirmPassword}
                secureTextEntry={false}
            />
            <CustomButton
                text="Sign Up"
                onPress={onSignUnPressed}
                type='PRIMARY'
                style={styles.customButtonStyle}
            />

            <CustomButton
                text="Already have an account? Sign In here!"
                onPress={onAlreadyHaveAccountPressed}
                type="TERTIARY"
                style={styles.customButtonSignIn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f4f8f9',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: '70%',
        maxWidth: 500,
        maxHeight: 500,
    },
    buttonContainer: {
        marginTop: 10,
    },

    title: {
        marginTop: 40,
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 15,
        color: '#1C1C1C',
        marginBottom: 30,
    },

    customInputUsernameStyle: {
        marginTop: 70,
    },

    customInputPasswordStyle:{
        marginVertical: 40, 
    },

    customButtonStyle: {
        marginVertical: 40,
    },

    customButtonSignIn:{
        width: '90%',
        marginTop: 100,
    }
});

export default SignUpScreen;
