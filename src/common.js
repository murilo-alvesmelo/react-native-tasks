import { Platform, Alert } from "react-native"


const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' : 'http://10.0.0.2:3000'

function showError(err){
    if(err.response && err.response.data){
       Alert.alert('Ops! Ocorreu um problema', ` Mensagem: ${err.data}`)
    }else{
        Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
    }
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export {showError, showSuccess, server}