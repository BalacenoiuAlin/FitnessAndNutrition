import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/CustomInput';
import DatePickerComponent from '../../components/DatePickerComponent';
import GenderButton from '../../components/GenderButton';

const ProfileConfigurationScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const onDateChange = (dateString) => {
        setBirthDate(dateString);
        if (new Date(dateString).getFullYear() < 1900) {
            setError('Invalid date, please select a valid date.');
        } else {
            setError('');
        }
    }

    const onContinuePressed = async () => {
        try {
            const response = await fetch('http://192.168.1.4:8081/users/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials (cookies) in the request
                body: JSON.stringify({
                    firstName,
                    lastName,
                    gender: selectedGender,
                    birthDate,
                }),
            });

            const responseText = await response.text(); // Read the response as text

            try {
                const json = JSON.parse(responseText); // Try to parse the text as JSON

                if (response.ok) {
                    navigation.navigate('HeightSelector', {
                        firstName,
                        lastName,
                        selectedGender,
                        birthDate,
                    });
                } else {
                    console.log('Profile update failed', json);
                }
            } catch (error) {
                // Handle non-JSON response
                console.error('Failed to parse JSON response:', responseText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile Creation</Text>
            <CustomInput
                placeholder="First Name"
                value={firstName}
                setValue={setFirstName}
                secureTextEntry={false}
                style={styles.customInputStyle}
            />
            <CustomInput
                placeholder="Last Name"
                value={lastName}
                setValue={setLastName}
                secureTextEntry={false}
                style={styles.customInputStyle}
            />

            <View style={styles.genderContainer}>
                <GenderButton
                    onPress={() => setSelectedGender('male')}
                    text="Male"
                    iconName="male"
                    iconColor="white"
                    selected={selectedGender === 'male'}
                />
                <GenderButton
                    onPress={() => setSelectedGender('female')}
                    text="Female"
                    iconName="female"
                    iconColor="white"
                    selected={selectedGender === 'female'}
                />
            </View>

            <DatePickerComponent 
                onDateChange={onDateChange} 
                errorText={error} 
                style={styles.customDate} 
            />

            <CustomButton
                style={styles.customButtonStyle}
                text="Continue"
                onPress={onContinuePressed}
                type='PRIMARY'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    header: {
        marginTop: 50,
        marginBottom: 110,
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },

    genderContainer: {
        flexDirection: 'row', 
        width: '100%',
        marginVertical: 40,
        justifyContent: 'space-evenly',
    },

    customInputStyle: {
        width: '80%',
        borderRadius: 15,
        borderColor: '#203C3B',
        borderWidth: 1,
        marginVertical: 15,
        padding: 10,
    },

    customButtonStyle: {
        marginTop: 100,
        padding: 10,
        width: 240,
        height: 50,
        justifyContent: "center",
    },

    customDate: {
        marginVertical: 20,
    }
});

export default ProfileConfigurationScreen;
