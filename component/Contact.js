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
    Col,
    Textarea
} from 'native-base';
import Splash from './Spash'
import {SMS} from 'expo';
import {TextInput} from 'react-native-gesture-handler';

export default class Contact extends React.Component {

    static navigationOptions = {
        title: 'Contact and Report',
        headerStyle: {
            backgroundColor: 'orange'
        },
        headerTintColor: '#fff'
    };

    componentDidMount() {}

    report = () => {}

    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const cId = navigation.getParam('companyId', 'companyId');

        this.state = {}
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

                    <View style={{
                        padding: 10
                    }}>
                        <Text
                            style={{
                            padding: 10
                        }}></Text>

                        <Text
                            style={{
                            padding: 10
                        }}>
                            Report title
                        </Text>
                        <TextInput style={styles.myInput}></TextInput>
                        <Text
                            style={{
                            padding: 10
                        }}>
                            Describe problem
                        </Text>
                        <Textarea rowSpan={5} bordered placeholder="...."/>
                        <TouchableOpacity
                            style={{
                            padding: 10,
                            alignItems: 'center',
                            backgroundColor: 'black',
                            marginTop: 10
                        }}>
                            <Text
                                style={{
                                color: '#fff',
                                padding: 10
                            }}>Submit</Text>
                        </TouchableOpacity>

                    </View>
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
    },
    myInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        padding: 10
    }
});
