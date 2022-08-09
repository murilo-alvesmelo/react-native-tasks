import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";

import commonStyles from "../commonStyles";
import moment from "moment/moment";
import { Icon } from "@rneui/themed";

function getCheckView(doneAt){
    if (doneAt != null){
        return(
            <View style={style.done}>
                <Icon name="check" size={20} color='#FFF'/>
            </View>
        )
    }else{
        return(<View style={style.pending}></View>)
    }
}

export default props =>{

    const date = props.doneAt ? props.doneAt : props.estimatedAt
    const formattedDate = moment().locale('pt-br').format('ddd, D [de] MMMM')
    const doneOrNotStyle =  props.doneAt != null ? 
        {textDecorationLine: 'line-through'} : {}

    return(
        <View style={style.container}>
            <TouchableWithoutFeedback
                onPress={() => props.toggleTask(props.id)}
            >
                <View style={style.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[style.descricao, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={style.date}>{date}</Text>
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
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descricao:{
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date:{
        color: commonStyles.colors.subText
    }
})