/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


const NewApp = () => {
    return (
        <>
            <Text>
                hello
            </Text>
        </>
    )
}
AppRegistry.registerComponent('NewApp', () => NewApp);
