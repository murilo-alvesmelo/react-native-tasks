import React, { Component } from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";

import commonStyles from "../commonStyles";

const initialState = {desc: ' '}

export default class AddTask extends Component{

    state = {
        ...initialState
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
                    <Text>Tarefa: </Text>
                    <TextInput 
                        style={style.textInput}
                        placeholder='Informe a descrição'
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })}
                    ></TextInput>
                    <View style={style.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
    }
})