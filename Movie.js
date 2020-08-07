import React from 'react'
import MovieApi from './MovieApi'
import {View, Text, Image, StyleSheet, Button} from 'react-native'
import { white } from 'color-name'
export class Movie extends React.Component{
    constructor(props){
        super(props)
        this.state={
            image:'https://image.tmdb.org/t/p/w780/8ZMrZGGW65ePWIgRn1260nA1uUm.jpg',
            release:'',
            pop:'',
            title: this.props.movie.title,
            price:this.props.movie.price,
            discountedPrice:this.props.movie.discountedPrice,
            overview:'',
            backdrop:'',
            imdb: this.props.movie.imdb,
            id: '',
            runGen:{},
            time: this.props.movie.time, 
            isMouseIn: false
        }
        this.getImage = this.getImage.bind(this);
    }
    componentDidMount(){
        this.getImage();
        this.getOverview();
    }
    componentDidUpdate(prevProps, prevState) {
        
        if(this.props.movie.title != prevProps.movie.title){
            console.log('hi');
            this.getImage();
            this.getOverview();
        }
      }
    getImage(){
        const url = `https://image.tmdb.org/t/p/w780`;
         MovieApi.getImage(this.props.movie.title).then(url=>{
             this.setState({image: `https://image.tmdb.org/t/p/w780${url}`});
         })
    }
    getOverview(){
        MovieApi.getRelease(this.props.movie.title).then(result=>this.setState({release:result}));
        MovieApi.getPop(this.props.movie.title).then(result=>this.setState({pop: result}));
        MovieApi.getOverview(this.props.movie.title).then(result=>this.setState({overview: result}));
        MovieApi.getBackDrop(this.props.movie.title).then(result=>this.setState({backdrop: result}));
        MovieApi.getId(this.props.movie.title).then(result=> MovieApi.getGenreRatingRuntime(result).then(res=>this.setState({runGen:res})));
    }

    render(){
        console.log(this.state.image )
        return(
            <View className="Movie" style={{marginLeft:20, marginBottom:0, backgroundColor:'#C32528', width:140, height:280}}>
             <View  className ='Image'>
            <Image style={{width:130, height:200, alignSelf:'center'}}source={{uri : this.state.image}}></Image>
            <Text className='text' style={styles.Text}>{this.props.movie.time}</Text>
            <Text className='cash' style={styles.Text} ><Text style={{textDecorationLine: 'line-through'}}>$ {this.props.movie.price}</Text> ${this.props.movie.discountedPrice}</Text>
            <Button color="white" title='Buy Tickets'></Button>
            </View>
          
             </View>
        );
    } 
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Text:{
        fontFamily:'Helvetica',
        fontSize: 14,
        textAlign:'center', color: 'white'
    }
  });