import React from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Logo from '../../assets/images/Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/customButton';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPressed = () => {
        alert(`You pressed sign in`);
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    }

    const onSignUpPressed = () => {
        console.warn("onSignUpPressed");
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Enter your credential to Sign In</Text>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
                secureTextEntry={false}
                style={styles.customInputUsernameStyle}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
                style={styles.customInputPasswordStyle}
            />
            <CustomButton
                text="Sign In"
                onPress={onSignInPressed}
                type='PRIMARY'
            />

            <CustomButton
                text="Forgot password?"
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
                style={styles.customButtonPasswordStyle}
            />

            <CustomButton
                text="Don`t have an account?  Create one!"
                onPress={onSignUpPressed}
                type="TERTIARY"
                style={styles.customButtonSignUp}
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

    customButtonPasswordStyle: {
        marginTop: 50,
        color: '#203C3B',
    },

    customButtonSignUp:{
        marginTop: 100,
        width: '60%',
    }
});

export default SignInScreen;
