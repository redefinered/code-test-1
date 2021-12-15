import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Modal,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native';
import { AppContext } from '../../contexts/providers/app/app.provider';

const STATIC_USER = {
  id: '1',
  username: 'Fptsoftware',
  name: 'Justine Case'
};

const STATIC_USERNAME = 'test';
const STATIC_PASSWORD = '1234';

const authenticate = (u, p) =>
  new Promise((resolve, reject) => {
    if (u === STATIC_USERNAME && p === STATIC_PASSWORD) {
      setTimeout(() => {
        resolve({ user: STATIC_USER });
      }, 3000);
    } else {
      reject(new Error('invalid username or password'));
    }
  });

const LoginModal = ({ handleCancel, ...modalProps }) => {
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

      setValid(true);
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
      <KeyboardAvoidingView
        style={styles.form}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      >
        {renderError()}
        {loading && <ActivityIndicator style={{ marginBottom: 10 }} color="blue" />}
        <TextInput
          autoCapitalize="none"
          style={{ borderColor: valid ? 'gray' : 'red', ...styles.input }}
          value={username}
          name="username"
          onChangeText={setUsername}
        />
        <TextInput
          style={{ borderColor: valid ? 'gray' : 'red', ...styles.input }}
          value={password}
          name="password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button disabled={loading} title="login" onPress={handleSubmit} />
        <Button disabled={loading} onPress={handleCancel} title="cancel" color="orange" />
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
  error: {
    color: 'red',
    marginBottom: 10
  }
});

LoginModal.propTypes = {
  handleCancel: PropTypes.func.isRequired
};

export default LoginModal;
