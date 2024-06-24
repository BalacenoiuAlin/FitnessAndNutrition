import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

function DatePickerComponent({ errorText, onDateChange }) {
  const [curDate, setCurDate] = useState(new Date());

  function handleDateChange(event, date) {
    if (event.type === 'dismissed') return;
    setCurDate(date);
    if (onDateChange && typeof onDateChange === 'function') {
      onDateChange(date.toISOString().split('T')[0]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Enter your birthdate:</Text>
        <DateTimePicker
          value={curDate}
          onChange={handleDateChange}
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
    justifyContent: 'space-around',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    width: '95%',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#203C3B',
  },
  errText: {
    color: '#203C3B',
    fontSize: 15,
    marginTop: 2,
  },
});

export default DatePickerComponent;
