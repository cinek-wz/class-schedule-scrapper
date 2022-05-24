import React, { Component, memo, PureComponent, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Button, Image,StyleSheet, FlatList, Text, View, Alert, ScrollView, SafeAreaView, TouchableOpacity, VirtualizedList, SectionList, TouchableWithoutFeedback, Pressable } from "react-native";
import { parse } from 'node-html-parser';

import Styles from '../styles/Style';

const CourseSelect = ({ navigation }) =>
{
    const [isLoading, setLoading] = useState(true);
    //Serialized data from fetch
    const [data, setData] = useState([]);
    //Selected course
    const [pickedCourse, setCourse] = useState(null);

    

    useEffect(() => 
    {
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

    let RenderItem = ({ item, index }) => 
    (
        <TouchableOpacity onPress={() => { setCourse(item) }}>
            <Text style={Styles.courseitemcontainer} >
                {pickedCourse && pickedCourse.name == item.name ? 
                <Text style={ {color: "darkolivegreen", fontWeight: 'bold'}}>✔️ {item.name}</Text> : <Text>{item.name}</Text> }
            </Text>
        </TouchableOpacity>
    );

    const MemoizedItem = useMemo(() => RenderItem, [data, pickedCourse]);
    const MemoizedSection = useMemo(() => RenderSection, [data]);
    
    return (
        <>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <SectionList
                        sections={data}
                        initialNumToRender={2}
                        renderItem={MemoizedItem}
                        renderSectionHeader={MemoizedSection}
                    />

                    {pickedCourse ? (
                        <View>
                            <Button title="Dalej" onPress={() => navigation.navigate('GroupSelect', { course: pickedCourse })}></Button>
                        </View>
                    ) : null}
                </>
            )}
        </>
    );
}

export default CourseSelect;
