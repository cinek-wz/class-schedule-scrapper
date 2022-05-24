import React, { Component, useEffect, useState } from "react";
import { ActivityIndicator, Button, Image,StyleSheet, FlatList, Text, View, Alert, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Styles from '../styles/style';

import { parse } from 'node-html-parser';

const GroupView = ({ navigation }) =>
{
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pickedGroup, setGroup] = useState(null);

    useEffect(() => 
    {
        fetch("http://www.plan.uz.zgora.pl/grupy_lista_kierunkow.php").then((response) => response.text()).then(body =>
        {
                let DOM = parse(body);
                let Data = [];

                let Kierunki = DOM.querySelectorAll('body > div.container.main > ul > li');

                for(let i of Kierunki)
                {
                    let Wydzial = { name: i.structuredText.split('\n')[0], groups: [] };

                    let Wydzialy = i.querySelectorAll('ul > li');

                    for(let p of Wydzialy)
                    {
                        Wydzial.groups.push({ name: p.text, url: p.querySelector('a').getAttribute('href')})
                    }

                    Data.push(Wydzial);
                }

                setData(Data);
                setLoading(false);
        });
    }, []);

    let RenderedItem = ({ item }) => 
    {
        let groups = item.groups.map((group, index) => 
        {
            return (
                <Text style={Styles.course} key={group.name} onPress={() => setGroup(group)}>
                    {group.name}
                </Text>
            ); 
        });
 
        return (
            <View key={item.name}>
                <View style={Styles.header}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                </View>
                {groups}
            </View>
        );
    };

    return (
        <ScrollView>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList 
                    nestedScrollEnabled={true}
                    data={data}
                    keyExtractor={(item, index) => item.name}
                    renderItem={RenderedItem}
                    ListHeaderComponent={
                        <View>
                            <Text style={Styles.title}>
                                Wybrano:
                            </Text>
                            {pickedGroup ? (
                                <View style={{ padding: 10 }}>
                                    <Text style={Styles.title}>{pickedGroup.name}</Text>
                                    <Button title="Dalej" onPress={() => navigation.navigate('GroupSelect', { course: pickedGroup })}></Button>
                                </View>
                            ) : null}
                        </View>
                    }
                    />
                )}
        </ScrollView>
    );
}

export default GroupView;