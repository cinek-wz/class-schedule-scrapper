import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions } from 'react-native/Libraries/NewAppScreen';

import GroupView from './GroupView';

const GroupSelect = ({ route, navigation }) => 
{
    /*useEffect(() => {
        console.log(route.params.course.name);
    })*/
    const Course = route.params.course;

    return (
        <View style={{ backgroundColor: Colors.lighter }}>
            <Text>Wybór grupy</Text>
            <Text>Kierunek: {Course.name} {Course.url}</Text>
        </View>
    );
};

export default GroupSelect;