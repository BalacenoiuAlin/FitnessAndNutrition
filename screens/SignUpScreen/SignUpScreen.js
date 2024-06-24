import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/customButton';
import GenderButton from '../../components/GenderButton';
import DatePickerComponent from '../../components/DatePickerComponent';
import PickerComponent from '../../components/PickerComponent';
import TargetPicker from '../../components/TargetPicker';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const [weight, setWeight] = useState('70');
    const [desiredWeight, setDesiredWeight] = useState('70');
    const [height, setHeight] = useState('170');
    const [activity, setActivity] = useState('Active');
    const [goal, setGoal] = useState('Maintain');
    const navigation = useNavigation();

    const onDateChange = (dateString) => {
        setBirthDate(dateString);
        if (new Date(dateString).getFullYear() < 1900) {
            setError('Invalid date, please select a valid date.');
        } else {
            setError('');
        }
    };

    const onSignUpPressed = async () => {
        try {
            const requestData = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                gender: selectedGender,
                birthDate: birthDate, 
                weight: parseFloat(weight), 
                desiredWeight: parseFloat(desiredWeight), 
                height: parseFloat(height), 
                goal: goal,
                activity: activity,
            };

            const response = await fetch('http://192.168.1.4:8081/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const text = await response.text(); 

            if (response.ok) {
                const json = JSON.parse(text); 
                console.log('Signup successful', json);
                navigation.navigate('SignIn');
            } else {
                console.log('Signup failed', text);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onAlreadyHaveAccountPressed = () => {
        navigation.navigate('SignIn');
    };

    const { height: windowHeight } = useWindowDimensions();

    const targetOptions = [
        { label: 'Lose Weight', value: 'Lose Weight' },
        { label: 'Maintain Weight', value: 'Maintain Weight' },
        { label: 'Gain Weight', value: 'Gain Weight' },
    ];

    const timeOptions = [
        { label: 'sedentarism', value: 'sedentarism' },
        { label: 'slightly active', value: 'slightly active' },
        { label: 'active', value: 'active' },
        { label: 'pretty active', value: 'pretty active' },
        { label: 'very active', value: 'very active' }
    ];

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Create your account</Text>
                <View style={styles.credentialsContainer}>
                    <CustomInput
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                        secureTextEntry={false}
                        style={styles.credentialsInputStyle}
                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                        style={styles.credentialsInputStyle}
                    />
                    <View style={styles.rowContainer}>
                        <CustomInput
                            placeholder="First Name"
                            value={firstName}
                            setValue={setFirstName}
                            style={styles.profileInputStyle1}
                        />
                        <CustomInput
                            placeholder="Last Name"
                            value={lastName}
                            setValue={setLastName}
                            style={styles.profileInputStyle2}
                        />
                    </View>
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
                    <View style={styles.datepickercontainer}>
                        <DatePickerComponent
                            onDateChange={onDateChange}
                            errorText={error}
                        />
                    </View>
                </View>
                <View style={styles.measurementsContainer}>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerStyle}>What is your height : </Text>
                        <PickerComponent
                            selectedWeight={height}
                            setSelectedWeight={setHeight}
                            unit="cm"
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerStyle}>What is your weight : </Text>
                        <PickerComponent
                            selectedWeight={weight}
                            setSelectedWeight={setWeight}
                            unit="kg"
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerStyle}>Ideal weight is this   : </Text>
                        <PickerComponent
                            selectedWeight={desiredWeight}
                            setSelectedWeight={setDesiredWeight}
                            unit="kg"
                        />
                    </View>
                </View>
                <View style={styles.targetContainer}>
                    <View style={styles.columnContainer}>
                        <Text style={styles.activityStyle}>Select your objective  </Text>
                        <TargetPicker
                            selectedValue={goal}
                            setSelectedValue={setGoal}
                            options={targetOptions}
                        />
                    </View>
                    <View style={styles.columnContainer}>
                        <Text style={styles.activityStyle}>Select your level of activity</Text>
                        <TargetPicker
                            selectedValue={activity}
                            setSelectedValue={setActivity}
                            options={timeOptions}
                        />
                    </View>
                </View>
                <CustomButton
                    text="Sign Up"
                    onPress={onSignUpPressed}
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    measurementsContainer: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#203C3B',
        color: '#203C3B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 20,
        marginVertical: 30,
    },
    targetContainer: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        shadowColor: '#203C3B',
        color: '#203C3B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
    },
    credentialsContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: '#203C3B',
        color: '#203C3B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        marginEnd: -6,
    },
    title: {
        marginTop: 35,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#203C3B',
        marginVertical: 20,
        textAlign: 'center',
    },
    credentialsInputStyle: {
        width: '90%',
        marginHorizontal: 19,
        borderColor: '#203C3B',
        borderWidth: 0.5,
        color: '#203C3B',
        height: 40,
    },
    profileInputStyle1: {
        width: '38%',
        marginHorizontal: 10,
        borderWidth: 0.5,
        borderColor: '#203C3B',
        color: '#203C3B',
        height: 40,
    },
    profileInputStyle2: {
        width: '38%',
        marginHorizontal: 10,
        borderWidth: 0.5,
        borderColor: '#203C3B',
        color: '#203C3B',
        right: -13,
        height: 40,
    },
    datepickercontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    customButtonStyle: {
        marginVertical: 30,
        width: '60%',
        alignSelf: 'center',
    },
    customButtonSignIn: {
        width: '90%',
        top: -15,
        alignSelf: 'center',
    },
    pickerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pickerStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#203C3B',
        marginLeft: 15,
        marginTop: 5,
    },
    activityStyle:{
        fontSize: 18,
        fontWeight: '500',
        color: '#203C3B',
        textAlign:'center',
    },
    columnContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 10,
    },
});

export default SignUpScreen;