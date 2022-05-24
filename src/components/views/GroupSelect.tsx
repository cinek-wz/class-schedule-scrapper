import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, VirtualizedList } from 'react-native';
import { Colors, DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import { parse } from 'node-html-parser';

import Styles from '../styles/style';

import CourseSelect from './CourseSelect';

const GroupSelect = ({ route, navigation }) => 
{
    const [isLoading, setLoading] = useState(true);
    //Serialized data from fetch
    const [data, setData] = useState([]);
    const [pickedGroup, setGroup] = useState(null);

    const Course = route.params.course;
    
    useEffect(() => 
    {
        fetch(`http://www.plan.uz.zgora.pl/${Course.url}`).then((response) => response.text()).then(body =>
        {
            let DOM = parse(body);
            let Data = [];

            let Groups = DOM.querySelectorAll('td');

            for(let i of Groups)
            {
                let GroupData = i.querySelector('a');
                Data.push({ name: GroupData.structuredText, url: GroupData.getAttribute('href')});
            }

            setData(Data);
            setLoading(false);
        });
    }, []);
    
    const Item = ({ title }) => (
      <View>
        <Text>{title}</Text>
      </View>
    );
    let RenderedItem = ({ item }) => 
    {
        return (
            <View key={item.name}>
                <View style={Styles.groupitemcontainer}>
                    <Text style={Styles.groupitem}>{item.name}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.lighter }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <VirtualizedList
                    data={data}
                    initialNumToRender={20}
                    renderItem={RenderedItem}
                    keyExtractor={(item: any) => item.name}
                    getItemCount={() => data.length}
                    getItem={(data, index) => data[index]}
                />
            )}
        </SafeAreaView>
    );
};

export default GroupSelect;