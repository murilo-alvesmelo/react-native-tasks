import moment from "moment/moment";
import 'moment/locale/pt-br'
import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground} from "react-native";

import commonStyles from "../commonStyles";
import todayImage from '../assets/imgs/today.jpg'
import Task from "../components/Task";

export default class TaskList extends Component {
    
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={style.container}>
                <ImageBackground source={todayImage} style={style.backgorund}>
                    <View style={style.titleBar}>
                        <Text style={style.title}>Hoje</Text>
                        <Text style={style.subtittle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={style.taskList}>
                    <Task desc='Comprar bomba' estimatAt='18hrs' doneAt={null}/>
                    <Task desc='Comprar bomba' estimatAt='18hrs' doneAt='Amanha'/>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1
    },
    backgorund:{
        flex: 3
    },
    taskList:{
        flex: 7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    title:{
        fontSize: 45,
        color: commonStyles.colors.secundary,
        marginLeft: 20,
        marginBottom: 20 
    },
    subtittle:{
        color: commonStyles.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    }
})