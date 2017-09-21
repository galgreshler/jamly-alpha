import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { SocialIcon } from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Button, Input } from './common';
import {
    emailChanged,
    passwordChanged,
    loginUser,
    resetPassword
} from '../actions';

const { width, height } = Dimensions.get('window');

const background = require('../../res/login/bg.png');
const mark = require('../../res/login/logo.png');
const lockIcon = require('../../res/login/lock.png');
const emailIcon = require('../../res/login/email.png');

class Login extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        modalVisible: false
    };

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLoginPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    onResetPress() {
        const email = this.props.email;
        this.props.resetPassword({ email });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

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

    renderModal() {
        const modalBackgroundStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        };
        const innerContainerTransparentStyle = { backgroundColor: '#fff', padding: 20 };

        return (
            <Modal
                animationType={'slide'}
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                        <Text>Please enter your email</Text>
                        <Input
                            icon={emailIcon}
                            keyboardType='email-address'
                            placeholder="Email"
                            value={this.props.email}
                            onChangeText={this.onEmailChange.bind(this)}
                        />
                        <Button
                            onPress={this.onResetPress.bind(this)}
                            style={styles.modalButton}
                        >
                            Reset Password
                        </Button>
                        <Button
                            onPress={this.setModalVisible.bind(this, false)}
                            style={styles.modalButton}
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        console.log("login");
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.renderSpinner()}
                {this.renderModal()}
                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={mark} style={styles.mark} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapper}>
                        <Input
                            icon={emailIcon}
                            keyboardType='email-address'
                            placeholder="Email"
                            value={this.props.email}
                            onChangeText={this.onEmailChange.bind(this)}
                        />
                        <Input
                            secureTextEntry
                            icon={lockIcon}
                            placeholder="Password"
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                        />
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.setModalVisible(true)}>
                            <View>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <Button onPress={this.onLoginPress.bind(this)}>
                            Login
                        </Button>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            type='facebook'
                        />
                        <SocialIcon
                            title='Sign In With Google'
                            button
                            type='google-plus-official'
                        />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('Signup')}>
                                <View>
                                    <Text style={styles.signupLinkText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    popupContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markWrap: {
        flex: 2,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    forgotPasswordText: {
        color: '#000', //'#D8D8D8',
        backgroundColor: 'transparent',
        textAlign: 'right',
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountText: {
        color: '#000',
    },
    signupLinkText: {
        color: '#ff712c',
        marginLeft: 5,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    };
};

const actions = { emailChanged, passwordChanged, loginUser, resetPassword };

export default connect(mapStateToProps, actions)(Login);
