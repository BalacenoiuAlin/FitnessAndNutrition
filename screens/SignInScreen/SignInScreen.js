import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/customButton';
import { useAuth } from '../../context/AuthContext';
import { IP, PORT } from '@env';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigation = useNavigation();

    const onSignInPressed = async () => {
        try {
            const response = await fetch('http://IP:PORT/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const text = await response.text();

            if (response.ok) {
                const json = JSON.parse(text);
                console.log('Login successful', json);
                login(); 
                navigation.navigate('NavigationBar'); 
            } else {
                console.log('Login failed', text);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Enter your credentials to Sign In</Text>
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
                secureTextEntry={false}
                style={styles.customInputStyle}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
                style={styles.customInputStyle}
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
                text="Don’t have an account? Create one!"
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
        marginTop: 80,
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 15,
        color: '#1C1C1C',
        marginBottom: 50,
    },

    customInputStyle: {
        marginVertical: 20,
    },

    customButtonPasswordStyle: {
        top: -20,
        color: '#203C3B',
    },

    customButtonSignUp: {
        marginTop: 260,
        width: '60%',
    }
});

export default SignInScreen;
