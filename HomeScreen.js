import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Platform, Alert, Image, ImageBackground, ScrollView} from 'react-native';
import TopBar from './TopBar'
import {MovieModal} from './Modal'
import jwtDecode from 'jwt-decode';
import * as  AuthSession  from 'expo-auth-session';
import {Movie} from './Movie'
import {Tops} from './TopList'
import MovieApi from './MovieApi'
import { AsyncStorage } from 'react-native';
import {bg} from './homepage.jpg'
import {MainMovieScreen} from './MainMovieScreen'
import {FullMovieList} from './FullMovieScreen'
import { Modal } from 'react-native-paper';
const authorizationEndpoint = 'https://dev-ba9hr1-y.auth0.com/authorize';
const auth0ClientId = 'lKrYS4TJ0E4C7NoHCc2YOWy871k4SqW6';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
/**
 * Converts an object to a query string.
 */
export const HomeScreen = ({ navigation }, props) => {
  const [name, setName] = React.useState(null);
  const[movies, setMovies] = useState([]);
  const [allmovies, setAllMovies] = useState([])
  const [alltitles, setAllTitles] = useState([])

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        setName(name);
      }
    }
    MovieApi.getTops().then(result=> {
      console.log(result);
      setMovies(result)});
      MovieApi.getAllMovies().then(result=>setAllMovies(result));
      MovieApi.getAllTitles().then(result=>setAllTitles(result));
      AsyncStorage.getItem('user').then(user => setName(user))
  }, [result]);
    return (
        <ScrollView >
       
  <Text style={{color:'black', textAlign:'center', fontFamily:'Helvetica', fontSize:18, marginTop:20}}>Top Deals!</Text>
            <Tops movies={movies}></Tops>
            <FullMovieList fullList={allmovies} allList={alltitles} />
            </ScrollView>
      
    );
  };
  export const ProfileScreen = () => {
    const [name, setName] = React.useState(null);


  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(user=>setName(user))
  }, [name]);

    return (
        <View>
          <View style={{height:40}}></View>
            {name ? (
         <Text>This is {name}'s profile</Text>
      ) : (
        <Text>Please Log in</Text>
      )}
   
    </View>
    )
    ;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });