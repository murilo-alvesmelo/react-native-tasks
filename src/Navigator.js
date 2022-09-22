import React from "react";
import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import week from '../src/assets/imgs/week.jpg'

const Drawer = createDrawerNavigator();

function MyDrawer(){
    return(
        <Drawer.Navigator initialRouteName="Hoje">
            <Drawer.Screen name="Hoje" options={{headerShown: false}}>
                {()=> <TaskList title='Hoje'/>}
            </Drawer.Screen>
            <Drawer.Screen name="Semana" options={{headerShown: false}}>
                {()=> <TaskList title='Semana' image={{flex: 4}}/>}
            </Drawer.Screen>
            <Drawer.Screen name="Mês" options={{headerShown: false}}>
                {()=> <TaskList title='Mês'/>}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

const Stack = createNativeStackNavigator()

class Navigator extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Auth" 
                        component={Auth} 
                        options={{headerShown: false}}/>

                    <Stack.Screen 
                        name="Home" 
                        component={MyDrawer} 
                        options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


export default Navigator;