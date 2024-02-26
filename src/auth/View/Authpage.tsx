import React, {useState, useEffect} from 'react';
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

import { auth, retrieveTokens, logout } from '../../services/auth'

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
	gap: 20,
  },
});

const Authpage = ({navigation}) => {

	const [isAuthed, setIsAuthed] = useState(false);

	const login = async () => {
		const res = await auth();
		if (res)
			navigation.navigate("Profile")
	};

	const pressLogout = async () => {
		setIsAuthed(false);
		await logout();
	};

	// on mount
	useEffect(() => {
		const checkIfAuthed = async () => {
			const tokens = await retrieveTokens();
			if (tokens) {
				navigation.navigate("Profile")
				setIsAuthed(true);
			}
		}
		checkIfAuthed();
	}, []);

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={login}>
		Login using 42
      </Button>
	  {isAuthed &&
	  	<Button mode="contained" onPress={pressLogout}>
			Logout
		</Button>
	  }
    </View>
  );
};

export default Authpage;
