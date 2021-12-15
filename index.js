import React from 'react';
import AppProvider from './src/contexts/providers/app/app.provider';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const Root = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Root;

AppRegistry.registerComponent(appName, () => Root);
