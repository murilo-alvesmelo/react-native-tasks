import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/api";
import { showError } from "../common";

export default class AuthOrApp extends React.Component{
    componentDidMount= async()=>{
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        try {
            userData = JSON.parse(userDataJson)
        } catch (error) {
            showError(error)
        }

        if(userData && userData.token){
            api.defaults.headers.common['Authorization'] = `bearer ${userData.token}`

            this.props.navigation.navigate('Auth')
        }else{
            this.props.navigation.navigate('Auth', userData)
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})