import React, { useState, useEffect, useContext, } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native"
import ArrowButton from "../../Atoms/ArrowButton";
import Text from "../../Atoms/Text";
import LightText from "../../Atoms/Text/LightText";
import BoldText from "../../Atoms/Text/BoldText";
import { useNavigation } from '@react-navigation/native';
import { DayContext } from "../../../useContext/daysContext";
import HideButton from "../../Atoms/HideButton";
import RowView from "../../Atoms/View/RowView";
import { days } from "../../../shared/months";
import AppointmentsView from "../../Atoms/View/AppointmentsView";
import { COLORS } from "../../../shared/COLORS";
const HorizontalWeekView = ({ handleNextWeek, handlePreviousWeek, today, week, displayMonth, setState }) => {
    const [hide, setHide] = useState(false)
    const navigation = useNavigation();
    const { setDay } = useContext(DayContext);


    const onDayPress = (day, index) => {

        setDay(day)
        navigation.navigate('DayViewCalendarMain')
    }

    const onPress = () => {
        setHide((prev) => !prev)
    }


    return (
        <AppointmentsView>
            <RowView style={styles.monthView}>
                <BoldText style={styles.month}>
                    {displayMonth}
                </BoldText>
                <HideButton hide={hide} onPress={onPress} style={styles.hideButton} />
            </RowView >
            {!hide && (
                <View style={styles.view}>
                    <ArrowButton iconType='prevIcon' onPress={handlePreviousWeek} />
                    <View style={styles.days}>
                        <View style={styles.daysContainer}>
                            {days.map((day, index) => {
                                return (
                                    <LightText style={styles.dayTitle} key={day}>{day}</LightText>
                                )
                            })}
                        </View>
                        <View style={styles.daysContainer}>
                            {week && week.map((day, index) => {
                                // console.log(week)
                                return (
                                    <TouchableOpacity
                                        onPress={() => onDayPress(day, index)}
                                        style={[styles.daysNum, day.toLocaleDateString() == new Date().toLocaleDateString() ? styles.currentDay : null]} key={day}>
                                        <Text style={[day.toLocaleDateString() == today.toLocaleDateString() ? styles.currentDayText : styles.dayText]} >{day.getDate()}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View >
                    </View>
                    <ArrowButton iconType='nextIcon' onPress={handleNextWeek} />
                </View>
            )}
        </AppointmentsView>

    )
}


const styles = StyleSheet.create({
    monthView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,


    },
    hideButton: {
        position: 'absolute',
        right: '3%',
    },
    view: {
        width: '100%',
        minHeight: 80,
        flexDirection: 'row',
        paddingBottom: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: COLORS.secondaryColorShade002,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    month: {
        fontSize: 14,
    },
    days: {
        flex: 1,
    },
    daysContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 35,

    },
    dayText: {
        color: COLORS.secondaryColor,
        fontSize: 13,
    },
    dayTitle: {
        color: '#a6a8aa',
        fontSize: 14,
    },
    currentDay: {
        borderRadius: 30,
        backgroundColor: '#1ecbe1'
    },
    currentDayText: {
        color: 'white',
        fontSize: 13,
    },
    daysNum: {
        height: 30,
        width: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryColorShade003,
        fontSize: 10,
        borderWidth: 0.6,
        borderColor: COLORS.secondaryColorShade002,
        elevation: 1,
    }

});


export default HorizontalWeekView;