import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/Navigator';
import Auth from './src/screens/Auth';
import TaskList from './src/screens/TaskList';

export default function App() {
  return (
    <Navigator/>
  );
}

