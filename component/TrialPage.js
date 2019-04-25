import React from 'react';
import {StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import FadeInView from './Animation'
import {
    Container,
    Header,
    Title,
    Content,
    Form,
    Item,
    Label,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Tabs,
    Tab,
    TabHeading
} from 'native-base';
import Splash from './Spash'

export default class Trial extends React.Component {

    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const cId = navigation.getParam('companyId', 'companyId');

        this.state = {

            companyId: cId

        }
    }

    render() {
        // const { navigation } = this.props; const itemId =
        // navigation.getParam('companyId', 'NO-ID');

        return (
            <FadeInView style={{}}>
                <View
                    style={{
                    backgroundColor: '#b57800',
                    padding: 10
                }}></View>

                <Header
                    style={{
                    backgroundColor: 'orange'
                }}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{
                        padding: 10
                    }}>
                        <Text>Header</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>

                <View
                    style={{
                    marginTop: 20,
                    padding: 10
                }}>

                    <Text>itemId: {this.state.companyId}</Text>

                    <Text>This is the trial screeennnnn</Text>

                    <Text>Welcome to Automobile App MainPAge Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Modi, voluptate voluptatem? Quisquam sint, pariatur
                        exercitationem iusto blanditiis, dicta ipsam explicabo expedita, rerum labore
                        esse harum debitis asperiores perferendis ratione deleniti.
                    </Text>

                </View>
            </FadeInView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
