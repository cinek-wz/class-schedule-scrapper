import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import Home from '@components/views/Home';

const App = () => 
{
  return (
    <SafeAreaView style={ {backgroundColor: Colors.lighter }}>
        <StatusBar barStyle={'light-content'} />
        <Home/>
    </SafeAreaView>
  );
};

export default App;
