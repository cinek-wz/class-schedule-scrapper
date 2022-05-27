import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CourseSelect from '@components/views/CourseSelect';
import GroupSelect from '@components/views/GroupSelect';
import Schedule from '@components/views/Schedule';

const Stack = createNativeStackNavigator();

export const ScheduleContext = createContext(null);

const App = () => 
{
    const [scheduleState, dispatch] = useReducer((prevState, action) => 
    {
        switch(action.type)
        {
            case 'UPDATE':
                return {
                    ...prevState,
                    groupname: action.name,
                    groupurl: action.url,
                    isLoading: false
                }
            case 'CLEAR':
                return {
                    ...prevState,
                    groupname: null,
                    groupurl: null,
                    isLoading: false
                }
        }
    }, 
    {
        isLoading: true,
        groupname: null,
        groupurl: null
    });

    useEffect(() => 
    {
        AsyncStorage.getItem('@grouplink').then((value) => 
        {
            if(value != null)
            {
                let JSONValue = JSON.parse(value);
                return dispatch({ type: 'UPDATE', name: JSONValue.name, url: JSONValue.url });
            }
        });
    }, []);

    const Context = useMemo(() => 
    ({
        update: (name, url) => {
            AsyncStorage.setItem('@grouplink', JSON.stringify({ name: name, url: url }));
            dispatch({ type: 'UPDATE', name: name, url: url });
        },
        clear: () => {
            dispatch({ type: 'CLEAR' });
        }
    }), []);

    return (
        <NavigationContainer>
            {scheduleState.isLoading == true ? (
                <ActivityIndicator></ActivityIndicator>
            ) : (
                <ScheduleContext.Provider value={Context}>
                    <Stack.Navigator>
                        {scheduleState.groupname == null ? (
                            <>
                                <Stack.Screen name="CourseSelect" component={CourseSelect} options={{ title: "Wybór kierunku" }}/>
                                <Stack.Screen name="GroupSelect" component={GroupSelect} options={{ title: "Wybór grupy" }}/>
                            </>
                        ) : (
                            <Stack.Screen name="Schedule" component={Schedule} options={{ title: "Plan zajęć", headerLeft: () => { return null; } }}/>
                        )}
                    </Stack.Navigator>
                </ScheduleContext.Provider>
            )}
        </NavigationContainer>
    );
};

export default App;
