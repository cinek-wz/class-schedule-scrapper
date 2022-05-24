import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@components/views/Template';
import CourseSelect from '@components/views/CourseSelect';
import GroupSelect from '@components/views/GroupSelect';

const Stack = createNativeStackNavigator();

/*
<SafeAreaView style={ {backgroundColor: Colors.lighter }}>
<StatusBar barStyle={'light-content'} />

</SafeAreaView>*/

const App = () => 
{
    useEffect(() => 
    {

    });

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={CourseSelect} options={{ title: "Wybór kierunku" }}/>
                <Stack.Screen name="GroupSelect" component={GroupSelect} options={{ title: "Wybór grupy" }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
