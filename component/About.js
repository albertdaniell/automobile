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
    TabHeading,
    List,
    ListItem,
    Input,
    Grid,
    Col
} from 'native-base';
import Splash from './Spash'
import {SMS} from 'expo';

export default class About extends React.Component {

    static navigationOptions = {
        title: 'About',
        headerStyle: {
            backgroundColor: 'orange'
        },
        headerTintColor: '#fff'
    };

    componentDidMount() {}

    tellAFriend() {
        const isAvailable = SMS.isAvailableAsync();
        if (isAvailable) {
            const {result} = SMS.sendSMSAsync([''], 'Please download the app via this link');
            if (result) {
                // alert(0)
            }

        } else {
            // misfortune... there's no SMS available on this device
            alert("error")
        }
    }

    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const cId = navigation.getParam('companyId', 'companyId');

        this.state = {

            companyId: cId

        }
    }

    render() {
        const {navigate} = this.props.navigation;

        // const { navigation } = this.props; const itemId =
        // navigation.getParam('companyId', 'NO-ID');

        return (
            <FadeInView style={{
                backgroundColor: 'white'
            }}>

                <View style={{
                    marginTop: 10
                }}>

                    <Text style={{
                        padding: 10
                    }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, magni
                        consectetur! Consequatur commodi alias aperiam quibusdam ipsam magni enim
                        repellendus quo natus dolorem corporis corrupti, optio consectetur id laudantium
                        cupiditate. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        sit, reiciendis cumque nisi veniam tempora voluptates. Debitis a corporis modi
                        voluptatum sit iure id voluptates mollitia, possimus enim rerum nihil? Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Sit enim exercitationem culpa
                        eaque nostrum officiis commodi id minima hic similique, non amet ad perspiciatis
                        alias omnis odio, eos asperiores necessitatibus. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Veniam pariatur quia placeat reiciendis, eaque
                        sit. Molestiae non accusamus perspiciatis explicabo, eos nihil, illum assumenda
                        praesentium magnam, perferendis in doloribus quidem.

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
