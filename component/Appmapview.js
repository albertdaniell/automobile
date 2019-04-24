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
import { Speech } from 'expo';
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
import Splash from './Spash'
import firebase from 'firebase'
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import MapView from 'react-native-maps';



export default class compDetails extends React.Component {

    componentDidMount(){

        const {navigation} = this.props;
        const companyName = navigation.getParam('companyName', 'companyName');
        const lat=navigation.getParam('lat','defaullat')
        const long=navigation.getParam('long','defaultlong')


        this.setState({
            compName:companyName,
            
            dataLoaded:true
       

        })


        setTimeout(()=>{
            this.setState({
                showMarker:true
            })

        },2000)

        Speech.speak("Viewing location for "+companyName,{pitch:1,rate:0.85})


    }
    

    static navigationOptions = {
        title:'Map',
        headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: '#fff',
    };

    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const companyName = navigation.getParam('companyName', 'companyName');
        const lat=navigation.getParam('lat','defaullat')
        const long=navigation.getParam('long','defaultlong')
        

       
        this.state = {

            compName:'hHAHA',
         
            longi:long,
            lati:lat,
            dataLoaded:false,
            showMarker:false,
            defaultlat:-1.2982074,
            defaultlong:36.8344994,
            userLocation:false

            
            
        }
        

    }

    showUserLocation=()=>{
        this.setState({
            userLocation:!this.state.userLocation

        })

        
    }



    render() {

        
        const {navigate} = this.props.navigation;


        return (

            <View>
                <TouchableOpacity 
                style={{position:'absolute',top:30,zIndex:10,left:10,backgroundColor:'rgba(0,0,0,.5)',alighItems:'center',padding:10}}
                >
                    <Text style={{color:'white'}}>{this.state.compName}</Text>
                </TouchableOpacity>

              {
                  this.state.userLocation?
                  <TouchableOpacity 
                onPress={this.showUserLocation}
                style={{position:'absolute',bottom:30,zIndex:10,right:10,backgroundColor:'rgba(244, 78, 66,.7)',alighItems:'center',padding:10,borderRadius:5}}
                >
                <Icon type="FontAwesome" name='location-arrow' style={{color:'green'}}></Icon>
                </TouchableOpacity>
                  
                  :
                  <TouchableOpacity 
                onPress={this.showUserLocation}
                style={{position:'absolute',bottom:30,zIndex:10,right:10,backgroundColor:'rgba(255,255,255,.9)',alighItems:'center',padding:10,borderRadius:5}}
                >
                <Icon type="FontAwesome" name='location-arrow' style={{color:'grey'}}></Icon>
                </TouchableOpacity>
              }

                

                <MapView
                followsUserLocation={this.state.userLocation}
                showsUserLocation
                showsMyLocationButton
                showsCompass
                showsBuildings
                showsTraffic
                showsScale
                showsIndoorLevelPicker
                zoomControlEnabled
                rotateEnabled
                pitchEnabled
                loadingEnabled
                zoomEnabled
               

                style={{height:'100%',width:'100%'}}
                    initialRegion={{
                    latitude: this.state.lati,
                    longitude: this.state.longi,
                    latitudeDelta:0.0922,
                    longitudeDelta:0.0421
                    
                }}>

                {
                    this.state.showMarker?
                    
                    
                    <MapView.Marker
                    coordinate={{
                        latitude:this.state.lati,
                    longitude: this.state.longi,
                    }}

                    title={this.state.compName}
                    >

                    </MapView.Marker>
                    :null
                }
       

            
                
                </MapView>

                {
                    Platform.OS==="android"?
                    console.log("Android phone")
                    :
                    console.log("Iphone")

                }

                
            </View>

        )

    }

    

}