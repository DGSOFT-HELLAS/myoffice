import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS } from "../../shared/COLORS";
const ArrowButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.arrowView} onPress={props.onPress}>
            {props.iconType === 'prevIcon' ? <Icon name="arrowleft" style={[styles.icon, props.style]} /> : null}
            {props.iconType === 'nextIcon' ? <Icon name="arrowright" style={[styles.icon, props.style]} /> : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    arrowView: {
        width: '10%',
        minWidth: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,

    },
    onPressOpacity: {
        backgroundColor: 'black',
        opacity: '30%'
    },
    icon: {
        fontSize: 16,
        color: COLORS.secondaryColor
    },
})
export default ArrowButton;