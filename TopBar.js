import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';

import jwtDecode from 'jwt-decode';
import * as  AuthSession  from 'expo-auth-session';
import { AsyncStorage } from 'react-native';

const authorizationEndpoint = 'https://dev-ba9hr1-y.auth0.com/authorize';
const auth0ClientId = 'lKrYS4TJ0E4C7NoHCc2YOWy871k4SqW6';
const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export  function TopBar() {
  const [name, setName] = React.useState(null);

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
        AsyncStorage.clear();
        AsyncStorage.setItem('user',  name)
      }
    }
  }, [result]);
  return(
    <Appbar.Header style={{backgroundColor:'#C32528'}}>
      
       <Appbar.Content title="Cinesave" titleStyle={{fontSize:28, fontWeight:'bold'}}/>
        {//Search 
        }
         {name ? (
        <Text style={{textAlign:'center', color:'white'}}> {name}</Text>
      ) : (
        <Button
          disabled={!request}
          title="Log in"
          color='white'
          onPress={() => promptAsync({ useProxy })}
        />
      )}
        <Appbar.Action icon="magnify" onPress={() => {}} />
        {
          //{Profile?}
        }
       
    </Appbar.Header>
  )
 }



const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: '#C32528',
    alignItems: 'center',
    justifyContent: 'center', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export default TopBar;