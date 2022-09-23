import moment from "moment/moment";
import 'moment/locale/pt-br'
import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    Text, 
    ImageBackground, 
    TouchableOpacity,
    Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { showError, showSuccess } from "../common";
import api from "../service/api";
import commonStyles from "../commonStyles";
import todayImage from '../assets/imgs/today.jpg'
import weekImage from '../assets/imgs/week.jpg'
import monthImage from '../assets/imgs/month.jpg'
import Task from "../components/Task";
import AddTask from "./AddTask";
import { DrawerActions } from "@react-navigation/native";


const initialState = {
    showDoneTasks: true,
    visibleTasks: [],
    showAddTask: false,
    tasks: []
}
export default class TaskList extends React.Component {
    state ={
        ...initialState
    }
 
    componentDidMount = async () =>{
        const response = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(response) || initialState
        this.setState({showDoneTasks: savedState.showDoneTasks}, this.filterTask)

        this.loadTasks()
    }

    loadTasks = async () =>{
        try {
            const maxDate = moment()
                .add({days: this.props.daysAhead})
                .format('YYYY-MM-DD 23:59:59')
            const response = await api.get(`/tasks?date=${maxDate}`)
            this.setState({tasks: response.data}, this.filterTask)
        } catch (error) {
            showError(error)
        }
    }

    toggleFilter = () =>{
        this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTask)
    }
    toggleTask = async taskId =>{
        try {
            await api.put(`/tasks/${taskId}`)
            this.loadTasks()
        } catch (error) {
            showError(error)
        }
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
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    addTask = async newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dado Invalidos', 'Descrição não informada') 
            return
        }

        try {
            await api.post('/tasks',{
                desc: newTask.desc,
                estimatedAt: newTask.date,
                doneAt: null
            })
            
            this.setState({showAddTask: false}, this.loadTasks)
        } catch (error) {
            showError(error)
        }

    }

    deleteTask = async id =>{
        try {
            await api.delete(`/tasks/${id}`)
            this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }

    getImage = () =>{
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 7: return weekImage
            default : return monthImage 
        }
    } 

    getColor = () =>{
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 7: return commonStyles.colors.week
            default : return commonStyles.colors.month
        }
    } 

    render(){

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return(
            <View style={style.container}>
                <AddTask 
                    isVisible={this.state.showAddTask} 
                    onCancel={() => this.setState({showAddTask: false})}
                    onSave={this.addTask}
                />
                <ImageBackground source={this.getImage()} style={style.backgorund}>
                    <View style={style.iconBar}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <Icon name='bars' size={25} color="#FFF"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={25} color="#FFF"/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.titleBar}>
                        <Text style={style.title}>{this.props.title}</Text>
                        <Text style={style.subtittle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={style.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>}
                    />
                </View>
                <TouchableOpacity 
                style={[style.button, {backgroundColor: this.getColor()}]} 
                activeOpacity={0.7} 
                onPress={() => this.setState({ showAddTask: true })}
                >
                    <Icon name="plus" size={25} color={commonStyles.colors.secundary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1,
    },
    backgorund:{
        flex: 3,
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
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 50,
        margin: 10
    },
    button:{
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',
    }
})