const api_key = '5109d5dd41ba04b8961cee31002d879e'
const language = 'pt-br'
const url_base = 'https://api.themoviedb.org/3'
const url_base_img = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'

let dados;
let filmes = document.querySelector("#filmes")
let series = document.querySelector("#series")

function Card(filme, n_filme) {
    let card = document.createElement("div")
    card.classList.add("card")
    
    let a = document.createElement("a")
    a.href = `/Fiap-Filmes/detalhes.html?id=${filme.id}&type=${n_filme ? 1 : 2}`

    let poster = document.createElement("img")
    poster.src = url_base_img + filme.poster_path
    poster.loading = 'lazy'
    poster.href = `/Fiap-Filmes/detalhes.html?id=${filme.id}`
    if (n_filme)
        poster.alt = "Poster do filme " + filme.title
    else
        poster.alt = "Poster do filme " + filme.name
    
    
    let titulo = document.createElement("p")
    if (n_filme)
        titulo.innerText = filme.title
    else
        titulo.innerText = filme.name

    let divNota = document.createElement("div")
    divNota.classList.add("nota")
    
    let estrela = document.createElement("span")
    estrela.classList.add("material-icons")
    estrela.classList.add("estrela")
    estrela.innerText = "star"
    
    let nota = document.createElement("span")
    nota.innerText = filme.vote_average
    
    divNota.appendChild(nota)
    divNota.appendChild(estrela)
    
    let botao = document.createElement("a")
    botao.classList.add("botao")
    botao.href = `/Fiap-Filmes/detalhes.html?id=${filme.id}`
    botao.innerText = "Detalhes"
    
    a.appendChild(poster)
    card.appendChild(a)
    card.appendChild(titulo)
    card.appendChild(divNota)
    card.appendChild(botao)

    return card
}

function getMovies(){
    const movies = fetch(`${url_base}/movie/popular?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(filme => {
            filmes.appendChild(Card(filme, true))
        });
    })
}


function getSeries(){
    const tv_shows = fetch(`${url_base}/tv/popular?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(serie => {
            series.appendChild(Card(serie, false))
        });
    })
}

getMovies()
getSeries()

