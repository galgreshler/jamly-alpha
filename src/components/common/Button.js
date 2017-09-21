// Import libraries for making a component
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

// Make a component
const Button = (props) => {
  // const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      {...props}
    >
      <View style={[styles.button, props.disabled && styles.disabled]}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

let styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff712c', //#FF8C00',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  disabled: {
    backgroundColor: '#808080'
  }
});

// Make the component available to other parts of the app
export { Button };
