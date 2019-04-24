import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import Login from './Login'
import Opening from './Openingpage'
import {withTheme} from 'react-native-elements';
import FadeInView from './Animation'

export default class Screen2 extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <FadeInView style={styles.container}>

                <ImageBackground
                    source={require("../assets/cars.jpg")}
                    style={{
                    height: '100%',
                    width: '100%'
                }}>
                    <View
                        style={{
                        padding: 10,
                        backgroundColor: 'rgba(255,255,255,.95)',
                        height: '100%',
                        marginTop: -20,
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>

                        <Image
                            source={require("../assets/carlogo.png")}
                            style={{
                            height: 80,
                            width: 160
                        }}></Image>
                        <Text
                            style={{
                            fontWeight: 'bold',
                            fontSize: 18
                        }}>
                            WELCOME TO AUTOMOTORS APP
                        </Text>
                    </View>
                </ImageBackground>
                <TouchableOpacity
                    style={{
                    padding: 20,
                    backgroundColor: 'orange',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }}
                    onPress={this.props.loginPageHandler}>
                    <Text
                        style={{
                        color: 'white',
                        textTransform: 'uppercase'
                    }}>G  E  T     S  T  A  R  T  E  D</Text>
                </TouchableOpacity>

            </FadeInView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
});
