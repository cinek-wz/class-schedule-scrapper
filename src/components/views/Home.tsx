import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions, Header } from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{title: string; }> = ({children, title}) => 
  {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  };

const Home = () => 
{
    return (
        <View>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: Colors.lighter }}>
                <Header/>
                <View
                style={{
                    backgroundColor: Colors.lighter
                }}>
                <Section title="Gedon">
                    Edit <Text style={styles.highlight}>App.tsx</Text> to change this
                    screen and then come back to see your edits.
                </Section>
                <Section title="See Your xxxxChanges">
                    xDDD
                </Section>
                <Section title="Gedon">
                    <DebugInstructions />
                </Section>
                <Section title="Gedon">
                    Read the docs to discover what to do next:
                </Section>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create(
    {
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
        highlight: {
        fontWeight: '700',
    }
});

export default Home;