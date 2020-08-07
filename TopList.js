import { Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import React from 'react'
import {Movie} from './Movie'


const { width } = Dimensions.get('window');
const height = width * 0.8
export class Tops extends React.Component {
    constructor(props){
        super(props);
    }
  state = {
    currentIndex: 0,
  };
        render() {
          console.log(this.props.movies)
          //const {data}  = this.props.movies;
          //console.log(data)
          if (this.props.movies && this.props.movies.length) {
            return (
              <View
                style={styles.scrollContainer}
              >
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                >
                  {this.props.movies.map(movie => (
                    <Movie movie={movie}/>
                  ))}
                </ScrollView>
              </View>
            );
          }
          console.log('Please provide images');
          return null;    
        }
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        scrollContainer: {
          height,
          marginTop:10
        },
        image: {
          width,
          height,
        },
      });