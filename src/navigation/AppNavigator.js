import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EventsScreen from '../screens/EventsScreen';
import AddEventScreen from '../screens/AddEventScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Events" component={EventsScreen} />
                <Stack.Screen name="AddEvent" component={AddEventScreen} />
                <Stack.Screen name="Favourites" component={FavouritesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
