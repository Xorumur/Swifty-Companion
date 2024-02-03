import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {TextInput, Button} from 'react-native-paper';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  viewInput: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
});

const Authpage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log('username', username);
    console.log('password', password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button mode="contained" onPress={() => navigation.navigate("Profile")}>
        Se connecter
      </Button>
    </View>
  );
};

export default Authpage;
