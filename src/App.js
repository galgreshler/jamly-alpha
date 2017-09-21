import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

class App extends Component {
    render() {

        const AnnonNavigator = StackNavigator({
          Login: { screen: Login },
          Signup: { screen: Signup }
        }, {
          initialRouteName: 'Login',
          headerMode: 'screen'
        });

        const LoggedNavigator = TabNavigator({
            Profile: {
                screen: Home,
            },
            Notifications: {
                screen: Home,
            },
            Search: {
                screen: Home,
            },
            Home: {
                screen: Home,
            }
        }, {
            initialRouteName: 'Home',
            tabBarPosition: 'bottom',
            animationEnabled: true,
            tabBarOptions: {
                activeTintColor: '#e91e63',
            },
        });

        if (this.props.isAuthenticated) {
          return (
              <LoggedNavigator />
          );
        }
        return <AnnonNavigator />;
    }
}

const mapStateToProps = function (state) {
    const { auth } = state;
    return {
        isAuthenticated: auth.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(App);
