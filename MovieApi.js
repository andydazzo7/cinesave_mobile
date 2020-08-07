const apikey = '0f2ea782083e8317e89fd56b056ffd93';
function pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function time_convert(num)
 { 
    let id='AM'
  let hours = Math.floor(num / 60);
  if(hours > 12)
  {
      hours= hours %12;
      id='PM'
  }  
  let minutes = (num % 60);
  minutes = pad(minutes, 2);
  return hours + ":" + minutes + ' ' + id;         
}
function getdiscount(fullness){
    var ret = 58.73 /(1 + (0.087 * (Math.exp(fullness - 31.17))));
   // console.log(ret);
    return ret/100;
}
let MovieApi={

    getImage(movie){
        return(fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movie}&language=en-US&page=1&include_adult=false`).then(response => response.json()
        ).then(jsonResponse=> {
            //console.log(jsonResponse);
            return jsonResponse.results[0].poster_path})
        );
    },
    getRelease(movie){
        return(fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movie}&language=en-US&page=1&include_adult=false`).then(response => response.json()
        ).then(jsonResponse=> {
            //console.log(jsonResponse);
            return jsonResponse.results[0].release_date})
        );
    },
    getPop(movie){
        return(fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movie}&language=en-US&page=1&include_adult=false`).then(response => response.json()
        ).then(jsonResponse=> {
           // console.log(jsonResponse);
            return jsonResponse.results[0].popularity})
        );
    },
    getTops(){
        return(fetch('https://dry-tor-14403.herokuapp.com/topmovies').then(response=>response.json()).then(jsonResponse=>{
            //console.log(jsonResponse);
            return jsonResponse.map(movies =>({
                image: '',
                title: movies.title,
                price: movies.price,
                discountedPrice: (parseFloat(movies.price) * (getdiscount(movies.avg_fullness))).toFixed(2),
                time: time_convert(movies.time),
                imdb: movies.imdb_rating, 
            }));
        })
        );
    },
    getId(movie){
        return(fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movie}&language=en-US&page=1&include_adult=false`).then(response => response.json()
        ).then(jsonResponse=> {
            //console.log(jsonResponse);
            return jsonResponse.results[0].id})
        );
    },
    getOverview(movie){
        return(fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movie}&language=en-US&page=1&include_adult=false`).then(response => response.json()
        ).then(jsonResponse=> {
            //console.log(jsonResponse);
            return jsonResponse.results[0].overview})
        );
    },
    getUserInfo(user){
        return fetch(`https://dry-tor-14403.herokuapp.com/users/${user}`).then(response=>response.json()).then(jsonResponse=>{
            //console.log(jsonResponse);
            return {
                moviesSeen: jsonResponse[0].moviesSeen,
                moneySaved: jsonResponse[0].moneySaved
            }
        })
    },
    getUserMovies(user){
        return fetch(`https://dry-tor-14403.herokuapp.com/movies/${user}`).then(response=>response.json()).then(jsonResponse=>{
            //console.log(jsonResponse);
            return jsonResponse.map(movies=>{
                return {
                    title:movies.movie,
                    rating: movies.rating
                }
            })
        })
    },
    addUserMovie(user, movie){
        return fetch(`https://dry-tor-14403.herokuapp.com/buy/${user}/${movie}`, {method : 'POST'});
    },
    rateMovie(user,movie, rating){
        if (rating > 10){
            rating = 10
        }
        else if(rating < 0){
            rating = 0
        }
        return fetch(`https://dry-tor-14403.herokuapp.com/rating/${user}/${rating}/${movie}`, {method:'PUT'})
    },
    getAllMovies(){
        return(fetch('https://dry-tor-14403.herokuapp.com/allmovies').then(response=>response.json()).then(jsonResponse=>{
            //console.log(jsonResponse);
            return jsonResponse.map(movies =>({
                image: '',
                title: movies.title,
                price: movies.price,
                discountedPrice: (parseFloat(movies.price) * (getdiscount(movies.avg_fullness))).toFixed(2),
                time: time_convert(movies.time),
                imdb: movies.imdb_rating, 
            }));
        })
        );
    },
    getAllTitles(){
        return fetch(`https://dry-tor-14403.herokuapp.com/allmovieTitle`).then(response=>response.json()).then(jsonResponse=>{
            //console.log(jsonResponse);
            return jsonResponse.map(movies=>movies.title);
        })
    }, 
    addMovie(user, discount){
        return fetch(`https://dry-tor-14403.herokuapp.com/users/add/${user}/${discount}`, {method : 'PUT'});
    },
    getGenreRatingRuntime(id){
        return(fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`).then(response => response.json()
        ).then(jsonResponse=> {
            //console.log(jsonResponse);
            return{
                genre: jsonResponse.genres[0].name,
                runtime: jsonResponse.runtime
            }})
        );
    },
    getBackDrop(movie){
        return(fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movie}&language=en-US&page=1&include_adult=false`).then(response => response.json()
        ).then(jsonResponse=> {
           // console.log(jsonResponse);
            return jsonResponse.results[0].backdrop_path})
        );
    },
    getSearch(movie){
        return(fetch(`https://dry-tor-14403.herokuapp.com/search/${movie}`).then(response=>response.json()).then(jsonResponse=>{
            //console.log(jsonResponse);
            return jsonResponse.map(movies =>({
                image: '',
                title: movies.title,
                price: movies.price,
                discountedPrice: (parseFloat(movies.price) * (getdiscount(movies.avg_fullness))).toFixed(2),
                time: time_convert(movies.time),
                imdb: movies.imdb_rating
            }));
        })
        );
    }
}
export default MovieApi;