import React from 'react';
import { FlatList, StyleSheet, View, Text, } from 'react-native';
import KnowledgeComponent from '../../components/KnowledgeComponent';

const EducativeScreen = ({ navigation }) => {
  const data = [{ key: '1' }];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={() => (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Expand your knowledge !</Text>
          <KnowledgeComponent />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignContent: 'center',
  },

  headerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: '10%',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 10a0,
  },
});

export default EducativeScreen;
