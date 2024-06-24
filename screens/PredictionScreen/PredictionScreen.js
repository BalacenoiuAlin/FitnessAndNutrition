import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import WeightPredictionComponent from "../../components/WeightPredictionComponent";
import { useAuth } from "../../context/AuthContext";

const PredictionScreen = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://192.168.1.4:8081/user/profile', {
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

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <WeightPredictionComponent user={user} />
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
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    }
});

export default PredictionScreen;
