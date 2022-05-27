import { StyleSheet } from "react-native";

const Styles = StyleSheet.create(
{
    //100% height container for loading
    containerfull:
    {
        height: "100%"
    },
    centered:
    {
        flex: 1, 
        justifyContent: "center", 
        flexDirection: "row"
    },
    title:
    {
        fontSize: 20,
        margin: 15,
        textAlign: 'center'
    },
    header: 
    {
        backgroundColor: "skyblue",
        marginBottom: 5
    },
    //Course items
    courseitemcontainer:
    {
        padding: 7
    },
    //Group items
    groupitemcontainer:
    {
        padding: 7
    },
    groupitem:
    {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    },
    //Table styles
    tableheader: { height: 40, padding: 3, backgroundColor: '#f1f8ff' },
    tabletextheader: { margin: 2, textAlign: 'center', fontWeight: 'bold' },

    dayheader: { height: 40, backgroundColor: '#d0d0d0'},
    dayheadertext: { margin: 6, fontWeight: 'bold' },

    rowtext: { margin: 2, textAlign: 'center' }
});

export default Styles;