import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import Menu from "./screens/Menu";
import AuthOrApp from "./screens/AuthOrApp";


const Drawer = createDrawerNavigator();

class MyDrawer extends React.Component{
    render(){
        const email = this.props.route.params
        return(
            <Drawer.Navigator
                drawerContent={Menu}
                initialRouteName='Hoje'
                screenOptions={{
                    drawerLabelStyle: {
                        fontWeight: 'normal',
                        fontSize: 20
                    },
                    
                }}
            >
                <Drawer.Screen name='Hoje' options={{headerShown: false}}>
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
                <Stack.Navigator initialRouteName="AuthOrApp">
                    <Stack.Screen
                        name="AuthOrApp"
                        component={AuthOrApp}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen 
                        name="Auth" 
                        component={Auth} 
                        options={{headerShown: false}}/>

                    <Stack.Screen 
                        name="Home" 
                        component={MyDrawer} 
                        options={{headerShown: false}}
                        />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


export default Navigator;

/* initialRouteName='Hoje'
            screenOptions={{
                drawerLabelStyle:{
                    fontWeight: 'normal',
                    fontSize: 20
                }
            }} */