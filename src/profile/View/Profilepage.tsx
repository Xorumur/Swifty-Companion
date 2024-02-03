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

const Profilepage = ({navigation}) => {
  const [user, setUser] = useState(fakeUser);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} label={'Username'} />
        <Button mode="contained" onPress={() => console.log('search')}>
          Search
        </Button>
      </View>
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
        <View>
          <Text>Level : {user.cursus_users[0].level}</Text>
          <Text>% : {Math.floor((user.cursus_users[0].level % 1) * 100)}%</Text>
        </View>
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

const fakeUser = {
  id: 2,
  email: "andre@42.fr",
  login: "andre",
  first_name: "André",
  last_name: "Aubin",
  usual_full_name: "Juliette Aubin",
  usual_first_name: "Juliette",
  url: "https://api.intra.42.fr/v2/users/andre",
  phone: null,
  displayname: "André Aubin",
  kind: "admin",
  image: {
    link: "https://cdn.intra.42.fr/users/1234567890/andre.jpg",
    versions: {
      large: "https://cdn.intra.42.fr/users/1234567890/large_andre.jpg",
      medium: "https://cdn.intra.42.fr/users/1234567890/medium_andre.jpg",
      small: "https://cdn.intra.42.fr/users/1234567890/small_andre.jpg",
      micro: 'https://cdn.intra.42.fr/users/1234567890/micro_andre.jpg',
    },
  },
  staff: false,
  correction_point: 4,
  pool_month: "july",
  pool_year: "2016",
  location: null,
  wallet: 0,
  anonymize_date: "2021-02-20T00:00:00.000+03:00",
  data_erasure_date: null,
  alumni: false,
  active: true,
  groups: [],
  cursus_users: [
    {
      id: 2,
      begin_at: "2017-05-14T21:37:50.172Z",
      end_at: null,
      grade: null,
      level: 3.75,
      skills: [],
      cursus_id: 1,
      has_coalition: true,
      user: {
        id: 2,
        login: "andre",
        url: 'https://api.intra.42.fr/v2/users/andre',
      },
      cursus: {
        id: 1,
        created_at: "2017-11-22T13:41:00.750Z",
        name: "Piscine C",
        slug: 'piscine-c',
      },
    },
  ],
  projects_users: [],
  languages_users: [
    {
      id: 2,
      language_id: 3,
      user_id: 2,
      position: 1,
      created_at: '2017-11-22T13:41:03.638Z',
    },
  ],
  achievements: [],
  titles: [],
  titles_users: [],
  partnerships: [],
  patroned: [
    {
      id: 4,
      user_id: 2,
      godfather_id: 15,
      ongoing: true,
      created_at: "2017-11-22T13:42:11.565Z",
      updated_at: '2017-11-22T13:42:11.572Z',
    },
  ],
  patroning: [],
  expertises_users: [
    {
      id: 2,
      expertise_id: 3,
      interested: false,
      value: 2,
      contact_me: false,
      created_at: "2017-11-22T13:41:22.504Z",
      user_id: 2,
    },
  ],
  roles: [],
  campus: [
    {
      id: 1,
      name: "Cluj",
      time_zone: "Europe/Bucharest",
      language: {
        id: 3,
        name: "Romanian",
        identifier: "ro",
        created_at: "2017-11-22T13:40:59.468Z",
        updated_at: '2017-11-22T13:41:26.139Z',
      },
      users_count: 28,
      vogsphere_id: 1,
    },
  ],
  campus_users: [
    {
      id: 2,
      user_id: 2,
      campus_id: 1,
      is_primary: true,
    },
  ],
};
