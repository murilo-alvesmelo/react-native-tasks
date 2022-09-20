import React from "react";
import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
                        component={TaskList} 
                        options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator;