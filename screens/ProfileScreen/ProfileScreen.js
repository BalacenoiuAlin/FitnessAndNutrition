import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import RoundImage from "../../components/RoundImage";
import Profile from "../../assets/images/Profile.png";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from "../../components/customButton";
import { useAuth } from "../../context/AuthContext";
import WeightPredictionComponent from "../../components/WeightPredictionComponent";
import { IP, PORT } from '@env';

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://IP:PORT/user/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                const json = await response.json();
                if (response.ok) {
                    setUser(json);
                } else {
                    console.error('Failed to fetch user profile:', json);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const onEdit = () => {
        console.warn("Edit");
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Failed to load user profile.</Text>
            </View>
        );
    }

    const calculateBMI = () => {
        const heightInMeters = user.height / 100;
        return (user.weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    const calculateBMR = () => {
        const birthDate = new Date(user.birthDate);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (user.gender === 'male') {
            return (88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * age)).toFixed(0);
        } else {
            return (447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * age)).toFixed(0);
        }
    };

    const calculateMaintenanceCalories = () => {
        const activityMultiplier = {
            'sedentarism': 1.2,
            'slightly active': 1.375,
            'active': 1.55,
            'pretty active': 1.725,
            'very active': 1.9
        };
        const bmr = calculateBMR();
        return (bmr * activityMultiplier[user.activity]).toFixed(0);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Text style={styles.profileStyle}>Profile</Text>
                    <RoundImage source={Profile} />
                    <View style={styles.rowContainerText}>
                        <Text style={styles.profileText}>{user.firstName} </Text>
                        <Text style={styles.profileText}>{user.lastName}</Text>
                    </View>
                    <View style={styles.rowContainerInfo}>
                        <Text style={styles.profileInfo}>Height: {user.height} cm</Text>
                        <Text style={styles.profileInfo}>Age: {new Date().getFullYear() - new Date(user.birthDate).getFullYear()}</Text>
                        <Text style={styles.profileInfo}>Weight: {user.weight} kg</Text>
                    </View>
                    <Text style={styles.lowerTextStyle}>Required caloric maintenance: {calculateMaintenanceCalories()} Kcal</Text>
                    <Text style={styles.lowerTextStyle}>(BMR) - Basal metabolic rate: {calculateBMR()} Kcal</Text>
                    <Text style={styles.lowerTextStyle}>(BMI) - Body mass index: {calculateBMI()}</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.lowerInfoContainer}>
                        <View style={styles.infoItem}>
                            <Ionicons name="fitness" size={24} color="#203C3B" />
                            <Text style={styles.lowerInfoStyle}>Goal</Text>
                            <Text style={styles.infoTextItem}>   {user.goal}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <FontAwesome5 name="running" size={24} color="#203C3B" />
                            <Text style={styles.lowerInfoStyle}>Level of Activity</Text>
                            <Text style={styles.infoTextItem}>  {user.activity}</Text>
                        </View>
                    </View>
                    <View style={styles.predictionContainer}>
                        <WeightPredictionComponent user={user} />
                    </View>
                    <CustomButton
                        text='Edit'
                        onPress={onEdit}
                        type='PRIMARY'
                        style={styles.buttonStyle}
                    />
                </View>
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
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },
    upperContainer: {
        backgroundColor: "#203C3B",
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    lowerContainer: {
        backgroundColor: "#fff",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    profileStyle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    rowContainerInfo: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
        height: 30,
    },
    rowContainerText: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 10,
        height: 30,
    },
    predictionContainer: {
        flex: 1,
        
    },
    profileText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    profileInfo: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: 'center',
        marginHorizontal: 30,
        left: -3,
    },
    lowerTextStyle: {
        color: "#fff",
        marginVertical: 15,
        width: '90%',
        fontWeight: '450',
        textAlign: 'left',
        marginLeft: 20,
    },
    lowerInfoContainer: {
        marginVertical: 0,
        justifyContent: "flex-start",
        width: '90%',
    },
    lowerInfoStyle: {
        color: "#203C3B",
        marginVertical: 5,
        fontWeight: '500',
        fontSize: 20,
        textAlign: 'left',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoTextItem: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '800',
        color: "#636363",
        textAlign: 'center',
    },
    buttonStyle: {
        marginHorizontal: 30,
        borderRadius: 20,
        marginTop: 20,
        width: '50%'
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    }
});

export default ProfileScreen;