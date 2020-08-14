import { Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import React from 'react'
import {Movie} from './Movie'
import Carousel from 'react-native-snap-carousel';
import {ProfMovie} from './ProfMovie'


const { width } = Dimensions.get('window');
const height = width * 0.8
export class ProfMovies extends React.Component {
    constructor(props){
        super(props);
    }
  state = {
    currentIndex: 0,
  };
      _renderItem = ({item, index}) => {
        return (
          <ProfMovie movie={item} onChange={this.props.onChange}/>
        );
    }

      render () {
          return (
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.movies}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={250}
                layout={'stack'}
              />
          );
      }
    }
      //   render() {
      //     console.log(this.props.movies)
      //     //const {data}  = this.props.movies;
      //     //console.log(data)
      //     if (this.props.movies && this.props.movies.length) {
      //       return (
      //         <View
      //           style={styles.scrollContainer}
      //         >
      //           <ScrollView
      //             horizontal
      //             pagingEnabled
      //             showsHorizontalScrollIndicator={false}
      //             snapToInterval={200}
      //           >
      //             {this.props.movies.map(movie => (
      //               <Movie movie={movie}/>
      //             ))}
      //           </ScrollView>
      //         </View>
      //       );
      //     }
      //     console.log('Please provide images');
      //     return null;    
      //   }
      // }
  
 
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        scrollContainer: {
          height,
          marginTop:10,
          marginBottom:30
        },
        image: {
          width,
          height,
        },
      });