import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TargetPicker = ({ selectedValue, setSelectedValue, options }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.pickerButton}>
                <Text style={styles.selectedValueText}>{selectedValue ? selectedValue : 'Select an option'}</Text>
            </TouchableOpacity>
            {isExpanded && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setSelectedValue(itemValue);
                            setIsExpanded(false);
                        }}
                    >
                        {options.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    pickerButton: {
        height: 40,
        width: '45%',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#eaeceb',
        padding: 10,
    },
    selectedValueText: {
        color: '#203C3B',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 17,
    },
    pickerContainer: {
        borderWidth: 0.5,
        borderColor: '#203C3B',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    picker: {
        width: '100%',
    },
});

export default TargetPicker;
