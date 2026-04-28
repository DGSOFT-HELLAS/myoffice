
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import { Layout } from './src/useContext/useContect';
import { DaysContext } from './src/useContext/daysContext';
import DrawerNav from './src/navigation';


function App(): React.JSX.Element {
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

export default App;
