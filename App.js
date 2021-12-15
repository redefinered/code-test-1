import React from 'react';
import { View, SafeAreaView, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import LoginModal from './src/components/login-modal/login-modal.component';
import HomeScreen from './src/screens/home/home.screen';
import { AppContext } from './src/contexts/providers/app/app.provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('./src/assets/logo.png');

const App = () => {
  const { currentUser, setCurrentUser } = React.useContext(AppContext);
  const [showForm, setShowForm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    checkAuth();
  }, []);

  const dismissForm = () => {
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const checkAuth = async () => {
    const userAuth = await AsyncStorage.getItem('@userAuth');

    if (typeof userAuth === 'undefined') return;

    // set user again if exists
    setCurrentUser(JSON.parse(userAuth));

    setLoading(false);
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color="blue" />
      </View>
    );

  if (!currentUser)
    return (
      <SafeAreaView style={styles.root}>
        <Image source={logo} />
        <Button onPress={() => handleShowForm()} title="Press here to log in" />

        <LoginModal visible={showForm} modalDismiss={dismissForm} />
      </SafeAreaView>
    );

  return <HomeScreen />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
