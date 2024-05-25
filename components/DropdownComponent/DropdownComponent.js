import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome } from '@expo/vector-icons';

const DropdownComponent = ({ data, placeholder, style, value, onChange }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={[styles.container, style]}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? placeholder : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={onChange}
                renderLeftIcon={() => (
                    <FontAwesome
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="intersex" 
                        size={20}
                    />
                )}
            />
        </View>
    );
};

DropdownComponent.propTypes = {
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

DropdownComponent.defaultProps = {
    placeholder: 'Select item',
    style: {},
    value: null,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 8,
        justifyContent: 'left',
        alignItems: 'left',
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: '#203C3B',
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 8,
        width: '100%',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default DropdownComponent;