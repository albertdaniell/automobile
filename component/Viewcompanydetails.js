import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ImageBackground,
    Platform
} from 'react-native';

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

    Left,
    Right,
    Body,
    Icon,
    Text,
    Tabs,
    Tab,
    TabHeading,
    List,
    ListItem
} from 'native-base';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
  } from 'expo';
  
import Splash from './Spash'
import firebase from 'firebase'
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';

export default class compDetails extends React.Component {

    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const cId = navigation.getParam('companyId', 'companyId');

        this.state = {

            companyId: cId,
            companyData: []

        }
    }

    getCompDetails = () => {
        var myRef = firebase
            .database()
            .ref('companies/' + this.state.companyId)
        myRef.on("value", (snapshot) => {
            //  console.log(snapshot.val());

            // const fbObject = snapshot.val();
            // const newArr = Object
            //     .keys(fbObject)
            //     .map((key) => {
            //         fbObject[key].id = key;
            //         return fbObject[key];
            //     });

            //alert(newArr)

            this.setState({
                companyData: snapshot.val()
            })
            // alert(this.state.companyData)
            // alert(this.state.companyData.automation_software)
           // console.log(newArr)
        }, function (error) {
            console.log("Error: " + error.code);
        });

    }

    componentDidMount() {
        this.getCompDetails()
      
    }

    componentWillMount() {
        this.getCompDetails()
    }

    render() {
        const {navigate} = this.props.navigation;

        // const { navigation } = this.props; const itemId =
        // navigation.getParam('companyId', 'NO-ID');

        return (
            <FadeInView style={{}}>
                {/* <View style={{backgroundColor:'#b57800',padding:10}}>

               </View> */}

                {/* <Header style={{backgroundColor:'orange'}}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{padding:10}}>
                        <Text style={{fontWeight:'bold'}}>Details</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header> */}

                <ImageBackground
                  
                    style={{
                    height: '30%',
                    width: '100%',
                }}>

                    <View
                        style={{
                        backgroundColor: 'rgba(0,0,0,.5)',
                        padding: 20,
                        height: '20%',
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight:'bold'
                        }}>
                            {this.state.companyData.company_name}</Text>
                        <Text
                            style={{
                            color: '#ccc',
                            fontSize: 18
                        }}>
                            <Icon
                                style={{
                                color: 'orange'
                            }}
                                type="FontAwesome"
                                name="map-marker"/> {this.state.companyData.physical_address}</Text>

                    </View>
                </ImageBackground>

                <ScrollView>

                    <View
                        style={{
                        marginTop: 20,
                        padding: 10
                    }}>

                        {/* <Text>itemId: {this.state.companyId}</Text> */}
                        <TouchableOpacity 
                        onPress={()=>navigate('Appmapview',{companyName:this.state.companyData.company_name,lat:this.state.companyData.lat,long:this.state.companyData.long})}
                        style={{backgroundColor:'orange',padding:20,alignItems:'center',marginBottom:10}}>
                                    <Text>View on map</Text>
                                </TouchableOpacity>
                        <List>
             

                            <ListItem itemDivider>
                            <Icon
                            type='FontAwesome'
                                    active
                                    name="desktop"
                                    style={{
                                    color: '#f44298',
                                    marginRight:10
                                }}/>
                                <Text>Automation Software</Text>
                            </ListItem>
                            <ListItem>

                                {!this.state.companyData.automation_software
                                    ? <Text>False</Text>
                                    : <Text>True</Text>}

                            </ListItem>

                            <ListItem itemDivider>
                            <Icon
                            type='FontAwesome'
                                    active
                                    name="phone"
                                    style={{
                                    color: '#16e592',
                                    marginRight:10
                                }}/>
                                <Text>Telephone</Text>
                            </ListItem>
                            <ListItem>
                                <Text>{this.state.companyData.telephone}</Text>
                            </ListItem>

                            <ListItem itemDivider>
                            <Icon
                            type='FontAwesome'
                                    active
                                    name="car"
                                    style={{
                                    color: 'orange',
                                    marginRight:10
                                }}/>
                                <Text>Vehicle category</Text>
                            </ListItem>
                            <ListItem>
                                <Text>{this.state.companyData.vehicles_category.car_name}</Text>
                            </ListItem>
                        </List>

                    </View>

                    
                    {
                  Platform.OS ==="android"?
                 <View>
                 {/* <Text>Ad below</Text> */}
               
                 </View>
                  :null 
               }
               <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-8544273961527808/5623841825" // Test ID, Replace with your-admob-unit-id
  testDevices="EMULATOR"
  onAdFailedToLoad={error => alert(error)}
  onDidFailToReceiveAdWithError={this.bannerError} />
                </ScrollView>
                <View>
                    
             
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
