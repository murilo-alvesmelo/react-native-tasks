import axios from "axios";
import React, { Component } from "react";
import { 
    ImageBackground, 
    Text, 
    StyleSheet, 
    TextInput, 
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert} from "react-native";
import backgorundImage from '../assets/imgs/login.jpg'
import { server, showError, showSuccess } from "../common";
import commonStyles from "../commonStyles";
import AuthInput from "../components/AuthInput";
import api from "../service/api";

const initialState ={
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    newUser: false
}

export default class Auth extends React.Component {
    state={
        ...initialState
    }

    signinOrSignup = () =>{
        if(this.state.newUser){
            this.signup()
        }else{
            this.signin() 
        }
    }

    signin = async() =>{
        try {
            const response = await api.post('/login', {
                email: this.state.email,
                password: this.state.password
            })

            api.defaults.headers.common['Authorization'] = `${response.data.token}`

            this.props.navigation.navigate('Home')
        } catch (error) {
            showError(error)
        }
    }

    signup = async() =>{
        try{
            await api.post('/signup', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })
        }catch(err){
             showError(err)
        }
    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={() =>{
                Keyboard.dismiss()
            }}>
            <ImageBackground source={backgorundImage} style={styles.login}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.form}>
                    <Text style={styles.subtitle}>
                        {this.state.newUser ? "Crie a sua conta" : "Informe seus dados"}
                    </Text>
                    {this.state.newUser && 
                       <AuthInput
                       icon='user' 
                       placeholder="Nome:" 
                       value={this.state.name}
                       style={styles.input}
                       onChangeText={name => this.setState({name})}
                        /> 
                    }
                    <AuthInput  
                        icon='at'
                        placeholder="Email:" 
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({email})}
                    />
                    <AuthInput 
                        icon='lock'
                        placeholder="Senha:" 
                        secureTextEntry={true}
                        value={this.state.password}
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                    />
                    {this.state.newUser && 
                       <AuthInput 
                       icon='lock'
                       placeholder="Confirmar senha:" 
                       secureTextEntry={true}
                       value={this.state.confirmPassword}
                       style={styles.input}
                       onChangeText={ confirmPassword=> this.setState({confirmPassword})}
                        /> 
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.newUser ? "Registrar": "Entrar"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={{padding: 10}}
                    onPress={() => this.setState({newUser: !this.state.newUser})}
                >
                    <Text style={styles.buttonText}>{this.state.newUser ? "Voltar": "Cadastrar"}</Text>
                </TouchableOpacity>
            </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
    },
    title:{
        color: commonStyles.colors.secundary,
        fontSize: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle:{
        fontSize: 20,
        color: "#FFF",
        textAlign: 'center',
        marginBottom: 10
    },
    form:{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 20,
        width: '90%'
    },
    input:{
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button:{
        backgroundColor: '#080',
        borderRadius: 25,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: "#FFF",
        fontSize: 20
    }
})