import React from 'react';
import { TextInput, View, Image } from 'react-native';

const Input = (props) => {
  return (
    <View style={styles.inputWrap}>
      <View style={styles.iconWrap}>
        <Image source={props.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <TextInput
        placeholderTextColor="#b1a9a5"
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = {
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginHorizontal: 10
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 20
  },
};

export { Input };
