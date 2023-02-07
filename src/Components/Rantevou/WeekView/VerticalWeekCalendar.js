import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "../../Atoms/Text";
import { List } from 'react-native-paper';
import Enty from 'react-native-vector-icons/Entypo'
import BoldText from "../../Atoms/Text/BoldText";

import { ListTitle, DescriptionTitle } from "../../SharedComp/List/List";
import { ListBodyRantevou } from "../DayView/ListBody";
import { styles } from "../styles";

const VerticalWeekView = ({ week, data, days, loading, state, setState }) => {

    const [enabled, setEnabled] = useState(false)

    const onPress = () => {
        setEnabled((prev) => !prev)
    }



    return (
        <ScrollView style={styles.container}>
            {state.week && state.week.map((day, index) => {
                return (
                    <View style={styles.dayRow} key={index}>
                        <View style={styles.dayView} >
                            <View style={styles.leftCol}>
                                <BoldText style={styles.dayNum}>{day.getDate()}</BoldText >
                                <Text style={styles.smallText}> {days[index]} </Text>
                            </View>
                            <View style={styles.rightCol}>
                                <View style={styles.line}></View>
                            </View>
                        </View>


                        {state.data && state.data.map((data, index) => {

                            return (
                                <View key={index}>
                                    {data["Ημ/νία"] === day.toLocaleDateString() && (
                                        <View
                                            style={[
                                                styles.itemWrapper,
                                                data.color === "LightSteelBlue" && styles.lightSteelBlue,
                                                data.color === "LimeGreen" && styles.limeGreen,
                                                data.color === "Silver" && styles.silver,
                                                data.color === "lightred" && styles.lightred,
                                                data.personal == 1 && styles.pink
                                            ]} >
                                            <List.Accordion
                                                description={<DescriptionTitle value={data['Πελάτης'] ? data['Πελάτης'] : "Δεν υπάρχει όνομα"} />}
                                                descriptionStyle={styles.itemDescription}
                                                title={<ListTitle value={`${data["Ημ/νία"]} - ${data["'Ωρα"]}`} Icon={Enty} iconName="calendar" />}
                                                style={{ backgroundColor: 'white' }}
                                            >
                                                <ListBodyRantevou data={data} enabled={enabled} onPress={onPress} state={state} setState={setState} />
                                            </List.Accordion>
                                        </View>
                                    )}

                                </View>
                            )
                        })}
                    </View>
                )
            })}
        </ScrollView >
    )



}


// const styles = StyleSheet.create({
//     input: {
//         // backgroundColor: '#f5f5f5',
//         margin: 10,
//         width: '100%'

//     },
//     container: {
//         flex: 1,
//         // justifyContent: 'space-evenly',
//         padding: 10,
//         backgroundColor: '#f0f0f0',

//     },
//     dayView: {
//         flexDirection: 'row',
//         width: '100%',
//         padding: 2,
//         // backgroundColor: 'red',
//     },
//     dayRow: {
//         marginVertical: 10,
//     },
//     leftCol: {
//         marginRight: 4,
//         // width: 40,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     rightCol: {
//         // backgroundColor: 'red',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     line: {
//         width: '100%',
//         height: 0.4,
//         backgroundColor: '#c9caca'
//     },
//     itemWrapper: {
//         marginHorizontal: 10,
//         backgroundColor: 'white',
//         elevation: 3,
//         marginVertical: 10,
//         borderTopWidth: 3,
//     },
//     accordionItem: {
//         marginBottom: 10,
//     },
//     dayNum: {
//         fontSize: 18,
//         color: '#a6a9a8'
//         // color: 'black', 
//     },
//     smallText: {
//         fontSize: 11,
//         color: '#aaacac'
//     },

//     itemActive: {
//         borderTopWidth: 2,
//         borderTopColor: 'green',
//     },
//     itemExpired: {
//         borderTopWidth: 2,
//         borderTopColor: 'red',
//     },
//     itemDescription: {
//         marginTop: 3,
//         fontFamily: 'Roboto-Regular'
//     },
//     lightSteelBlue: {
//         borderTopColor: '#718FCE',
//     },
//     limeGreen: {
//         borderTopColor: '#2ab61a',
//     },
//     silver: {
//         borderTopColor: 'silver',
//     },
//     lightred: {
//         borderTopColor: 'red',
//     },
//     pink: {
//         borderTopColor: 'pink',
//     },
//     orange: {
//         borderTopColor: 'orange',
//     }



// })

export default VerticalWeekView;