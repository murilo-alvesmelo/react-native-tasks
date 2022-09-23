import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import week from '../src/assets/imgs/week.jpg'
import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import { TouchableOpacity, Text } from "react-native";

const Drawer = createDrawerNavigator();

class MyDrawer extends React.Component{
    render(){
        return(
            <Drawer.Navigator initialRouteName="Hoje">
                <Drawer.Screen name="Hoje" options={{headerShown: false}}>
                    {()=> <TaskList title='Hoje' daysAhead={0} {...this.props}/>}
                </Drawer.Screen>
                <Drawer.Screen name="Semana" options={{headerShown: false}}>
                    {()=> <TaskList title='Semana' daysAhead={7} {...this.props}/>}
                </Drawer.Screen>
                <Drawer.Screen name="Mês" options={{headerShown: false}}>
                    {()=> <TaskList title='Mês'{...this.props}/>}
                </Drawer.Screen>
            </Drawer.Navigator>
        )
    }
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