import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/customButton/customButton';
import CustomInput from '../../components/CustomInput';
import DropdownComponent from '../../components/DropdownComponent';
import Logo from '../../assets/images/Logo.png';
import DatePickerComponent from '../../components/DatePickerComponent';

const ProfileConfigurationScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);

    const onContinuePressed = () => {
        console.warn("Continue");
    }

    const dataGender = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile Creation</Text>
            <Image
                source={require('../../assets/images/Logo.png')}
                style={styles.logo}
            />
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
            <View style={styles.rowContainer}>
                <CustomInput
                    placeholder="Age"
                    value={selectedAge}
                    setValue={setSelectedAge}
                    secureTextEntry={false}
                    style={styles.rowInput}
                />
                <DropdownComponent
                    data={dataGender}
                    placeholder=""
                    style={styles.customDropdownStyle}
                    value={selectedGender}
                    onChange={item => setSelectedGender(item.value)}
                />
                <CustomInput
                    placeholder="Weight/kg"
                    value={selectedWeight}
                    setValue={setSelectedWeight}
                    secureTextEntry={false}
                    style={styles.rowInput}
                />
            </View>
            <DatePickerComponent />
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
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    logo: {
        width: 130,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        resizeMode: 'contain',
        backgroundColor: '#fff',
        marginBottom: 15,
        marginTop: 5,
    },
    customInputStyle: {
        width: '85%',
        borderRadius: 15,
        borderColor: '#203C3B',
    },

    customDropdownStyle: {
        width: '25%',
        borderRadius: 8,
        padding: 15,
        backgroundColor: '#fff',
        marginHorizontal: 25,
    },

    customButtonStyle: {
        marginTop: 100,
    },

    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },

    rowInput: {
        width: '25%',
        padding: 10,
        borderColor: '#203C3B',
        marginBottom: 40,
    },
});

export default ProfileConfigurationScreen;
