import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import { AppContext } from '../../contexts/providers/app/app.provider';
// import currentUserContext from '../../contexts/current-user/current-user.context'

const HomeScreen = () => {
  // const currentUser = React.useContext(currentUserContext);
  const { logout } = React.useContext(AppContext);
  return (
    <SafeAreaView>
      {/* <Text>{`Hello, ${currentUser.name}!`}</Text> */}
      <Button title="Sign out" onPress={logout} />
      {/* <FlatList /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
