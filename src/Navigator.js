import React from "react";
import { View, Text } from "react-native";
import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Authenticate(){
    return(
        <Auth/>
    )
}

function Home(){
    return(
        <TaskList/>
    )
}

const Stack = createNativeStackNavigator();

function Navigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name="Auth" component={Authenticate} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;