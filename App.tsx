/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { OnBoarding } from './src/screens/OnBoarding';
import {
  CustomerHome,
  CustomerPreview,
  CustomerStatus,
} from './src/screens/customer';
import {
  OperatorHome,
  OperatorHistory,
  OperatorHistoryDetails,
} from './src/screens/operator';
import CreateStore from './src/store';

export default class App extends React.Component {
  render() {
    //const store = createStore(reducers, {}, applyMiddleware());
    const { store, persistor } = CreateStore();
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

const OperatorTab = createBottomTabNavigator({
  OperatorHome,
  OperatorHistory,
});

const CustomerStack = createStackNavigator(
  {
    CustomerHome,
    CustomerPreview,
    CustomerStatus: {
      screen: CustomerStatus,
    },
  },
  {
    headerMode: 'none',
  },
);

const RootStack = createStackNavigator(
  {
    OnBoarding: OnBoarding,
    CustomerRoute: CustomerStack,
    OperatorRoute: OperatorTab,
    OperatorHistoryDetails: {
      screen: OperatorHistoryDetails,
    },
  },
  {
    headerMode: 'none',
  },
);

const Navigation = createAppContainer(RootStack);
