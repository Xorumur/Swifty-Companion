import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { TextInput, Button, Avatar } from 'react-native-paper';
import { searchQuery } from '../../services/search';

const Profilepage = ({navigation}) => {
	
	const [user, setUser] = useState(undefined);
	const [search, setSearch] = useState('');
	const [hasChanged, setHasChanged] = useState(false);

	async function onPressSearch() {
		if (!hasChanged)
			return;
		const user = await searchQuery(search);
		setUser(user);
		setHasChanged(false);
	}

	return (
	<View style={styles.container}>
		<View  style={styles.searchContainer}>
			<TextInput
				style={styles.input}
				label={'search'}
				onChangeText={(val) => { setSearch(val); setHasChanged(true); }}
				value={search} />
			<Button mode="contained" onPress={onPressSearch}>
				Search
			</Button>
		</View>
		{user === undefined ? (
			<Text>Entrez un nom d'utilisateur</Text>
		) : user == null ?
			<Text>User not found</Text>
		: (
		<View style={styles.container}>
			<View style={styles.row}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignContent: 'center',
						alignItems: 'center',
					}}
					>
					<Avatar.Image size={100} source={{ uri: user.image.link }} />
					<Text>{user.displayname}</Text>
					<Text>{user.login}</Text>
				</View>
				{/* <View>
					<Text>Level : {user.cursus_users[0].level}</Text>
					<Text>% : {Math.floor((user.cursus_users[0].level % 1) * 100)}%</Text>
				</View> */}
			</View>
			<Text>{user.email}</Text>
			<Text>Cet utilisateur a {user.wallet} points sur son wallet</Text>
			<Text>
				Cet utilisateur a {user.correction_point} points de corrections
			</Text>
			<Button onPress={() => navigation.navigate('Authentification')}>
				Se déconnecter
			</Button>
		</View>
		)}
	</View>
  );
};

export default Profilepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Répartit l'espace entre les éléments
    alignItems: 'center', // Centre les éléments verticalement
  },
  input: {
    flex: 1, // Le TextInput prend toute la largeur disponible
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10, // Marge à droite pour l'espace entre le TextInput et le Button
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
