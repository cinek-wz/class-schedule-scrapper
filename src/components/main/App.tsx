import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CourseSelect from '@components/views/CourseSelect';
import GroupSelect from '@components/views/GroupSelect';
import Schedule from '@components/views/Schedule';

const Stack = createNativeStackNavigator();

const App = () => 
{
    const [storageExists, setStorageExists] = useState(null);

    useEffect(() => 
    {
        /*AsyncStorage.getItem('@grouplink').then((value) => 
        {
            console.log(`STORAGE: ${value}`);
            if(value != null)
            {
                setStorageExists(true);
            }
        });*/
        setStorageExists(false);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CourseSelect" component={CourseSelect} options={{ title: "Wybór kierunku" }}/>
                <Stack.Screen name="GroupSelect" component={GroupSelect} options={{ title: "Wybór grupy" }}/>
                <Stack.Screen name="Schedule" component={Schedule} options={{ title: "Plan zajęć", headerLeft: () => { return null; } }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
