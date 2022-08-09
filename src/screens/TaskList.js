import moment from "moment/moment";
import 'moment/locale/pt-br'
import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from "../commonStyles";
import todayImage from '../assets/imgs/today.jpg'
import Task from "../components/Task";
import AddTask from "./AddTask";

export default class TaskList extends Component {
    state ={
        showDoneTasks: true,
        visibleTasks: [],
        showAddTask: true,
        tasks:[
            {
                id: Math.random(),
                desc: "Passar no hotel",
                estimatedAt: new Date().toISOString(),
                doneAt: new Date().toISOString(),
            },
            {
                id: Math.random(),
                desc: "Estudar",
                estimatedAt: new Date().toISOString(),
                doneAt: null,
            },
        ]
    }

    componentDidMount = () =>{
        this.filterTask()
    }

    toggleFilter = () =>{
        this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTask)
    }
    toggleTask = taskId =>{
        const tasks = [...this.state.tasks]
        tasks.forEach(task =>{
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date().toISOString()
            }
        })

        this.setState({ tasks }, this.filterTask)
    }

    filterTask = () =>{
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = function(task){
                return task.doneAt === null
            }
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
    }
    render(){

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return(
            <View style={style.container}>
                <AddTask 
                    isVisible={this.state.showAddTask} 
                    onCancel={() => this.setState({showAddTask: false})}
                />
                <ImageBackground source={todayImage} style={style.backgorund}>
                    <View style={style.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={25} color="#FFF"/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.titleBar}>
                        <Text style={style.title}>Hoje</Text>
                        <Text style={style.subtittle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={style.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/>}
                    />
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
    },
    iconBar:{
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        marginTop: 50,
        marginRight: 20
    }
})