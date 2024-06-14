import React from 'react';
import { StyleSheet, View } from 'react-native';
import KnowledgeComponent from '../../components/KnowledgeComponent';

const EducativeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <KnowledgeComponent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default EducativeScreen;
