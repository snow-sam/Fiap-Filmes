const api_key = '5109d5dd41ba04b8961cee31002d879e'
const language = 'pt-br'
const url_base = 'https://api.themoviedb.org/3'
const url_base_img = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'

let dados;
let divSinopse = document.querySelector("#divSinopse")
let lMenu = document.querySelector("#lMenu")

function Sinopse(filme) {
    let sinopse = document.createElement("div")
    sinopse.classList.add("sinopse")
    
    let poster = document.createElement("img")
    poster.src = url_base_img + filme.poster_path 
    poster.alt = `Poster do filme ${filme.title || filme.name}`
    
    
    let titulo = document.createElement("p")
    titulo.innerText = filme.title || filme.name

    let overview = document.createElement("h6")
    overview.innerText = filme.overview
    
    sinopse.appendChild(titulo)
    sinopse.appendChild(overview)
    
    
    divSinopse.appendChild(poster)
    divSinopse.appendChild(sinopse)
    return
}

function getSinopse(id){
    const movies = fetch(`${url_base}/movie/${id}?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => Sinopse(data, true))
}

function getSinopseS(id){
    const tv = fetch(`${url_base}/tv/${id}?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => Sinopse(data, true))
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
metodo = urlParams.get('type') == 1 ? getSinopse : getSinopseS 
metodo(urlParams.get('id'))


