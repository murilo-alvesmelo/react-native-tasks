import React, { Component } from "react";
import { Platform, Modal, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";
import DateTimerPicker from '@react-native-community/datetimepicker'
import moment from "moment/moment";

import commonStyles from "../commonStyles";

const initialState = { desc: ' ', date: new Date(), showDatePicker: false}

export default class AddTask extends Component{

    state = {
        ...initialState
    }


    save = () =>{
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }
        
        if(this.props.onSave(newTask))
            this.props.onSave(newTask)
        this.setState({ ...initialState })
    }
    getDateTimePicker = () =>{
        let datePicker =  <DateTimerPicker
                    style={style.dateIos}
                    value={this.state.date}
                    onChange={(_, date) => this.setState({ date, showDatePicker: false})}
                    mode='date'
                />

            const dateAndroid = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY') 
            if(Platform.OS === 'android'){
                datePicker = (
                    <View>
                        <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                            <Text style={style.date}>
                             {dateAndroid}    
                            </Text>
                        </TouchableOpacity>
                        {this.state.showDatePicker && datePicker}
                    </View>
                )
            }
        return datePicker
    }

    render(){
        return(
            <Modal 
                transparent={true} 
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}
                >
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
                <View style={style.container}>
                    <Text style={style.header}>Adicionar tarefa</Text>
                    <Text style={style.subTitle}>Tarefa: </Text>
                    <TextInput 
                        style={style.textInput}
                        placeholder='Informe a descri????o'
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })}
                    />
                    {this.getDateTimePicker()}
                    <View style={style.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={style.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}
                >
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
} 

const style = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header:{
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        fontSize: 18,
        textAlign: 'center',
        padding: 15
    },
    subTitle:{
        fontSize: 15,
        marginLeft: 10,
        padding: 5
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: "center",
    },
    button:{
        margin: 20,
        color: commonStyles.colors.today
    },
    textInput: {
        height: 40,
        marginTop: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    },
    date:{
         fontSize: 20,
         marginLeft: 15
    },
    dateIos:{
        marginRight: 10
    }
})