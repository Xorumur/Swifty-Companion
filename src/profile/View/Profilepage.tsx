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
					<Text>{user.email}</Text>
				</View>
				<View>
					{/* Make level a round number */}
					<Text>Level : {Math.floor(user.cursus_users[1].level)} , {Math.floor((user.cursus_users[1].level % 1) * 100)}%</Text>
					<Text>Wallet : {user.wallet} $</Text>
					<Text>Eval Points : {user.correction_point}</Text>
				</View>
			</View>
            <View style={styles.scrollContainer}>
                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>Projects</Text>
                <ScrollView>
                    {user.projects_users.map((project, index) => (
                        <View key={project.project.name} style={styles.row}>
                            <Text>{project.project.name}</Text>
                            <Text style={{color: 'green'}}>{
                                project.status === 'finished' ?
                                project.final_mark
                                : project.status === 'in_progress' ?
                                'En cours'
                                : 'Non commencé'
                            }</Text>
                        </View>
                    ))}
                </ScrollView>
                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>Skills</Text>
                <ScrollView>
                    {user.cursus_users[1].skills.map((skill, index) => (
                        <View key={skill.name} style={styles.row}>
                            <Text>{skill.name}</Text>
                            <Text style={{color: 'green'}}>{skill.level}</Text>
                        </View>
                    ))}
                </ScrollView>
                </View>
		</View>
		)}
	</View>
  );
};

export default Profilepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  scrollContainer: {
    flex: 1,
	gap: 10
  },
    scroll: {
        flex: 1,
        paddingBottom: 5,
    },
});
