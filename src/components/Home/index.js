import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon } from 'native-base';
import { logout } from '../../actions';

const { width, height } = Dimensions.get('window');

class Home extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={this.props.logout}>
                            <Icon name='ios-chatbubbles-outline' />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>
                            Jamly
                        </Title>
                    </Body>
                    <Right>
                        <Icon name='ios-microphone-outline' />
                    </Right>
                </Header>
                <Content>
                    <Text>
                        SessionList component should go here, they are in this.props.sessions. A click on a session should navigate to a session page with the session info.
                    </Text>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { sessions } = state.main;
    return { sessions };
};

export default connect(mapStateToProps, { logout })(Home);
