import {StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {DayContext} from '../../../useContext/daysContext';
import {fetchAPI} from '../../../utils/fetchAPI';
import DayViewBody from './DayViewBody';
import Spinner from '../../Atoms/ActivityIndicator';
import NoDataView from '../../Atoms/View/NoDataView';
import {UserContext} from '../../../useContext/userContext';
import AppointmentsView from '../../Atoms/View/AppointmentsView';
import ArrowButton from '../../Atoms/ArrowButton';
import {ModalDatePickerComp} from '../../DatePickers/ModalDatePicker';
import {incrementDecrementDate} from '../../../utils/incrementDecrementDate';
import ModalPersons from '../Modal';
import {Provider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FloatBtn from '../../SharedComp/Buttons/FloatButton';
import {format} from 'date-fns-tz';
import isoDate from '../../../utils/dateFunctions/isoDate';

const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';

const DayView = () => {
  const {trdr} = useContext(UserContext);
  const {day} = useContext(DayContext);
  const navigation = useNavigation();

  const [state, setState] = useState({
    data: [],
    loading: false,
    delete: false,
    refresh: false,
  });

  const [raw, setRaw] = useState({
    startDate: day ? day : new Date(),
    endDate: '',
    stelexos: 0,
  });

  const onChange = selectedDate => {
    setRaw(prev => {
      return {
        ...prev,
        startDate: selectedDate,
      };
    });
  };

  const nextButton = () => {
    let startDate = incrementDecrementDate(
      new Date(raw.startDate),
      'increment',
    );

    setRaw(prev => {
      return {
        ...prev,
        startDate: startDate,
      };
    });
  };

  const prevButton = () => {
    let startDate = incrementDecrementDate(
      new Date(raw.startDate),
      'decrement',
    );
    setRaw(prev => {
      return {
        ...prev,
        startDate: startDate,
      };
    });
  };

  const handleFetch = async () => {
    setState(prev => {
      return {
        ...prev,
        loading: true,
      };
    });

    let res = await fetchAPI(
      'https://portal.myoffice.com.gr/mobApi/queryIncoming.php',
      {
        startDate: raw.startDate,
        endDate: '',
        trdr: trdr,
        stelexos: raw.stelexos,
        query: 'wpFetchRDVForCalendar',
      },
    );

    setState(prev => {
      return {
        ...prev,
        loading: false,
        data: res,
      };
    });
  };

  const onAddPress = () => {
    const zonedDate = isoDate(raw?.startDate, true);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd', {
      timeZone,
      timeZoneOffset,
    });
    navigation.navigate('AddRantevou', {
      start: formattedDate,
      end: formattedDate,
      date: formattedDate,
    });
  };

  useEffect(() => {
    handleFetch();
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return navigation.addListener('focus', () => {
      handleFetch();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw.startDate, state.delete, raw.stelexos, day, navigation]);

  return (
    <Provider>
      <ModalPersons
        title={'Στέλεχος'}
        query="GetPersons"
        setState={setRaw}
        updateValue={'stelexos'}
        hideLabel={true}
      />
      <AppointmentsView style={styles.dayViewHeader}>
        <ArrowButton onPress={prevButton} iconType="prevIcon" />
        <ModalDatePickerComp day={raw.startDate} onChange={onChange} />
        <ArrowButton onPress={nextButton} iconType="nextIcon" />
      </AppointmentsView>
      {state.loading ? (
        <Spinner />
      ) : state.data?.length === 0 ? (
        <NoDataView />
      ) : (
        <DayViewBody data={state.data} setState={setState} />
      )}
      <FloatBtn onPress={onAddPress} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  dayViewHeader: {
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: '#d1cfce',
    backgroundColor: 'white',
  },

  calendarIcon: {
    fontSize: 20,
  },
});

export default DayView;
