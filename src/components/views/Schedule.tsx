import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { parse } from 'node-html-parser';
import cheerio from 'cheerio';

import Styles from '@styles/Style';

const Schedule = ({ route, navigation }) => 
{
    const [isLoading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const tableHead = ['PG', 'Od', 'Do', 'Przedmiot', 'RZ', 'Nauczyciel', 'Miejsce', 'Terminy'];
    const widthArr = [40, 80, 60, 170, 40, 140, 80, 80]

    useEffect(() => 
    {
        AsyncStorage.getItem('@grouplink').then((value) => 
        {
            let GroupData = JSON.parse(value);
            navigation.setOptions({ title: `Plan zajęć ${GroupData.name}` })

            fetch(`http://www.plan.uz.zgora.pl/${GroupData.url}`).then((response) => response.text()).then(body =>
            {
                let $ = cheerio.load(body);

                let Days = $('tr[id*="label_day"]').find('td');
                let TimeTable = [];

                for(let i of Days)
                {
                    let Element = $(i);
                    let dayName = Element.text();
                    let dayID = Element.parent().attr('id').replace('label_', '');

                    let TableDay = { title: dayName, data: []};

                    let Activities = Element.parent().parent().find(`tr[class*="${dayID}"]`);

                    for(let p of Activities)
                    {
                        let ActivityData = $(p).find('td');
                        let TableActivity = [];
                        TableActivity.push($(ActivityData[0]).text())
                        TableActivity.push($(ActivityData[1]).text())
                        TableActivity.push($(ActivityData[2]).text())
                        TableActivity.push($(ActivityData[3]).text())
                        TableActivity.push($(ActivityData[4]).text())
                        TableActivity.push($(ActivityData[5]).text())
                        TableActivity.push($(ActivityData[6]).text())
                        TableActivity.push($(ActivityData[7]).text())
                        TableDay.data.push(TableActivity);
                    }
                    TimeTable.push(TableDay);
                }

                setTableData(TimeTable);
                setLoading(false);
            });
        });
    },[]);

    return (
        <View style={Styles.containerfull}>
            <Button title="Zmień grupę" onPress={async () => 
            {
                navigation.navigate('CourseSelect');
            }}></Button>
            {isLoading ? (
                <View style={Styles.centered}>
                    <ActivityIndicator/>
                </View>
            ) : (
                <ScrollView horizontal={true}>
                    <ScrollView>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={tableHead} widthArr={widthArr} style={Styles.tableheader} textStyle={Styles.tabletextheader}/>
                            {
                                tableData.map( (day) => (
                                    <>
                                        <Row data={[[ day.title ]]} style={Styles.dayheader} textStyle={Styles.dayheadertext} />
                                        <Rows data={day.data} textStyle={Styles.rowtext} widthArr={widthArr}/>
                                    </>
                                ))
                            }
                        </Table>
                    </ScrollView>
                </ScrollView>
            )}
        </View>
    );
};

export default Schedule;