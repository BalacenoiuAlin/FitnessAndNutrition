import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        title="Select your date of birth"
        onPress={() => setOpen(true)}
        color="#B4B4B4" // Adjust the button text color
      />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        textColor="#B4B4B4" 
        theme="light" 
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#203C3B',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
});

export default DatePickerComponent;
