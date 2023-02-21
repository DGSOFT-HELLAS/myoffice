import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../Atoms/Text";
import AppointmentsView from "../../Atoms/View/AppointmentsView";
import { ModalDatePickerComp } from "../../DatePickers/ModalDatePicker";

import { COLORS } from "../../../shared/COLORS";

const ChooseDates = ({ day, endDay, onChangeStartDay, onChangeEndDay, containerStyle }) => {
  return (
    <AppointmentsView style={[styles.view ? styles.view : containerStyle]}>
      <View>
        <Text>Από:</Text>
        <ModalDatePickerComp style={styles.modalContainer} day={day} onChange={onChangeStartDay} />
      </View>
      <View>
        <Text>Έως:</Text>
        <ModalDatePickerComp style={styles.modalContainer} day={endDay} onChange={onChangeEndDay} />
      </View>
    </AppointmentsView>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 0,
    borderWidth: 0.7,
    borderColor: COLORS.secondaryColorShade002,
    borderRadius: 4,
  },
  modalContainer: {
    borderWidth: 1,
    borderColor: '#e7e8e6',
    borderColor: COLORS.secondaryColorShade002,
    marginTop: 5,
  },
  divider: {
    width: 10,
    height: 2,
    borderRadius: 5,
    backgroundColor: COLORS.tetradic1,
    marginBottom: 10,
    marginTop: 4,
  }
});

export default ChooseDates;