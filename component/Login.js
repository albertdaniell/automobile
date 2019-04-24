import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage

} from 'react-native';
import {ThemeProvider, Avatar, Input} from 'react-native-elements';
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
import {Col, Row, Grid} from 'react-native-easy-grid';
import FadeInView from './Animation2'
import firebase from 'firebase'

// Initialize Firebase

var config = {
    apiKey: "AIzaSyAMk0KOgodH93bJULkgl6nyrWepD1wQ2Gs",
    authDomain: "fir-app-4bca0.firebaseapp.com",
    databaseURL: "https://fir-app-4bca0.firebaseio.com",
    projectId: "fir-app-4bca0",
    storageBucket: "fir-app-4bca0.appspot.com",
    messagingSenderId: "708634132259"
};
firebase.initializeApp(config);

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            activityVisible: false,
            name: '',
            loggedInStatus: false,
            message:''
        }

    }
    componentDidMount() {

        // this.setName() this.getKey()   this.retrieveData()

    }
    retrieveMyKeyData = async() => {
        try {
            const value = await AsyncStorage.getItem('MyKey');
            if (value !== null) {
                console.log("we have data")
                console.log(value);
            } else {
                console.log("no data")
            }
        } catch (error) {
            console.log("no data")
        }
    };

    saveMyKeyData = async() => {
        try {
            await AsyncStorage.setItem('MyKey', 'loggedIn');
            console.log("Key has been saved")
        } catch (error) {
            // Error saving data
        }
    };

    //     setName = (value) => {   AsyncStorage.setItem("myKey", 'the key is
    // this');         AsyncStorage.setItem('key', 'loggedIn').then(() => {
    //        console.log('User logged in')
    // this.setState({loggedInStatus: true});                 //
    // alert(this.state.name)             })     }

    loginFunc = () => {
        this.setState({activityVisible: true})

        if (this.state.email == '' || this.state.password == '') {
            this.setState({
                message:'Fields cannot be empty'
            })

            //authenticate

            this.setState({activityVisible: false})

            return 0;
        } else {
            //authenicate

            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                   this.setState({
                       message:'Please wait...'
                   })
                    this.saveMyKeyData()

                    setTimeout(() => {
                        this
                            .props
                            .openingPageHandler()
                    }, 2000)

                    return 0;

                })
                .catch((error) => {
                    this.setState({activityVisible: false})

                    this.setState({
                        message:error.message
                    })

                    console.log(error)

                    return 0;
                })

                //

                //  setTimeout(() => {      this          .props          .openingPageHandler()
                // }, 2000)

        }

    }

    maintainance(){
        alert("This module is still under progress!")
    }

    static navigationOptions = {
        header: null
    };

    render() {

        return (

            <Container style={{
                backgroundColor: '#fff8e2'
            }}>
                <FadeInView
                    style={{
                    width: '100%',
                    height: '100%'
                }}>

                    <Content
                        style={{
                        width: '100%',
                        marginTop: 100,
                        padding: 40
                    }}
                        padder>
                        <View
                            style={{
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>
                            <Image
                                source={require("../assets/carlogo.png")}
                                style={{
                                height: 20,
                                width: 40
                            }}></Image>

                            <Text
                                style={{
                                fontSize: 50,
                                marginLeft: 10,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>Login.</Text>
                        </View>
                        <TextInput // Inherit any props passed to it; e.g., multiline, numberOfLines below
                            onChangeText={(email) => this.setState({email})} editable={true} maxLength={40} placeholder="Email" placeholderTextColor='grey' textContentType='emailAddress' keyboardType='email-address' clearButtonMode='always' style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            padding: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            marginLeft: 10,
                            marginRight: 10
                        }}/>

                        <TextInput // Inherit any props passed to it; e.g., multiline, numberOfLines below
                            onChangeText={(password) => this.setState({password})} editable={true} maxLength={40} placeholder="Password" textContentType='password' clearButtonMode='always' placeholderTextColor='grey' style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            padding: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: 10,
                            marginRight: 10
                        }} secureTextEntry={true}/>

                        <Text style={{color:'orange',padding:10}}>{this.state.message}</Text>

                    </Content>

                    <Footer>

                        <FooterTab>
                            <Grid>
                                <Col
                                    style={{
                                    backgroundColor: '#5b0396',
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        style={{
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    onPress={this.props.createPageHandler}
                                    >
                                        <Text
                                            style={{
                                            padding: 20,
                                            marginLeft: 10,
                                            color: '#fff'
                                        }}>SIGN UP</Text>

                                    </TouchableOpacity>
                                </Col>
                                <Col
                                    style={{
                                    backgroundColor: '#039687',
                                    alignItems: 'center'
                                }}>
                                    {this.state.activityVisible
                                        ? <ActivityIndicator
                                                size="small"
                                                color="#00ff00"
                                                style={{
                                                marginTop: 20
                                            }}/>

                                        : <TouchableOpacity
                                            style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            height: '100%'
                                        }}>
                                            <Text
                                                onPress={this.loginFunc}
                                                style={{
                                                color: '#fff',
                                                padding: 20,
                                                marginLeft: 10
                                            }}>LOGIN</Text>

                                        </TouchableOpacity>
}
                                </Col>
                            </Grid>

                        </FooterTab>
                    </Footer>
                </FadeInView>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        height: '100%'
    }
});
