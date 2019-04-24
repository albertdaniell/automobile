import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ListView,
    TouchableHighlight,
    FlatList,
    Platform
} from 'react-native';
import Login from './Login'
import FadeInView from './Animation2'
import Drawer from 'react-native-drawer'
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
import firebase from 'firebase'
import Menu from './Menu'

export default class Opening extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };
    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        })

        this.state = {
            internetConnected: true,
            menuToggled: false,
            itemDataSource: ds,
            myCompanies: [],
            myCompaniesLoaded: false,
            isTyping:false,
            searchResult:[],
            searchCompany:'',
            searchKey:'',
            searchInput:'a',
            email:'',
            username:'',
            
        }

        this.toggleMenuOff = this
            .toggleMenuOff
            .bind(this)

        this.renderRow = this
            .renderRow
            .bind(this);
        this.pressRow = this
            .pressRow
            .bind(this)
    }

    flatListPress = (value) => {
        //navigate to another page
        console.log(value)
    }

    triggerIsTyping=()=>{
    this.setState({
        isTyping:true
    })
this.searchCompany()
}

    exitIsTyping=()=>{
        this.setState({
            isTyping:false
        })}

    getCompanies = () => {
        let items = this.state.myCompanies

        this.setState({
            itemDataSource: this
                .state
                .itemDataSource
                .cloneWithRows(items)
        })

    }

    componentDidMount() {
        //  this.getData()

        //this.searchCompany()
        
        this.checkConnection()
        this.getUserDetails()
        // this.getCompanies() this.loadUsers() this.loadDiaries()

        var testCompanies = firebase
                .database()
                .ref('companies')
                .orderByChild('company_name')

            testCompanies.on("value", (snapshot) => {
                // console.log(JSON.stringify(snapshot.val()));

                this.setState({
                    item3: JSON.stringify(snapshot)
                })

                //  console.log("dataaaaa")   console.log(this.state.item3) this.setState({
                // myCompanies:snapshot }) console.log(this.state.myCompanies)
                // console.log(snapshot.val().car_name)
                var returnArr = []
                snapshot.forEach((child) => {
                    //console.log(child.key+": "+child.val()); console.log("child key:"+child.key)
                    returnArr = child.val();

                    //console.log(returnArr)

                    var test2 = firebase
                        .database()
                        .ref('companies/' + child.key)

                    test2.on("value", (snapshot2) => {
                        //console.log(snapshot2.val())
                        var mycomp = snapshot2.val()
                        //  console.log(snapshot2.key)  console.log(snapshot2.telephone)

                        const fbObject = snapshot.val();
                        const newArr = Object
                            .keys(fbObject)
                            .map((key) => {
                                fbObject[key].id = key;
                                return fbObject[key];
                            });

                        //console.log(fbObject) console.log(newArr)

                        this.setState({myCompaniesLoaded: true, myCompanies: newArr})
                        //console.log(this.state.myCompanies)

                    })
                });

            }),
            (error) => {
                console.log(error)
            }
        }

        componentWillMount() {
            this.getCompanies()
        }

        toggleMenu = () => {
            this.setState({menuToggled: true})
        }

        toggleMenuOff = () => {
            alert(0)
            this.setState({menuToggled: false})
        }

        checkConnection = () => {

            var connectedRef = firebase
                .database()
                .ref(".info/connected");

            connectedRef.on("value", function (snap) {
                if (snap.val() === true) {
                    internetConnected = false
                    // alert("connected");
                } else {
                    internetConnected = true

                }
            });
        }

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

        getData = () => {

            //get data using the api

            fetch('https://diary-f74f3.firebaseio.com/blog.json').then((result) => {

                return result.json()

            }).then((data) => {
                let companies = data
                console.log(companies)
                this.setState({myCompanies: companies})

                console.log(this.state.myCompanies)
            }).catch((error) => {
                console.log(error)
            })

        }

        searchCompany=()=>{
            var searchInput="f"
           var searchref=firebase.database().ref('companies/')
            searchref.orderByChild('company_name').equalTo(this.state.searchInput).on("value", (snapshot) =>{
                //console.log(snapshot.val());
               // alert(snapshot.val())

            //    const fbObject = snapshot.val();
            //    const newArr = Object
            //        .keys(fbObject)
            //        .map((key) => {
            //            fbObject[key].id = key;
            //            return fbObject[key];
            //        });

          

            //     this.setState({
                        
            //         //searchCompanyDa:data.company_name,
                   
            //         searchResult:newArr,
            //     })

               // alert(this.state.searchResult.id)

                snapshot.forEach((data) =>{
                   // alert(data.key)
                  
                    console.log(data.key);

                    this.setState({
                        searchKey:data.key
                    })

                   // alert(data.key)
                    var searchref2=firebase.database().ref('companies/'+`${data.key}`)
                    searchref2.on("value",(snapshot2)=>{
                      //  alert(snapshot2.val().company_name)

                        this.setState({
                            searchResult:snapshot2.val()
                        })


                    });

                    
                });
            }),error=>{
                console.log(error)
            };

        }

        pressRow(item) {
            console.log(item)
        }
        renderRow(item) {
            return (
                <TouchableHighlight onPress={() => this.pressRow(item)}>
                    <View
                        style={{
                        padding: 10,
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <Text>{item.title}</Text>

                    </View>

                </TouchableHighlight>

            );

        }

        closeControlPanel = () => {
            this._drawer.close()
          };
          openControlPanel = () => {
            this._drawer.open()
          };
        render() {
            return (
      <Drawer
      tapToClose={true}
  openDrawerOffset={0.25} // 30% gap on the right side of drawer
  panCloseMask={0.2}
  closedDrawerOffset={-3}
  type="displace"
  tweenHandler={(ratio) => ({
    main: { opacity:(2-ratio)/2 }
  })}
      style={styles.drawer}
        ref={(ref) => this._drawer = ref}
        content={<View style={{backgroundColor:'rgba(244,244,244,1)',height:'100%'}}>
            <View style={{marginTop:20,}}>
          
             

                <List>
                <ListItem itemDivider style={{backgroundColor:'white'}}>
                <Image source={require('../assets/user.png')} style={{height:60,width:60,paddingLeft:10,marginLeft:0}}></Image>

<View style={{padding:20}}>

<Text>{this.state.email}</Text>
</View>

         </ListItem> 
                    <TouchableOpacity style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}>

                            <Text>Home</Text>
                        </TouchableOpacity>
               

                        <TouchableOpacity
                        style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}
                        onPress={() => this.props.navigation.navigate('Account')}

                        >
                            <Text>Setting</Text>
                        </TouchableOpacity>

                    

                        <TouchableOpacity
                        style={{backfaceColor:'red',width:'100%',padding:20,borderBottomColor:'#ccc',borderBottomWidth:1}}
                         onPress={this.props.logOutFunc}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                   
                </List>

              
            </View>
            <Text style={{position:'absolute',bottom:0,padding:10,fontStyle:'italic'}}>Automobile 2019</Text>

            </View>}
        >
        <FadeInView
                    style={{
                    height: '100%',
                    backgroundColor:'white'
                }}
                    onPress={this.toggleMenuOff}>

                  

                    {
                        Platform.OS==="android"?

                      <View>
                      <View
                        style={{
                        backgroundColor: '#b57800',
                        padding: 10
                    }}></View>

                      <Header
                        style={{
                        backgroundColor: 'orange',
                        opacity: .8
                    }}>
                        <Left>
                            <Image
                                source={require('../assets/carlogo.png')}
                                style={{
                                height: 20,
                                width: 40,
                                marginLeft: 10
                            }}></Image>
                        </Left>
                        <Body
                            style={{
                            padding: 10
                        }}>
                            <Text
                                style={{
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>Home</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity
                            onPress={this.openControlPanel}
                            >
                            <Icon  type="FontAwesome" name='bars' style={{color:'white',marginRight:10}}></Icon>
                            </TouchableOpacity>
                        </Right>
                    </Header>

                    <Item style={{padding:5,marginBottom:10,}}>
                        <Icon name="ios-search" style={{marginLeft:20}}/>
                        <Input
                        style={{borderWidth:1,borderColor:'#ccc',borderRadius:20,height:30,backgroundColor:'white'}}
                        onChangeText={(searchInput)=>this.setState({searchInput})}
                        onKeyPress={this.triggerIsTyping}
                        onBlur={this.exitIsTyping}
                        multiline={false}
                        onSubmitEditing={this.searchCompany}
                        returnKeyType='done'
                        onChange={this.searchCompany}
                
                        
                       
                        
                         placeholder="Search"/>
                       {
                           this.state.isTyping? <Icon onPress={this.exitIsTyping} name="times" type="FontAwesome"></Icon>:
                           null
                       }
                    </Item>
                      </View>

                    :
                   <View style={{borderBottomColor:'#efefef',borderBottomWidth:1,marginBottom:10}}>
                   <View
                        style={{
                        backgroundColor: '#ccc',
                        padding: 10
                    }}></View>
                   <Header
                        style={{
                            marginBottom:10,
                            borderBottomColor:'transparent',
                            backgroundColor:'white'
                        
                    }}>
                        <Left>
                            <Image
                                source={require('../assets/carlogo.png')}
                                style={{
                                height: 20,
                                width: 40,
                                marginLeft: 10
                            }}></Image>
                        </Left>
                        <Body
                            style={{
                            padding: 10
                        }}>
                        
                        </Body>
                        <Right>
                            <TouchableOpacity
                            onPress={this.openControlPanel}
                            >
                            <Icon  type="FontAwesome" name='bars' style={{color:'black',marginRight:10}}></Icon>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Text
                                style={{
                                fontSize: 35,
                                marginLeft: 20,
                                fontWeight: 'bold',
                                marginBottom:10
                            }}>Home</Text>

                            <Item style={{padding:0,marginBottom:10,backgroundColor:'#ededed',borderBottomColor:'transparent',marginLeft:15,marginRight:15,marginBottom:10,borderRadius:5}}>
                            <Icon name="ios-search" style={{marginLeft:10,color:'orange'}}/>
                       
                        <Input
                        style={{height:35,}}
                        placeholderTextColor='orange'
                        onChangeText={(searchInput)=>this.setState({searchInput})}
                        onKeyPress={this.triggerIsTyping}
                        onBlur={this.exitIsTyping}
                        multiline={false}
                        onSubmitEditing={this.searchCompany}
                        returnKeyType='done'
                        onChange={this.searchCompany}
                
                        
                       
                        
                         placeholder="Search"/>
                       {
                           this.state.isTyping? <Icon onPress={this.exitIsTyping} name="times" type="FontAwesome"></Icon>:
                           null
                       }
                    </Item>
                   </View>
                    }

                   

                

                    {!this.state.myCompaniesLoaded
                        ? <View
                                style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <ActivityIndicator size="small" color="orange"/>
                                <Text
                                    style={{
                                    color: 'grey',
                                    marginTop:10
                                }}>LOADING...</Text>
                            </View>
                        : this.state.isTyping?
                        <View onPress={this.exitIsTyping}>
                           <ListItem avatar>
                               <Left>

                               </Left>

                               <Body>
                                   <TouchableOpacity
                                  
                                   onPress={() => this.props.navigation.navigate('compDetails', {companyId: this.state.searchKey})}

                                   >
                                       <Text>{this.state.searchResult.company_name}</Text>
                                       <Text note>{this.state.searchResult.physical_address}</Text>
                                   </TouchableOpacity>

                               </Body>


                           </ListItem>

                       
                        </View>
                        :
                        <FlatList
                            data={this.state.myCompanies}
                            renderItem={({item}) => <ListItem avatar>
                            <Left>
                                <Icon
                                    name="building"
                                    type='FontAwesome'
                                    style={{
                                    borderRadius: 100,
                                    borderColor: '#ccc',
                                    brderWidth: 1
                                }}/>
                            </Left>
                            <Body>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('compDetails', {companyId: item.id})}>
                                    <Text
                                        style={{
                                        marginBottom: 5
                                    }}>{item.company_name}</Text>
                                    <Text note numberOfLines={1} selectionColor='orange'>{item.physical_address}</Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>}/>
}

                    {this.state.menuToggled
                        ? <Menu toggleMenuOff={this.toggleMenuOff}></Menu>
                        : null
}

                    {!this.state.internetConnected
                        ? <View
                                style={{
                                backgroundColor: 'red',
                                marginTop: 22,
                                alignItems: 'center',
                                padding: 5
                            }}>
                                <Text
                                    style={{
                                    color: 'white'
                                }}>Internet Connection error</Text>
                            </View>

                        : null
}

                    <View style={{
                        padding: 10
                    }}>

                        <ListView dataSource={this.state.itemDataSource} renderRow={this.renderRow}></ListView>
                        {/*
                        <TouchableOpacity
                            style={{
                            marginTop: 20,
                            backgroundColor: '#ccc',
                            padding: 20,
                            alignItems: 'center'
                        }}
                            onPress={this.props.logOutFunc}>
                            <Text>LogOut</Text>
                        </TouchableOpacity> */}
                    </View>

                </FadeInView> 
      </Drawer>


                
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
        drawer:{
            shadowColor: '#000000', shadowOpacity: 0.4, shadowRadius: 3,backgroundColor:'red'
        }
    });
