import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from './common';
import App from '../App';
import { getFirstSessions } from '../actions';

const { width, height } = Dimensions.get('window');

class SplashScreen extends Component {
    componentDidMount() {
        if (this.props.isAuthenticated) {
            // TODO update the saved user data
            this.props.getFirstSessions();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
            // TODO update the saved user data
            this.props.getFirstSessions();
        }
    }

    render() {
        console.log(this.props);
        if (this.props.isAuthenticated && this.props.firstSessionloading) {
            return (
                <View style={styles.container}>
                    <Image source={require('../../res/splash.png')} style={styles.backgroundImage}>
                        <View style={{ paddingVertical: 400 }}>
                            <Spinner size='large' />
                        </View>
                    </Image>
                </View>
            );
        }
        return <App />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    backgroundImage: {
        width,
        height
    }
});

const mapStateToProps = (state) => {
    const { firstSessionloading } = state.main;
    const { isAuthenticated } = state.auth;
    return { isAuthenticated, firstSessionloading };
};

const actions = {
    getFirstSessions
};

export default connect(mapStateToProps, actions)(SplashScreen);
