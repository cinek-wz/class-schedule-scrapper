import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, VirtualizedList } from 'react-native';
import { Colors, DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import { parse } from 'node-html-parser';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Styles from '@styles/Style';

import { ScheduleContext } from '../main/App';
import CourseSelect from './CourseSelect';

const GroupSelect = ({ route, navigation }) => 
{
    const [isLoading, setLoading] = useState(true);
    //Serialized data from fetch
    const [data, setData] = useState([]);
    const [pickedGroup, setGroup] = useState(null);

    const Context = useContext(ScheduleContext);

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

    let RenderItem = ({ item }) => 
    (
        <TouchableOpacity onPress={() => { setGroup(item) }}>
            <Text style={Styles.groupitemcontainer} >
                {pickedGroup && pickedGroup.name == item.name ? 
                <Text style={ {color: "darkolivegreen", fontWeight: 'bold'}}>✔️ {item.name}</Text> : <Text>{item.name}</Text> }
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={Styles.containerfull}>
            {isLoading ? (
                <View style={Styles.centered}>
                    <ActivityIndicator />
                </View>
            ) : (
                <>
                    <FlatList
                        data={data}
                        initialNumToRender={5}
                        renderItem={RenderItem}
                    />

                    {pickedGroup ? (
                        <View>
                            <Button title="Dalej" onPress={async () => 
                            {
                                Context.update(pickedGroup.name, pickedGroup.url);
                            }
                            }></Button>
                        </View>
                    ) : null}
                </>
            )}
        </View>
    );
};

export default GroupSelect;