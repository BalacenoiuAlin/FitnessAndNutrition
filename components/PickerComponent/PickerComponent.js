import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';

const PickerComponent = ({ selectedWeight, setSelectedWeight, unit }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const weights = Array.from({ length: 220 }, (_, i) => i + 1);

    const handleSelectWeight = (weight) => {
        setSelectedWeight(weight);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectedText}>{selectedWeight} {unit}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={weights}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={() => handleSelectWeight(item)}
                                >
                                    <Text style={styles.itemText}>{item} {unit}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        width: 120,
        height: 33,
        backgroundColor: '#eaeceb',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    selectedText: {
        fontSize: 17,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        maxHeight: '50%',
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default PickerComponent;
