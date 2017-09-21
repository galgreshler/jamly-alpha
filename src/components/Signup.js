import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button, Input } from './common';
import {
  signupInputChanged,
  signupUser
 } from '../actions';

const background = require('../../res/login/bg.png');
const personIcon = require('../../res/login/person.png');
const lockIcon = require('../../res/login/lock.png');
const emailIcon = require('../../res/login/email.png');

class Signup extends Component {

  static navigationOptions = {
      title: 'Signup to Jamly',
      headerStyle: { backgroundColor: '#ff712c' },
      headerTitleStyle: { color: '#fff' }
  };

  state = {
    validation: {
      name: '',
      email: '',
      password: '',
      rpassword: '',
      valid: false
    }
  };

  componentWillReceiveProps(nextProps) {
    const isValid = this.isFormValid(nextProps);
    if (isValid !== this.state.validation.valid) {
      this.setState({ validation: { ...this.state.validation, valid: isValid } });
    }
  }

  onSignupPress() {
    const { name, email, password } = this.props;
    this.props.signupUser({ name, email, password });
  }

  onInputChanged(key, val) {
    this.props.signupInputChanged(key, val);
    this.setState({
      ...this.state,
      validation: { ...this.state.validation, [key]: '' }
    });
  }

  validateInput(key) {
    let message = '';
    switch (key) {
      case 'name':
        if (this.props.name.length === 0) {
          message = 'Please fill in your name';
        }
        break;
      case 'email':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.props.email)) {
          message = 'Please fill a valid email address';
        }
        break;
      case 'password':
        if (this.props.password.length < 4) {
          message = 'Password must be at least 4 characters';
        }
        break;
      case 'rpassword':
        if (this.props.password !== this.props.rpassword) {
          message = 'Passwords must match';
        }
        break;
      default:
    }

    if (message.length > 0) {
      // this field is not valid
      this.setState({
        ...this.state,
        validation: { ...this.state.validation, [key]: message }
      });
    }
  }

  isFormValid(validState) {
    return (validState.name.length > 0 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(validState.email) &&
      validState.password.length >= 4 && validState.password === validState.rpassword);
  }

  renderSpinner() {
    return (
      <Spinner
        visible={this.props.loading}
        // textContent={'Logging in...'}
        textStyle={{ color: '#000' }}
        color='#000'
        overlayColor='rgba(0,0,0,0.25)'
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {this.renderSpinner()}
        <Image
          source={background}
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          {/* <View style={styles.headerContainer}>

            <View style={styles.headerIconView}>
              <TouchableOpacity style={styles.headerBackButtonView}>
                <Image
                  source={backIcon}
                  style={styles.backButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>

          </View> */}

          <View style={styles.inputsContainer}>
            <Input
              icon={personIcon}
              placeholder="Name"
              autoCapitalize='words'
              value={this.props.name}
              onChangeText={this.onInputChanged.bind(this, 'name')}
              onBlur={this.validateInput.bind(this, 'name')}
            />
            <Text style={styles.errorTextStyle}>
              {this.state.validation.name}
            </Text>
            <Input
              icon={emailIcon}
              placeholder="Email"
              keyboardType='email-address'
              value={this.props.email}
              onChangeText={this.onInputChanged.bind(this, 'email')}
              onBlur={this.validateInput.bind(this, 'email')}
            />
            <Text style={styles.errorTextStyle}>
              {this.state.validation.email}
            </Text>
            <Input
              secureTextEntry
              icon={lockIcon}
              placeholder="Password"
              value={this.props.password}
              onChangeText={this.onInputChanged.bind(this, 'password')}
              onBlur={this.validateInput.bind(this, 'password')}
            />
            <Text style={styles.errorTextStyle}>
              {this.state.validation.password}
            </Text>
            <Input
              secureTextEntry
              icon={lockIcon}
              placeholder="Repeat Password"
              value={this.props.rpassword}
              onChangeText={this.onInputChanged.bind(this, 'rpassword')}
              onBlur={this.validateInput.bind(this, 'rpassword')}
            />
            <Text style={styles.errorTextStyle}>
              {this.state.validation.rpassword}
            </Text>

            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>

          </View>

          <View style={styles.footerContainer}>

            <Button
              onPress={this.onSignupPress.bind(this)}
              disabled={!this.state.validation.valid}
            >
              Signup
            </Button>

            <TouchableOpacity onPress={() => navigate('Login')}>
              <View style={styles.signin}>
                <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}> Sign In</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#000'
  },
  whiteFont: {
    color: '#ff712c'
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth }) => {
  const { name, email, password, rpassword, error, loading } = auth.signup;
  return {
    name,
    email,
    password,
    rpassword,
    error,
    loading
  };
};

const actions = { signupInputChanged, signupUser };

export default connect(mapStateToProps, actions)(Signup);
