import React from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Screen2 from './Screen2'
import Splash from './Spash'
import Login from './Login'
import Opening from './Openingpage';
import CreatePage from './Create'
import firebase from 'firebase'

export default class Homescreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            AppName: '',
            splashLoaded: false,
            loginPageLoaded: false,
            openingPageLoaded: false,
            mainPageLoaded: false,
            loggedInStatus: false,
            createPageLoaded:false
        }

        this.loginPageHandler = this
            .loginPageHandler
            .bind(this)

        this.createPageHandler = this
            .createPageHandler
            .bind(this)

        this.openingPageHandler = this
            .openingPageHandler
            .bind(this)

        this.mainPageHandler = this
            .mainPageHandler
            .bind(this)

        this.logOutFunc=this.logOutFunc.bind(this)

      
    }

    logOutFunc(){
      setTimeout(()=>{
        this.clearKey()

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            alert("Error occured")
          });
        
        this.setState({
            loggedInStatus:false
        })

        this.setState({openingPageLoaded: false})
        this.setState({splashLoaded: true})
      },500)
        
    }

    clearKey=()=>{
       
            AsyncStorage.removeItem('MyKey')
            .then(()=>{
            console.log("cleared")
            }).catch((error)=>{

                console.log("erorrrrrrr!!!!!")
            })
        
    }

    retrieveMyKeyData= async () => {
        try {
          const value = await AsyncStorage.getItem('MyKey');
          if (value !== null) {
              this.setState({
                  loggedInStatus:true
              })
            console.log("we have data")
            console.log(value);
          }
          else{
              console.log("no data")
          }
        } catch (error) {
          console.log("no data")
        }
      };

      getUserDetails=()=>{
        var user=firebase.auth().currentUser

        if(user !=null){
            // alert(user.email)
            this.setState({
                email:user.email
            })
        }

        else{
            // alert(0)
        }
    }


    getKey = () => {
       var mykey= AsyncStorage
            .getItem('key')

            if(mykey !== null){
                console.log(mykey)
            }

            else{
                alert("no key detected")
            }
            // .then((value) => {

            //     this.setState({loggedInStatus: true, mainPageHandler: false})

            //     this.setState({loginPageLoaded: true})
            //     // this.setState({'name': value}) alert(this.state.name)

            //     console.log("Logged in detected with" +value)

            // })
            // .catch((error) => {
            //     console.log(error)
            // })

    }
    loginPageHandler = () => {
        this.setState({createPageLoaded: false})
        this.setState({loginPageLoaded: true})
        this.setState({splashLoaded: false})
    }

    createPageHandler = () => {


        this.setState({createPageLoaded: true})
        this.setState({loginPageLoaded: false})

        this.setState({splashLoaded: false})
    }

    openingPageHandler = () => {

        this.setState({openingPageLoaded: true})
        this.setState({loginPageLoaded: false})
        this.setState({createPageLoaded:false})
    }

    mainPageHandler = () => {

        this.setState({mainPageLoaded: true})
    }

   


    componentDidMount() {

        setTimeout(() => {
            this.setState({splashLoaded: true})
            this.retrieveMyKeyData()
           //this.clearKey()
        }, 2500)

    }

    loadPage = () => {
        // alert(0)

        setTimeout(() => {
            this.setState({splashLoaded: true})
        }, 20)
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                height: '100%'
            }}>
                {this.state.splashLoaded
                    ? this.state.loggedInStatus
                        ? <Opening logOutFunc={this.logOutFunc} navigation={this.props.navigation}></Opening>
                        : <Screen2 loginPageHandler={this.loginPageHandler}></Screen2>
                        



                    : this.state.loginPageLoaded
                        ? <Login createPageHandler={this.createPageHandler} openingPageHandler={this.openingPageHandler}></Login>
                        :this.state.createPageLoaded 
                        ? <CreatePage saveMyKeyData={this.saveMyKeyData} loginPageHandler={this.loginPageHandler} openingPageHandler={this.openingPageHandler}></CreatePage>

                        : this.state.openingPageLoaded
                            ? <Opening logOutFunc={this.logOutFunc}   navigation={this.props.navigation}></Opening>

                            : <Splash></Splash>
}

       

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});
