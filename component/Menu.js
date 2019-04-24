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
import FadeInView from './Animation2'

export default class Menu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <FadeInView style={styles.container} >

                <View style={{color:'white',backgroundColor:'white',padding:10,borderRadius:10,marginTop:100}} onPress={this.props.toggleMenuOff}>
                <Text style={{color:'black'}}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ratione tempora eius, assumenda dignissimos nam cupiditate aliquam libero voluptatum quo sint sit quam quibusdam rerum pariatur ad facere delectus natus!
                </Text>

                </View>

            </FadeInView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'absolute',
        zIndex:10,
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0,0,0,.8)',
        padding:20,
        
    }
});
