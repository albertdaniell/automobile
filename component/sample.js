import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ListView,
    TouchableHighlight,
    FlatList
} from 'react-native';
import Login from './Login'
import FadeInView from './Animation2'
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
    ListItem
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
            myCompanies:[],
            exapleData:'hahaha',
            users:[],
            diaries:[],
            items:[{
                title:'haha'
            },
            {
                title:'mamama'
            },
            {
                title:'nfiaaattg'
            }
        
        ],

        item2:[{
            "GPS:": "-1.3301986,36.8680358",
            "automation_software": false,
            "physical_address": "Enterprise / Mombasa Rd.",
            "telephone": 733639326,
            "vehicles_category":  {
              "car_name": "Isuzu",
            },
          },
           {
            "GPS": "-1.3010146,36.825812",
            "automation_software": false,
            "company_name": "CMC",
            "physical_address": "Lusaka Road",
            "telephone": 206932000,
            "vehicles_category":  {
              "car_name": "Ford,Suzuki,Mazda",
            },
          }
          
          ],item3:''
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

    loadUsers=()=>{
        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(res=>res.json())
        .then((res)=>{
    
          this.setState({
            users:res
          })
    
          console.log(this.state.users)
    
       
    
        }).catch((error)=>{
          alert(error);
        })
    
      }


    loadDiaries=()=>{
        fetch(`https://diary-f74f3.firebaseio.com/diary.json`)
        .then(res=>res.json() )
        .then((res)=>{
            console.log(res)
    
          this.setState({
            diaries:res
          })
    
         // console.log(this.state.diaries)
    
       
    
        }).catch((error)=>{
          alert(error);
        })
    
      }


    getCompanies = () => {
        let items =this.state.myCompanies

        this.setState({
            itemDataSource: this
                .state
                .itemDataSource
                .cloneWithRows(items)
        })

    }

    componentDidMount() {
      //  this.getData()
        this.checkConnection()
       // this.getCompanies()
        //this.loadUsers()
        //this.loadDiaries()

        
        var testCompanies=firebase.database().ref('companies').orderByChild('company_name')

        testCompanies.on("value",(snapshot)=>{
           // console.log(JSON.stringify(snapshot.val()));

            this.setState({
                item3:JSON.stringify(snapshot)
            })
          //  console.log("dataaaaa")
         //   console.log(this.state.item3)

            // this.setState({
            //     myCompanies:snapshot
            // })

            //console.log(this.state.myCompanies)

           // console.log(snapshot.val().car_name)
           var returnArr=[]
            snapshot.forEach((child)=> {
                //console.log(child.key+": "+child.val());
               // console.log("child key:"+child.key)
returnArr=child.val();

//console.log(returnArr)

                var test2=firebase.database().ref('companies/'+child.key)


                test2.on("value",(snapshot2)=>{
                    //console.log(snapshot2.val())
                    var mycomp=snapshot2.val()

                  //  console.log(snapshot2.telephone)

                  const fbObject = snapshot.val();
const newArr = Object.keys(fbObject).map((key) => {
  fbObject[key].id = key;
  return fbObject[key];
});

console.log(newArr)

                this.setState({
                    myCompanies:newArr
                })
//console.log(this.state.myCompanies)
               

                   
                })
              });


            

        }),(error)=>{
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
        // alert(0)
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

                // alert("not connected");
            }
        });
    }



    getData=()=> {

        //get data using the api

        fetch('https://diary-f74f3.firebaseio.com/blog.json')
        .then((result)=>{
            
            return result.json()
            
        }).then((data)=>{
            let companies=data
            console.log(companies)
            this.setState({
                myCompanies:companies
            })

           console.log(this.state.myCompanies)
        }).catch((error)=>{
            console.log(error)
        })



        // var ref = firebase
        //     .database()
        //     .ref('companies/123456');

        //     // ref.push({
               
        //     // }).then((ref)=>{
        //     //     console.log(ref.key)

        //     // })

        // ref.on("value", function (snapshot) {

        //     var newCompany = snapshot.val();

        //     console.log('we are getting data')
        //     //console.log(newCompany.automative_software)
        //    //console.log(snapshot.val());
        //    //console.log(snapshot.val().GPS)
           
           
           
         
        // } , function (error) {
        //     console.log("Error: " + error.code);
        // }
        // );

 

        
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
    render() {
        return (
            <FadeInView
                style={{
                height: '100%'
            }}
                onPress={this.toggleMenuOff}>

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
                    <Body style={{
                        padding: 10
                    }}>
                        <Text>Home</Text>
                    </Body>
                    <Right></Right>
                </Header>

                <FlatList
  data={this.state.myCompanies}
  renderItem={({item}) => 

            <ListItem avatar>
              <Left>
          
              </Left>
              <Body>
        <TouchableOpacity>
        <Text>{item.company_name}</Text>
                <Text note>{item.physical_address}</Text>
        </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
        

  }
/>


    {/* <TouchableOpacity style={{borderBottomColor:'#efefef',borderBottomWidth:1}}>
    <Text style={{padding:20}}>{item.company_name}</Text>
    </TouchableOpacity> */}
 {/* <Text>Companies : {this.state.myCompanies}</Text>  */}

{/*           
                <List>
<FlatList
  data={this.state.diaries}
  renderItem={({item}) => 
  <ListItem >
  <Body>
  <Text >{item.name}</Text>
                <Text note>{item.textarea}</Text>
              </Body>
 </ListItem>
  }

/>


 </List> */}


    

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

                    {/* <TouchableOpacity
                        style={{
                        marginTop: 20,
                        backgroundColor: '#ccc',
                        padding: 20,
                        alignItems: 'center'
                    }}
                        onPress={() => this.props.navigation.navigate('Trialscreen')}>
                        <Text>Navigate to another screen</Text>
                    </TouchableOpacity> */}
{/* 
                    <TouchableOpacity
                        style={{
                        marginTop: 20,
                        backgroundColor: '#ccc',
                        padding: 20,
                        alignItems: 'center'
                    }}
                        onPress={this.toggleMenu}>
                        <Text>Open Menu</Text>
                    </TouchableOpacity> */}
                    <ListView dataSource={this.state.itemDataSource} renderRow={this.renderRow}></ListView>

                     <TouchableOpacity
                        style={{
                        marginTop: 20,
                        backgroundColor: '#ccc',
                        padding: 20,
                        alignItems: 'center'
                    }}
                        onPress={this.props.logOutFunc}>
                        <Text>LogOut</Text>
                    </TouchableOpacity> 
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
