import React from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { DrawerItem, DrawerItemList, DrawerContentScrollView} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import api from "../service/api";

export default props =>{

    const logout = () =>{
        delete api.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')

        props.navigation.navigate('Auth')
    }
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <TouchableOpacity style={styles.icon} onPress={logout}>
                    <Icon name="sign-out" size={30} color='#800'/>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props}/>
            <DrawerItem label='Log out'/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottom: 1,
        borderColor: '#DDD',
        justifyContent: "space-between"
    },
    title:{
        fontSize: 30,
        paddingTop: 10,
        margin: 10
    },
    icon:{
        marginTop: 15,
        justifyContent: 'center',
    }
})