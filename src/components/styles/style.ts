import { StyleSheet } from "react-native";

const Styles = StyleSheet.create(
{
    floatingbutton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: 
    {
        resizeMode: 'contain',
        width: 50,
        height: 50
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
        margin: 5
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
    actionButtonIcon: 
    {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});

export default Styles;