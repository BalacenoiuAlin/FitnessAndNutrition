import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/customButton/customButton';
import CustomInput from '../../components/CustomInput';
import DatePickerComponent from '../../components/DatePickerComponent';
import GenderButton from '../../components/GenderButton';

const ProfileConfigurationScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);

    const onContinuePressed = () => {
        console.warn("Continue");
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

            <DatePickerComponent style={styles.customDate} />

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

});

export default ProfileConfigurationScreen;
