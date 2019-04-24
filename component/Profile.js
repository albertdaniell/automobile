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
import firebase from 'firebase'
import {TextInput} from 'react-native-gesture-handler';

export default class Profile extends React.Component {

    static navigationOptions = {
        title: 'Account',
        headerStyle: {
            backgroundColor: 'orange'
        },
        headerTintColor: '#fff'
    };

    componentDidMount() {
        this.getUserDetails()
        // this.updateUserDetails()

    }

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

    getUserDetails = () => {
        var user = firebase
            .auth()
            .currentUser

        if (user != null) {
            // alert(user.email)
            this.setState({email: user.email, username: user.displayName})

            if (user.displayName == null) {
                this.setState({username: "No username"})
            } else {}
        } else {

            // alert(0)
        }
    }

    updateUserDetails = () => {
        if(this.state.usernameInput==''){
            alert("Username Cannot be empty");
            return 0;
        }

       

        var user = firebase
            .auth()
            .currentUser;

        user
            .updateProfile({displayName: this.state.usernameInput})
            .then(() => {
                this.getUserDetails()

                this.setState({username: usernameInput})
            })
            .catch((error) => {
                // An error happened.
            });

        if (user != null) {
            // alert(user.email)
            this.setState({username: user.displayName})
        }

    }

    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const cId = navigation.getParam('companyId', 'companyId');

        this.state = {

            companyId: cId,
            email: '',
            username: '',
            usernameInput: ''

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

                    <View style={{}}>
                        <List>
                            <ListItem itemDivider></ListItem>

                            <TouchableOpacity
                                style={{
                                backfaceColor: 'red',
                                width: '100%',
                                padding: 20,
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1
                            }}>
                                <Text>{this.state.email}</Text>
                            </TouchableOpacity>

                            <ListItem itemDivider></ListItem>

                            <TouchableOpacity
                                style={{
                                backfaceColor: 'red',
                                width: '100%',
                                padding: 20,
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1
                            }}>
                                <Text>{this.state.username}</Text>
                            </TouchableOpacity>

                            <ListItem itemDivider></ListItem>
                            <ListItem>

                                <Body>
                                    <TextInput
                                        style={{
                                        padding: 10,
                                        marginBottom: 10,
                                        marginTop: 10,
                                        borderBottomColor: '#ccc',
                                        borderBottomWidth: 1,
                                        margin: 10
                                    }}
                                        onChangeText={(usernameInput) => this.setState({usernameInput})}
                                        placeholder='Update username'></TextInput>
                                </Body>
                                <Right>
                                    <TouchableOpacity
                                        onPress={this.updateUserDetails}
                                        style={{
                                        backgroundColor: 'blue',
                                        padding: 10
                                    }}>
                                        <Text
                                            style={{
                                            color: '#fff'
                                        }}>Update</Text>
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>

                        </List>

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
    }
});
