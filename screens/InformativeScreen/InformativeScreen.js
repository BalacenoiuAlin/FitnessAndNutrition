import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import InformativeComponent from '../../components/InformativeComponent';

const InformativeScreen = () => {
    const data = [{ key: '1' }];

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.key}
                renderItem={() => <InformativeComponent />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    headerContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 20,
    },
    textStyle: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default InformativeScreen;
