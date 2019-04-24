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
import { SMS } from 'expo';



export default class Account extends React.Component {

    static navigationOptions = {
        title:'Setting',
        headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: '#fff',
    };
   
    componentDidMount(){
      
    
    }

    tellAFriend(){
        const isAvailable = SMS.isAvailableAsync();
        if (isAvailable) {
            const { result } =  SMS.sendSMSAsync([''], 'Please download the app via this link');
            if(result){
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

            companyId:cId


        }
    }

    render() {
        const {navigate} = this.props.navigation;

        // const { navigation } = this.props;
        // const itemId = navigation.getParam('companyId', 'NO-ID');
    
        return (
            <FadeInView style={{backgroundColor:'white'}}>
{/* 
            <View
                        style={{
                        backgroundColor: '#b57800',
                        padding: 10
                    }}></View> */}
{/* 
                    <Header
                        style={{
                        backgroundColor: 'orange',
                        opacity: .8
                    }}>
                        <Left>
                         <Text onPress={()=> navigate.history.goBack()}>Back</Text> 
                        </Left>
                        <Body
                            style={{
                            padding: 10
                        }}>
                            <Text
                                style={{
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>Setting</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity
                            onPress={this.openControlPanel}
                            >
                            <Icon  type="FontAwesome" name='bars' style={{color:'white',marginRight:10}}></Icon>
                            </TouchableOpacity>
                        </Right>
                    </Header> */}
         <View style={{marginTop:0}}>

      
       
      
         <List>
           <ListItem itemDivider>
             
           </ListItem>                    
          
           <TouchableOpacity
           onPress={()=>navigate('Profile')}
            style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}>
           <Text>Account</Text>
           </TouchableOpacity>
          
         
           <ListItem itemDivider>
         
           </ListItem> 

           <TouchableOpacity 
           onPress={()=>navigate('About')}
           style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}>
           <Text>About</Text>
           </TouchableOpacity> 

           <TouchableOpacity
           onPress={this.tellAFriend}
            style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}>
           <Text>Tell a friend via SMS</Text>
           </TouchableOpacity>

           <TouchableOpacity
           
            style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}>
           <Text>Share</Text>
           </TouchableOpacity>

           <ListItem itemDivider>
         
         </ListItem> 

         

         <TouchableOpacity style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}>
         <Text>Logout</Text>
         </TouchableOpacity>


           
         </List>
 
     
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
