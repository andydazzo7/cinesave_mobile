import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Text>CINESAVE</Text>

      </View>
    );
  }
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