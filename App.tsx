
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';

import { Layout } from './src/useContext/useContect';
import { DaysContext } from './src/useContext/daysContext';
import DrawerNav from './src/navigation';


function App(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={'#000000'} />
      <Layout>
        <DaysContext>
          <DrawerNav />
        </DaysContext>
      </Layout>
    </>

  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
