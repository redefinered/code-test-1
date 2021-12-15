/* eslint-disable react/prop-types */

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * This is similar to the redux pattern.
 * We can also set smaller context and apply them to individual components
 * but I am doing this pattern for now for brevity.
 */
export const AppContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  login: () => {},
  logout: () => {},
  data: {
    sectionOne: [],
    sectionTwo: []
  }
});

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [data, setData] = React.useState(null);

  /// login when current user is set by login form or checkAuth function that checks persisted login state
  React.useEffect(() => {
    if (!currentUser) return;

    login(currentUser);
  }, [currentUser]);

  const login = async (currentUser) =>
    await AsyncStorage.setItem('@userAuth', JSON.stringify(currentUser));

  const logout = async () => {
    await AsyncStorage.removeItem('@userAuth');

    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, data, setData, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
