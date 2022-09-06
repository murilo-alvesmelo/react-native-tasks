import React, { Component } from "react";
import { 
    ImageBackground, 
    Text, 
    StyleSheet, 
    TextInput, 
    View,
    TouchableOpacity, 
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert} from "react-native";
import backgorundImage from '../assets/imgs/login.jpg'
import commonStyles from "../commonStyles";

export default class Auth extends Component {
    state={
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        newUser: true
    }

    signinOrSignup = () =>{
        if(this.state.newUser){
            Alert.alert('Sucesso!', 'Criar Conta')
        }else{
            Alert.alert('Sucesso!', 'Logar')
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
                       <TextInput 
                       placeholder="Nome:" 
                       value={this.state.name}
                       style={styles.input}
                       onChangeText={name => this.setState({name})}
                        /> 
                    }
                    <TextInput 
                        placeholder="Email:" 
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({email})}
                    />
                    <TextInput 
                        placeholder="Senha:" 
                        secureTextEntry={true}
                        value={this.state.password}
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                    />
                    {this.state.newUser && 
                       <TextInput 
                       placeholder="Confirmar senha:" 
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
        padding: Platform.OS == 'ios'? 10: 0
    },
    button:{
        backgroundColor: '#080',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: "#FFF",
        fontSize: 20
    }
})