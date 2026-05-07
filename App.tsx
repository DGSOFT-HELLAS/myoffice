
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { Layout } from './src/useContext/useContect';
import { DaysContext } from './src/useContext/daysContext';
import DrawerNav from './src/navigation';


function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={'#000000'} />
      <Layout>
        <DaysContext>
          <DrawerNav />
        </DaysContext>
      </Layout>
    </GestureHandlerRootView>

  )
}

export default App;
