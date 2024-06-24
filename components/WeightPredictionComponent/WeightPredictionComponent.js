import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const WeightPredictionComponent = ({ user }) => {
    const [predictionData, setPredictionData] = useState([]);

    useEffect(() => {
        const data = generatePredictionData();
        setPredictionData(data);
    }, [user]);

    const generatePredictionData = () => {
        const data = [];
        let currentWeight = user.weight;
        const { desiredWeight, goal } = user;
        let week = 0;

        const bmr = calculateBMR();
        const tdee = calculateTDEE(bmr);

        while ((goal === "Lose Weight" && currentWeight > desiredWeight) ||
               (goal === "Gain Weight" && currentWeight < desiredWeight)) {
            const weeklyCaloricChange = calculateWeeklyCaloricChange(tdee, goal, week);
            const weeklyWeightChange = weeklyCaloricChange / 7700; // 7700 calories approximately equals 1kg
            currentWeight += weeklyWeightChange;
            data.push({ week: week, weight: currentWeight.toFixed(2) });
            week++;
        }

        // Add the final desired weight point
        data.push({ week: week, weight: desiredWeight.toFixed(2) });

        return data;
    };

    const calculateBMR = () => {
        const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
        if (user.gender === 'male') {
            return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * age);
        }
    };

    const calculateTDEE = (bmr) => {
        const activityMultiplier = {
            'sedentarism': 1.2,
            'slightly active': 1.375,
            'active': 1.55,
            'pretty active': 1.725,
            'very active': 1.9
        };
        return bmr * (activityMultiplier[user.activity] || 1.2);
    };

    const calculateWeeklyCaloricChange = (tdee, goal, week) => {
        if (goal === "Lose Weight") {
            return -3500 * Math.log(week + 2);
        } else if (goal === "Gain Weight") {
            return 3500 * Math.log(week + 2);
        }
        return 0;
    };

    const handleDataPointClick = (data) => {
        Alert.alert(`Week ${data.index + 1}`, `Weight: ${data.value} kg`);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Prediction of weight changes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={{
                        labels: predictionData.map(d => `Week ${d.week}`),
                        datasets: [
                            {
                                data: predictionData.map(d => parseFloat(d.weight)),
                                color: (opacity = 1) => `rgba(203, 183, 153, ${opacity})`,
                                strokeWidth: 2,
                            },
                        ],
                        legend: ["Weight Prediction"]
                    }}
                    width={screenWidth * 2}
                    height={300}
                    yAxisLabel=""
                    yAxisSuffix="kg"
                    chartConfig={{
                        backgroundColor: "#203C3B",
                        backgroundGradientFrom: "#203C3B",
                        backgroundGradientTo: "#203C3B",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#CBB799",
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 10,
                    }}
                    onDataPointClick={handleDataPointClick}
                />
            </ScrollView>
            <View style={styles.legendContainer}>
                <Text style={styles.legendText}>Legend:</Text>
                <Text style={styles.legendItem}><View style={styles.legendColor}></View> Weight Prediction</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    This chart shows the predicted weight change over time based on your current weight, desired weight, and activity level.
                    The rate of change is higher at the beginning and slows down as you approach your goal.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '111%',
    },
    title: {
        fontSize: 22,
        color: '#203C3B',
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    legendContainer: {
        marginVertical: 10,
        alignItems: "center",
    },
    legendText: {
        fontSize: 16,
        color: '#203C3B',
        fontWeight: "bold",
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    legendColor: {
        width: 20,
        height: 20,
        backgroundColor: "#CBB799",
        marginRight: 10,
    },
    descriptionContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    descriptionText: {
        fontSize: 14,
        textAlign: "left",
    },
});

export default WeightPredictionComponent;
