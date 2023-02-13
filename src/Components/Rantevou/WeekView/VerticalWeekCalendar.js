import React, { useEffect, useState, memo } from "react";
import { View, StyleSheet, ScrollView, Flatlist } from "react-native";
import Text from "../../Atoms/Text";
import { List } from 'react-native-paper';
import Enty from 'react-native-vector-icons/Entypo'
import BoldText from "../../Atoms/Text/BoldText";

import { ListTitle, DescriptionTitle } from "../../SharedComp/List/List";
import { ListBodyRantevou } from "../DayView/ListBody";
import { styles } from "../styles";
import { FlatList } from "react-native-gesture-handler";

const VerticalWeekView = ({ week, data, days, loading, state, setState }) => {

    const [enabled, setEnabled] = useState(false)

    const onPress = () => {
        setEnabled((prev) => !prev)
    }

    const ItemWeek = memo(({ day, index }) => {
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
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item data={item} day={day} />}
                    keyExtractor={(item, index2) => {
                        return index2;
                    }}
                />

            </View>
        )
    })

    const Item = memo(({ data, day }) => {

        // console.log(new Date(data["Ημ/νία"]), day.toLocaleDateString())
        // console.log(day.toLocaleDateString())
        return (
            <View>
                {new Date(data["Ημ/νία"]).toLocaleDateString() === day.toLocaleDateString() && (
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
    }
    )

    return (
        <>
            <FlatList
                data={week}
                renderItem={({ item, index }) => <ItemWeek day={item} index={index} />}
                keyExtractor={(item, index) => {
                    return index;
                }}
                initialNumToRender={12}
            />
        </>
    )



}




export default VerticalWeekView;