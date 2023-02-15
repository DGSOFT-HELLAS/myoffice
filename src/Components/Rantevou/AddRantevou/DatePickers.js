import { StyleSheet, View } from "react-native"
import { ModalTimePickerComp } from "../../DatePickers/ModalTimePicker"
import InputLabel from "../../SharedComp/Views/InputLabel"

const DatePickers = ({ setState, startTime, endTime }) => {
  // console.log('----- START TIME END TIME')
  // console.log(startTime)
  // console.log(endTime)
  const handleStartTime = (startTime) => {
    setState((prevState) => {
      return {
        ...prevState, fromTime: startTime
      }
    })
  }
  const handleEndTime = (startTime) => {
    setState((prevState) => {
      return {
        ...prevState, toTime: startTime
      }
    })
  }

  return (
    <View style={styles.datePickerView}>
      <InputLabel title="* Έναρξη:">
        < ModalTimePickerComp handleState={handleStartTime} time={startTime} />
      </InputLabel>
      <InputLabel style={styles.rightView} title="* Λήξη:">
        < ModalTimePickerComp handleState={handleEndTime} time={endTime} />
      </InputLabel>
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
  },
  datePickerView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  datepickerRightView: {
    marginLeft: 10,
  },
  datePicker: {
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  rightView: {
    marginLeft: 20,
  }


});

export default DatePickers;
