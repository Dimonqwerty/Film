$(document).ready(function () {
   $('#searchForm').on('submit', function (e) {
      let searchText = $('#searchText').val();
      searchMovies(searchText)
      e.preventDefault()
      this.reset()
      return false
   })
})

function searchMovies(searchText) {
   axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=da9fa326')
      .then((response) => {
         console.log(response)
         let movies = response.data.Search
         let output = ''
         $.each(movies, function (index, movie) {
            output += `
            <div class="col-md-3 my-5">
               <div class="well text-center">
                  <img src="${movie.Poster}" class="h-75">
                  <div class="h-50">
                     <h5 class="m-1 h-75">${movie.Title}</h5>
                     <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary h-25 btn-lg" href="#">More</a>
                  </div>
               </div>
            </div>
            `
         })
         $('#movies').html(output)
      })
}

function movieSelected(id) {
   sessionStorage.setItem('movieID', id)
   window.location = 'movie.html'
   return false
}

function getMovie() {
   let movieID = sessionStorage.getItem('movieID')

   axios.get('http://www.omdbapi.com/?i=' + movieID + '&apikey=915ac0d5')
      .then((response) => {
         console.log(response)
         let movie = response.data
         let output = `
            <div class="row">
               <div class="col-md-4">
                  <img src="${movie.Poster}" class="thumbnail">
               </div>
               <div class="col-md-8">
                  <h3>${movie.Title}</h3>
                  <div class="accordion accordion-flush" id="accordionFlushExample">
               <div class="accordion-item">
                  <h2 class="accordion-header">
                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Genre
                     </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse"
                     data-bs-parent="#accordionFlushExample">
                     <div class="accordion-body">${movie.Genre}</div>
                  </div>
               </div>
               <div class="accordion-item">
                  <h2 class="accordion-header">
                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Actors
                     </button>
                  </h2>
                  <div id="flush-collapseTwo" class="accordion-collapse collapse"
                     data-bs-parent="#accordionFlushExample">
                     <div class="accordion-body">${movie.Actors}
                     </div>
                  </div>
               </div>
               <div class="accordion-item">
                  <h2 class="accordion-header">
                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Director
                     </button>
                  </h2>
                  <div id="flush-collapseThree" class="accordion-collapse collapse"
                     data-bs-parent="#accordionFlushExample">
                     <div class="accordion-body">
                        ${movie.Director}
                     </div>
                  </div>
               </div>
               <div class="accordion-item">
                  <h2 class="accordion-header">
                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Writer
                     </button>
                  </h2>
                  <div id="flush-collapseThree" class="accordion-collapse collapse"
                     data-bs-parent="#accordionFlushExample">
                     <div class="accordion-body">
                        ${movie.Writer}
                     </div>
                  </div>
               </div>
            </div>
               </div>
            </div>
            <div class="row">
               <div class="well">
                  <h4>Сюжет</h4>
                  ${movie.Plot}
               </div>
               <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Трейлер на IMDB</a>
               <a href="index.html" class="btn btn-default">Повернутися до API</a>
            </div>
         `
         $('#movies').html(output)
      })
}