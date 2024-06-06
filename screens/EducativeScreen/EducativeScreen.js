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
          <View style={styles.headerContainer}>
            <Text style={styles.textStyle}>Expand your knowledge</Text>
          </View>
          <KnowledgeComponent />
        </View>
      )}
    />
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

export default EducativeScreen;
