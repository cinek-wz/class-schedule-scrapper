import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions } from 'react-native/Libraries/NewAppScreen';

import GroupView from './GroupView';

const Home = () => 
{
    return (
        <View style={{ backgroundColor: Colors.lighter }}>
            <GroupView></GroupView>
        </View>
    );
};

export default Home;