import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './component/Homescreen'
import Screen2 from './component/Screen2'
import Opening from './component/Openingpage'
import Trialscreen from './component/TrialPage'
import compDetails from './component/Viewcompanydetails'
import Account from './component/Account'
import Appmapview from './component/Appmapview'
import About from './component/About'
import Profile from './component/Profile'
import Contact from './component/Contact'

const MainNavigator = createStackNavigator({
    Contact: {
        screen: Contact
    },

    Home: {
        screen: HomeScreen
    },
    Screen2: {
        screen: Screen2
    },
    Opening: {
        screen: Opening
    },
    Trialscreen: {
        screen: Trialscreen
    },
    compDetails: {
        screen: compDetails
    },
    Account: {
        screen: Account
    },
    Appmapview: {
        screen: Appmapview
    },
    About: {
        screen: About
    },
    Profile: {
        screen: Profile
    }
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
