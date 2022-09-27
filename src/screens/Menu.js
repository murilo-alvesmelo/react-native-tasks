import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { DrawerItem, DrawerItemList, DrawerContentScrollView} from "@react-navigation/drawer";
import { Gravatar } from "react-native-gravatar";

export default props =>{
    console.log(props.navigation)
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        borderBottom: 1,
        borderColor: '#DDD'
    },
    avatar:{
        width: 60,
        height: 60
    }
})