import * as React from 'react';
import {Text, View, Dimensions} from 'react-native'
import { List, ProgressBar, Button, Card} from 'react-native-paper';
const { width, height } = Dimensions.get('window');
import {ProfMovies} from './ProfMovies'

 
const ProfileList = (props) => {
    const [expanded, setExpanded] = React.useState(false);
  
    const handlePress = () => setExpanded(!expanded);
    return (
        <View>
      <List.Section title="Profile Information" titleStyle={{color:'black', fontSize:20}}>
  
        <List.Accordion
          title="Reward Progress"
          left={props => <List.Icon {...props} icon="movie" />}
          expanded={expanded}
          onPress={handlePress}
          theme={{ colors: { primary: '#c32528' }}}
          >
            <View style={{alignContent:'center'}}>
            <ProgressBar color='#c32528' style={{width:width-100, height:50, borderRadius:100}} progress={props.seen % 3 / 3 }> </ProgressBar>
            <Text style={{marginTop:5}}>{`You Are ${3 - (props.seen % 3)} Movie(s) Away From Your Free Movie`}</Text>
            {props.seen %3 === 0 ? <Button> Claim Reward</Button> : <View></View> }
            </View>
        </List.Accordion>
        <List.Accordion
          title="Your Movies"
          left={props => <List.Icon {...props} icon="movie" />}
          theme={{ colors: { primary: '#c32528' }}}
          >
            <View style={{left:-50}}>
                <ProfMovies movies={props.movies}></ProfMovies>
            </View>
        </List.Accordion>
        <List.Accordion
          title="Subscription"
          left={props => <List.Icon {...props} icon="movie" />}
          theme={{ colors: { primary: '#c32528' }}}
          >
            <View style={{left:-50}}>
                <Card>
                    <Card.Title title={'Cinesave Premium'} subtitle={'3.99 per Month'}></Card.Title>
                    <Card.Content>
                        <Text>
                        You are subscribed to Cinesave Premium, enjoy your amazing rewards!
                        </Text>
                        </Card.Content>
                </Card>
            </View>
        </List.Accordion>
      </List.Section>
     
      </View>
    );
  };
  
  export default ProfileList;
  