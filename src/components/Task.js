import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";

function getCheckView(doneAt){
    if (doneAt != null){
        return(
            <View style={style.done}>
            </View>
        )
    }else{
        return(<View style={style.pending}></View>)
    }
}

export default props =>{
    return(
        <View style={style.container}>
            <View style={style.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text>{props.desc}</Text>
                <Text>{props.estimatAt + ""}</Text>
                <Text>{props.doneAt + ""}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: 'green'
    }
})