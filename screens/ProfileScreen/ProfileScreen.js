import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundImage from "../../components/RoundImage";
import Profile from "../../assets/images/Profile.png";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from "../../components/customButton";

const ProfileScreen = () => {
    const onEdit = () => {
        console.warn("Edit");
    }
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.profileStyle}>Profile</Text>
                <RoundImage source={Profile} />
                <View style={styles.rowContainerText}>
                    <Text style={styles.profileText}> Alin </Text>
                    <Text style={styles.profileText}> Balacenoiu </Text>
                </View>
                <View style={styles.rowContainerInfo}>
                    <Text style={styles.profileInfo}>Age: 22                 </Text>
                    <Text style={styles.profileInfo}>Height: 1.85 cm         </Text>
                    <Text style={styles.profileInfo}>Weight: 93 kg     </Text>
                </View>
                <Text style={styles.lowerTextStyle}>(BMI)-Body mass index : 28.37</Text>
                <Text style={styles.lowerTextStyle}>(BMR)-Bazal metabolic rate : 1989 Kcal</Text >
                <Text style={styles.lowerTextStyle}>Required caloric maintanance: 2735 Kcal </Text>
            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.lowerInfoContainer}>
                    <View style={styles.infoItem}>
                        <Ionicons name="fitness" size={24} color="#203C3B" />
                        <Text style={styles.lowerInfoStyle}>Goal</Text>
                    </View>
                    <Text style={styles.infoTextItem}>   Weight Recomposition</Text>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="food-apple" size={24} color="#203C3B" />
                        <Text style={styles.lowerInfoStyle}>Level of caloric difficulty</Text>
                    </View>
                    <Text style={styles.infoTextItem}>  Maintainable</Text>
                    <View style={styles.infoItem}>
                        <FontAwesome5 name="running" size={24} color="#203C3B" />
                        <Text style={styles.lowerInfoStyle}>Level of Activity</Text>
                    </View>
                    <Text style={styles.infoTextItem}>  Moderate Activity</Text>
                </View>
                <CustomButton
                text='Edit'
                onPress={onEdit}
                type='PRIMARY'
                style={styles.buttonStyle}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    upperContainer: {
        backgroundColor: "#203C3B",
        position: "absolute",
        width: "100%",
        height: "45%",
        alignItems: "center",
        top: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    lowerContainer: {
        backgroundColor: "#fff",
        position: "absolute",
        width: "100%",
        height: "55%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
        bottom: 0,
    },

    profileStyle: {
        color: "#fff",
        fontSize: 20,
        width: "60%",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
    },

    rowContainerInfo: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 10,
        height: 30,
        marginLeft: 50,
    },

    rowContainerText: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 10,
        height: 30,
    },

    profileText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },


    profileInfo: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        marginHorizontal: 10,
        textAlign: "left",
    },

    lowerTextStyle: {
        color: "#fff",
        marginVertical: 15,
        width: '90%',
        alignItems: 'left',
        fontWeight: '450',
        marginLeft: 45,
    },

    lowerInfoContainer: {
        marginTop: 20,
        alignItems: "center", 
        justifyContent: "center",
        width: '90%',
    },

    lowerInfoStyle: {
        color: "#203C3B",
        marginVertical: 5,
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
    },

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    infoTextItem: {
        marginVertical: 10,
        fontSize: 12,
        fontWeight: '800',
        color: "#636363",
        textAlign: 'center',
    },

    buttonStyle: {
        marginHorizontal: 30,
        borderRadius:20,
        marginTop: 50,
        width: '50%'
    }
});


export default ProfileScreen;
