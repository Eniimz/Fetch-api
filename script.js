let all_movies_div = document.querySelector('.movies')
let search_btn = document.querySelector(".btn-outline-success");
let input_search = document.querySelector(".form-control");
let container = document.querySelector(".container");


const apikey = '67d32b4051fc303bfa54b35126171a85';
const base_url = 'https://api.themoviedb.org/3';
const api_url_discover = 'https://api.themoviedb.org/3/discover/movie?api_key=67d32b4051fc303bfa54b35126171a85';
const api_url_now_playing = 'https://api.themoviedb.org/3/movie/top_rated?api_key=67d32b4051fc303bfa54b35126171a85';
const img_base_url = "https://image.tmdb.org/t/p/original"; 
                                                // ^^>has  to be connected to a poster path to point to url of an image (poster of the movie)



const options = {


    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: '67d32b4051fc303bfa54b35126171a85'
    }
  };

  all_movies_div.innerHTML = '';

try{
    
    async function getapiDiscover(){

    let response = await fetch(api_url_discover, options);
    let result = await response.json();
    let list_of_movies = result.results;

    list_of_movies.map((movie) => {

        //console.log("wrk");

    all_movies_div.innerHTML += 
    `<div class="card">
    <img src="${img_base_url + movie.poster_path}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>
      <p class="card-text"></p>
    </div>
    </div>`

    
        
    })

    document.createElement('p').innerHTML = "End of discover channel";
}

    async function getapiNowPlaying(){

    let response_now_playing = await fetch(api_url_now_playing, options);
    let result_now_playing = await response_now_playing.json();
    let list_of_now_playing = result_now_playing.results;

    list_of_now_playing.map((movie) => {

    all_movies_div.innerHTML += 
    `<div class="card">
    <img src="${img_base_url + movie.poster_path}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>
      <p class="card-text"></p>
    </div>
    </div>`


    })

    document.createElement('p').innerHTML = "End of Now playing channel";

}

getapiDiscover();
getapiNowPlaying();


}catch{

    console.error(error);

}

/* function searchmovie(){
    
} */

let is_clicked = false;




search_btn.addEventListener("click", (e) =>{

    e.preventDefault();

    console.log(input_search.value);

    async function searchApi(){

        let search_result_div = document.querySelector(".search_result");
        let seach_url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${input_search.value}`;
        let search_response = await fetch(seach_url, options)
        let search_result = await search_response.json();
        let list_result = search_result.results;

        search_result_div.innerHTML = '';

        
        list_result.map((list_result_el) => {


        all_movies_div.style.display = "none";
        
        let search_result_card = document.createElement('div');
        search_result_card.classList.add('card');

        search_result_card.innerHTML = 
        `
        <img src="${img_base_url + list_result_el.poster_path}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${list_result_el.original_title}</h5>
          <p class="card-text"></p>
        `

        search_result_div.appendChild(search_result_card);

        
        

        })
        

        
        
    }

    searchApi();
    let is_clicked = true;



})


