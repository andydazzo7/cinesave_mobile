import React from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native'
import MovieApi from './MovieApi'
import {MainMovieScreen} from './MainMovieScreen'
import Swiper from 'react-native-swiper'


export class FullMovieList extends React.Component{
    constructor(props){
        super(props);
        this.getCorrectArray = this.getCorrectArray.bind(this);
    }

    getCorrectArray(title){
        console.log(this.props.fullList)
        const arr = this.props.fullList.filter(movie=> movie.title === title);
        return arr;
    }
    render(){
        return(
            <ScrollView >
                <Text style={{textAlign:'center', fontSize:24, marginTop:0, height:100}}>Shop All Movies At Cranford Theater!</Text>
            <ScrollView>
               {this.props.allList.map(title=>{
                   return <MainMovieScreen title1={title} times={this.getCorrectArray(title)} user={this.props.user}/>;
               })}
            </ScrollView>
            </ScrollView>

        )
    }
}
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
  });