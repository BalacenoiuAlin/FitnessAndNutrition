import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

function DatePickerComponent({ errorText, onDateChange }) {
  const [curDate, setCurDate] = useState(new Date());

  function handleDateChange(event, date) {
    if (event.type === 'dismissed') return;
    setCurDate(date);
    onDateChange(date.getTime().toString());
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Enter your birthdate:</Text>
        <DateTimePicker
          value={curDate}
          onChange={(event, date) => handleDateChange(event, date)}
        />
      </View>
      {errorText && <Text style={styles.errText}>{errorText}</Text>}
    </View>
  );
}

DatePickerComponent.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
};

DatePickerComponent.defaultProps = {
  errorText: '',
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  errText: {
    color: '#420D09',
    fontSize: 15,
    marginTop: 2,
  },
});

export default DatePickerComponent;