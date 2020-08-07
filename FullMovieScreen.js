import React from 'react';
import {View, Text} from 'react-native'
import MovieApi from './MovieApi'
import {MainMovieScreen} from './MainMovieScreen'


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
            <View>
                <Text style={{fontFamily:'Helvetica', textAlign:'center', fontSize:20, marginBottom:10}}>Shop All Movies At Cranford Theater!</Text>
               {this.props.allList.map(title=>{
                   return <MainMovieScreen title={title} times={this.getCorrectArray(title)} user={this.props.user}/>;
               })}
            </View>

        )
    }
}