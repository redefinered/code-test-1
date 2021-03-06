import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { AppContext } from '../../contexts/providers/app/app.provider';

const STATIC_USER = {
  id: '1',
  username: 'fptsoftware',
  name: 'Justine Case'
};

const STATIC_USERNAME = 'fptsoftware';
const STATIC_PASSWORD = 'fptsoftware1234';

/// For dummy login
// and using a promise to emulate an API call that resolves in 2 secods
const authenticate = (u, p) =>
  new Promise((resolve, reject) => {
    if (u === STATIC_USERNAME && p === STATIC_PASSWORD) {
      setTimeout(() => {
        resolve({ user: STATIC_USER });
      }, 2000);
    } else {
      reject(new Error('invalid username or password'));
    }
  });

const LoginModal = ({ modalDismiss, ...modalProps }) => {
  const { setCurrentUser } = React.useContext(AppContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [valid, setValid] = React.useState(true);

  /// reset form UI when tryin to login again
  React.useEffect(() => {
    setValid(true);
    setError(null);
  }, [username, password]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!username) return setValid(false);
    if (!password) return setValid(false);

    try {
      const { user } = await authenticate(username, password);

      setCurrentUser(user);

      modalDismiss();
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setValid(false);
    }
  };

  const renderError = () => {
    if (!error) return;

    return <Text style={styles.error}>{error}</Text>;
  };

  return (
    <Modal {...modalProps} animationType="slide">
      <KeyboardAvoidingView style={styles.form}>
        {renderError()}
        {loading && <ActivityIndicator style={{ marginBottom: 10 }} color="blue" />}
        <TextInput
          autoCapitalize="none"
          style={{ borderColor: valid ? 'gray' : 'red', ...styles.input }}
          value={username}
          name="username"
          placeholder="Username"
          onChangeText={setUsername}
        />
        <TextInput
          style={{ borderColor: valid ? 'gray' : 'red', ...styles.input }}
          value={password}
          name="password"
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button disabled={loading} title="login" onPress={handleSubmit} />
        <View style={{ height: 10 }} />
        <Button disabled={loading} onPress={modalDismiss} title="cancel" color="orange" />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  input: {
    fontSize: 15,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  button: {
    marginBottom: 10
  },
  error: {
    color: 'red',
    marginBottom: 10
  }
});

LoginModal.propTypes = {
  modalDismiss: PropTypes.func.isRequired
};

export default LoginModal;
