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

import { auth } from '../../services/auth'

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
	const login = async () => {
		await auth();
		navigation.navigate("Profile")
	};

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={login}>
		Login using 42
      </Button>
    </View>
  );
};

export default Authpage;
