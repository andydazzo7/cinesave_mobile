import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, StyleSheet } from 'react-native-paper';
import {View, Text} from 'react-native'
import MovieApi from './MovieApi'
import {MovieModal} from './Modal'

const LeftContent = props => <Avatar.Icon {...props} style={{backgroundColor:'#c32528'}} icon="movie" />
export function MainMovieScreen (props){
    const [image,setImage] = React.useState('')
    const [release,setRelease] = React.useState('')
    const [pop,setPop] = React.useState('')
    const [over,setOver] = React.useState('')
    const [runGen, setRun] = React.useState('')
    const [backDrop, setBackDrop] = React.useState('')
    React.useEffect(() => {
        
            MovieApi.getImage(props.title).then(result=> {
                console.log(result)
                setImage( `https://image.tmdb.org/t/p/w780/${result}`)});
            MovieApi.getRelease(props.title).then(result=>setRelease(result));
            MovieApi.getOverview(props.title).then(result=>setOver(result));
            MovieApi.getId(props.title).then(result=> MovieApi.getGenreRatingRuntime(result).then(res=>setRun(res)));
        }
    , [])
   
    return(
  <Card elevation={4} style={{width:300, alignSelf:'center', marginBottom:30}} >
    <Card.Title title={props.title} subtitle={runGen.genre + " | " + runGen.runtime + 'min'}  left={LeftContent}/>
    <Card.Content>
    <Text><Text style={{display:'inline', textDecorationLine:'line-through', textAlign:'center', color:'#c32528', fontSize:16}}>${props.times[0].price}</Text><Text style={{textAlign:'center', fontSize:16, display:'inline'}}> ${props.times[0].discountedPrice}</Text></Text>
      <Paragraph>{over}</Paragraph>
     
    </Card.Content>
    <Card.Cover source={{ uri: image }}  />
    <Card.Actions style={{}}>
        <View style={{maxWidth:300, flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
    {props.times.map(movie=>{
                     return (<View><MovieModal title={props.title} time={movie.time} price={movie.discountedPrice} image={image}></MovieModal></View>)
                 })}
                 </View>
    </Card.Actions>
  </Card>
    )
}
