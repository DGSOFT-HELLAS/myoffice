import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Layout} from './src/useContext/userContext';
import {DaysContext} from './src/useContext/daysContext';
import DrawerNav from './src/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#000000'} />
      <Layout>
        <DaysContext>
          <DrawerNav />
        </DaysContext>
      </Layout>
    </SafeAreaView>
  );
}

export default App;
