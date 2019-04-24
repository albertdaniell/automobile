import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import FadeInView from './Animation'

export default class Splash extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <FadeInView style={styles.container}>

                <Image
                    source={require("../assets/carlogo.png")}
                    style={{
                    height: 80,
                    width: 160
                }}></Image>

                <Image
                    source={require("../assets/cogs.gif")}
                    style={{
                    height: 25,
                    width: 50
                }}></Image>

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
