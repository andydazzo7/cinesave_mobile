import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Platform, Alert, Image, ImageBackground, ScrollView, Dimensions} from 'react-native';
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
import { Modal, Card } from 'react-native-paper';
const authorizationEndpoint = 'https://dev-ba9hr1-y.auth0.com/authorize';
const auth0ClientId = 'lKrYS4TJ0E4C7NoHCc2YOWy871k4SqW6';
const { width, height } = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import Collapsible from 'react-native-collapsible';
import ProfileList from './ProfList'

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
        <Swiper horizontal={false}  bounces={true} removeClippedSubviews={true} renderPagination={(index, total) => index===0 ? <View style={styles.pagination}><Text style={styles.paginationText}>All Movies  &#8595;</Text></View>: <Text style={styles.paginationText}></Text>}  >
       <View style={{height:height}}>
            <Text style={{color:'black', textAlign:'center', fontFamily:'Helvetica', fontSize:26, marginTop:50}}>Top Deals!</Text>
            <Tops movies={movies}></Tops>
            <Text style={{color:'black', textAlign:'center'}}>All Movies</Text>
          </View>
            <ScrollView style={{height:height-200}}>
            <FullMovieList fullList={allmovies} allList={alltitles} />
            </ScrollView>
            </Swiper>
      
    );
  };
  export const ProfileScreen = () => {
    const [name, setName] = React.useState(null);
    const [coll, setColl] = React.useState(false);
    const [moviesSeen, setMoviesSeen] =React.useState('')
    const [moneySaved, setMoney] =React.useState('')
    const [premium, setPremium] =React.useState('PREMIUM')
    const [movies, setMovies] = React.useState([])
    const [showMovies, setShow] = React.useState(false)
    const [recents, setRecents] = React.useState([])
    const [change, setChange] = React.useState(0)
    const [nickname, setNick] = React.useState('');
    
  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(user=>{
      setName(user);
      const nickname = user.split('@', 1)
      setNick(nickname)
      MovieApi.getUserInfo(nickname).then(result=> {
        console.log(result);
        setMoviesSeen(result.moviesSeen);
        setMoney(result.moneySaved)
    });
    MovieApi.getUserMovies(nickname).then(result=>{
        setMovies(result);
    })
    })
   
  }, [name]);

    return (
        <ScrollView>
         
          <View style={{height:20}}></View>
         
      <Image style={{width:200, height:200, alignSelf:'center', borderRadius:100}}source={{uri: 'https://lh3.googleusercontent.com/proxy/mqYwSZoaFmMFea7QqHlwXjkoxjIf41LfRwRtyrq3nLh3-f8oJzW0LwrxI1nO0yUp_SHBtNjL0MQ6RKjHQn5GNRxklH1b6TDtgSkY'}}></Image>
      <Card style={{width: width-50, alignSelf:'center', marginTop:10}} elevation={20}>
        <Card.Title  titleStyle={{textAlign:'center', fontSize:26}} title={name} subtitleStyle={{textAlign:'center'}} subtitle={`Movies seen: ${moviesSeen} | Money Saved ${moneySaved}`  }></Card.Title>

      </Card>
      <ProfileList seen ={moviesSeen} movies={movies}></ProfileList>
    </ScrollView>
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
    wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  paginationText:{
    textAlign:'center',
    fontFamily:'Helvetica',
    marginBottom:10, 
    fontSize:16
  }
  });