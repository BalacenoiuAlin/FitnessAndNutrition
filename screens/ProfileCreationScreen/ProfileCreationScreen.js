import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import customButton from '../../components/customButton';
import weightSelectorComponent from '../../components/weightSelectorComponent';
import CustomButton from '../../components/customButton';

const ProfileCreationScreen = () => {
    const onContinue = () => {
        console.warn("Continue");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>
                Thank you for taking the time !
            </Text>
            <View style={styles.containerStyle}>
                <Text style={styles.upperTextStyle}>
                    Based on the options that you made, these are the following calculations:
                </Text>
                <Text style={styles.textStyle}>
                    (BMI)Body mass index:        28.37
                </Text >
                <Text style={styles.textStyle}>
                    (BMR)Bazal metabolic rate: 1989 Kcal
                </Text >
                <Text style={styles.textStyle}>
                    Required caloric maintenance: 2735 Kcal
                </Text>

                <CustomButton 
                    text="Continue"
                    type='PRIMARY'
                    style={styles.buttonStyle}
                    onPress={onContinue}
                />
            </View>
            <Text style={styles.bottomStyle}>
                Info: You can modify the setup in the profile section !
            </Text>
        </View>
    );
}

export default ProfileCreationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#203C3B",
    },

    containerStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        width: '70%',
        height: '70%',
        borderRadius: 30,
    },

    headerStyle: {
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 23,
        width: '90%',
        marginTop: 40,
        marginBottom: 60,
    },

    bottomStyle: {
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17,
        marginTop: 60,
        marginBottom: 30,
        width: '90%',
    },

    upperTextStyle: {
        color: "#203C3B",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 60,
        width: '95%',

    },

    textStyle: {
        color: "#203C3B",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        marginVertical:30,
        width: '80%'
    },

    buttonStyle: {
        marginTop: 20,
    }
})