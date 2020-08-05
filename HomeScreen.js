import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import TopBar from './TopBar'
export const HomeScreen = ({ navigation }) => {
    return (
        <View >
             <TopBar></TopBar>
            <Text >Cinesave</Text>
            </View>
      
    );
  };
  export const ProfileScreen = () => {
    return (
        <View>
            <TopBar></TopBar>
    <Text>This is Greg's profile</Text>
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