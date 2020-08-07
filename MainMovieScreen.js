import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, StyleSheet } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export function MainMovieScreen (props){
    return(
  <Card elevation={2} style={{width:300, alignSelf:'center'}}>
    <Card.Title title={props.movie.title} subtitle={props.movie.rating + " | " + props.movie.runtime }  />
    <Card.Content>
      <Paragraph>In a world where star wars is cool blah blah</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: props.movie.image }} />
    <Card.Actions>
      <Button color='#C32528' >2:15</Button>
      <Button color='#C32528' >4:30</Button>
    </Card.Actions>
  </Card>
    )
}
