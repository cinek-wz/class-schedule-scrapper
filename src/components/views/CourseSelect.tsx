import React, { Component, memo, PureComponent, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Button, Image,StyleSheet, FlatList, Text, View, Alert, ScrollView, SafeAreaView, TouchableOpacity, VirtualizedList, SectionList, TouchableWithoutFeedback, Pressable } from "react-native";
import { parse } from 'node-html-parser';

import Styles from '../styles/style';

const CourseSelect = ({ navigation }) =>
{
    const [isLoading, setLoading] = useState(true);
    //Serialized data from fetch
    const [data, setData] = useState([]);
    const [pickedGroup, setGroup] = useState(null);

    useEffect(() => 
    {
        console.log("START");
        fetch("http://www.plan.uz.zgora.pl/grupy_lista_kierunkow.php").then((response) => response.text()).then(body =>
        {
            let DOM = parse(body);
            let Data = [];

            let Kierunki = DOM.querySelectorAll('body > div.container.main > ul > li');

            for(let i of Kierunki)
            {
                let Wydzial = { name: i.structuredText.split('\n')[0], data: [] };

                let Sub = i.querySelectorAll('ul > li');

                for(let p of Sub)
                {
                    Wydzial.data.push({ name: p.text, url: p.querySelector('a').getAttribute('href')})
                }

                Data.push(Wydzial);
            }

            setData(Data);
            setLoading(false);
        });
    }, []);

    let RenderSection = ({ section: { name } }) => 
    (
        <View style={Styles.header}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
        </View>
    );

    let RenderItem = ({ item }) => 
    (
        <TouchableOpacity onPress={() => setGroup(item)}>
            <Text style={Styles.courseitemcontainer} >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const Memoized = useMemo(() => RenderItem, [data]);
    
    return (
        <>
            <View>
                {pickedGroup ? (
                    <View style={{ padding: 10 }}>
                        <Text style={Styles.title}>{pickedGroup.name}</Text>
                        <Button title="Dalej" onPress={() => navigation.navigate('GroupSelect', { course: pickedGroup })}></Button>
                    </View>
                ) : null}
            </View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    initialNumToRender={2}
                    renderItem={Memoized}
                    renderSectionHeader={RenderSection}
                />
            )}
        </>
    );
}

export default CourseSelect;