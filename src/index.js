const theatreId = 909;
//  const movieList = document.getElementById('showings')
 console.log(movieList);
// let id = event.target.dataset.id
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/909`)
    .then(r => r.json())
    .then(renderMovies)

    const movieCollection = document.getElementById('showlist')
    function renderMovies(movies) {
        movieCollection.innerHTML = ""
      movies.forEach(function (show) {
        movieCollection.innerHTML += `<div class="card">
        <div class="content">
          <div class="header">
            ${show.title}
          </div>
          <div class="meta">
            ${show.runtime}
          </div>
          <div class="description">
            (Num Tickets) remaining tickets
          </div>
          <span class="ui label">
            ${show.time}
          </span>
        </div>
        <div class="extra content">
          <div data-id="${show.id} class="ui blue button">Buy Ticket</div>
        </div>
      </div>
       
      `
      })
    }