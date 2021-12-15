import { createContext } from 'react';

const currentUserContext = createContext({ user: null, setUser: () => {} });

export default currentUserContext;
