import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import GenderButton from '../../components/GenderButton';

const ProfileConfigurationScreen = () => {
  const [gender, setGender] = useState('girl');
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please fill in the true information</Text>
      <View style={styles.genderContainer}>
        <GenderButton />
        <GenderButton />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Birthday (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
      />
      <Button title="Next" onPress={() => {}} color="#00CFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  genderButtonSelected: {
    backgroundColor: '#F0F0F0',
  },
  genderText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 18,
    marginLeft: 10,
    color: 'green',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ProfileConfigurationScreen;
