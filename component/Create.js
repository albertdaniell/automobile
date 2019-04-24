import React from 'react';
import {StyleSheet, 
    ActivityIndicator,View, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage,Image,} from 'react-native';
import firebase from 'firebase';
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
  
} from 'native-base';
import FadeInView from './Animation2'
import {Col, Row, Grid} from 'react-native-easy-grid';

class CreatePage extends React.Component {

    state = {
       
        email: '',
        password: '',
        password2: '',
        activityVisible: false,
        message: ''
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

    signUpFunc = () => {

        this.setState({activityVisible: true})

        if (this.state.email == ''  && this.state.password == '' && this.state.password2 == '') {
            this.setState({message: 'Fields cannot be empty'})
            this.setState({activityVisible: false})

            return 0;
        } else if (this.state.password !== this.state.password2) {
            this.setState({message: 'Passwords do not match'})
            this.setState({activityVisible: false})

            return 0;

        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {

              this.saveMyKeyData()

                this.setState({message:'Please wait...Logging in to your account'})
                setTimeout(() => {
                    this
                        .props
                        .openingPageHandler()
                }, 2000)
                //alert("Sign up successful!!!")

            })
            .catch((error) => {
                this.setState({activityVisible: false})

                this.setState({message: error.message})
            })
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
                        </View>
                            <Text
                                style={{
                                fontSize: 50,
                                marginLeft: 10,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>Sign up.</Text>
                        <KeyboardAvoidingView enabled keyboardVerticalOffset={50}>

                       

                            <TextInput // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                onChangeText={(email) => this.setState({email})} editable={true} maxLength={40} placeholder="Email" placeholderTextColor='grey' textContentType='emailAddress' keyboardType='email-address' clearButtonMode='always' style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                padding: 10,
                                marginTop: 10,
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

                            <TextInput // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                onChangeText={(password2) => this.setState({password2})} editable={true} maxLength={40} placeholder="Confirm Password" textContentType='password' clearButtonMode='always' placeholderTextColor='grey' style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                padding: 10,
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 10,
                                marginRight: 10
                            }} secureTextEntry={true}/>
                            <Text
                                style={{
                                padding: 10,
                                color: 'orange'
                            }}>{this.state.message}</Text>

                        </KeyboardAvoidingView>

                    </Content>
                    <Footer>

                        <FooterTab>
                            <Grid>

                                <Col
                                    style={{
                                    backgroundColor: '#039687',
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={this.props.loginPageHandler}
                                        style={{
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                        <Text
                                            style={{
                                            color: '#fff',
                                            padding: 20,
                                            marginLeft: 10
                                        }}>LOGIN</Text>

                                    </TouchableOpacity>
                                </Col>

                                <Col
                                    style={{
                                    backgroundColor: '#5b0396',
                                    alignItems: 'center'
                                }}>

                                    {this.state.activityVisible
                                        ? <ActivityIndicator
                                                size="small"
                                                color="#00ff00"
                                                style={{
                                                marginTop: 20
                                            }}/>

                                        : null
}
                                    <TouchableOpacity
                                        style={{
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                        onPress={this.signUpFunc}>
                                        <Text
                                            style={{
                                            padding: 20,
                                            marginLeft: 10,
                                            color: '#fff'
                                        }}>SIGN UP</Text>

                                    </TouchableOpacity>
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
        padding: 10
    }
});

export default CreatePage;