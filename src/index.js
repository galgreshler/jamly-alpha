import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import configureStore from './store/configureStore';
import SplashScreen from './components/SplashScreen';

export default class JamlyApp extends Component {
    constructor() {
        super();
        this.state = {
            isLoadingStore: true,
            preLoading: true,
            store: configureStore(this.preLoad.bind(this),this.errorLoadingStore.bind(this))
        };
    }

    preLoad() {
        console.log("preload");
        this.setState({ isLoadingStore: false });
        // setTimeout(() => this.setState({ isLoadingStore: false }), this.SPLASH_DELAY_SEC * 1000);
        // getSessions().then((res) => {
        //   res.json().then((data) => {
        //     console.log(data);
        //     this.setState({ isLoadingStore: false });
        //   });
        // });
    }

    errorLoadingStore(err) {
        console.log("failed to load state " + err);
        this.setState({ isLoadingStore: false });
    }

    SPLASH_DELAY_SEC = 0.1;

    render() {
        if (this.state.isLoadingStore) {
            return <Text>loading</Text>;
        }

        return (
            <Provider store={this.state.store}>
                <SplashScreen/>
            </Provider>
        );
    }
}