document.addEventListener('DOMContentLoaded', (event) => {
  getShowings()
})

const theatreId = 906
const showingsDiv = document.querySelector('.showings')

function getShowings() {
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(response => response.json())
  .then(showingsJson => {
    showingsJson.showings.forEach(showing => {
        addShowingToShowingsDiv(showing)
    }) 
  })
}


function addShowingToShowingsDiv(showing) {
  let showingDiv = document.createElement('div')
  
  showingDiv.className = 'card'
  showingDiv.innerHTML = 
    `<div class="content">
      <div class="header">
        ${showing.film.title}
      </div>
      <div class="meta">
        ${showing.film.runtime}
      </div>
      <div class="description">
        <span class='remtix'>${showing.capacity - showing.tickets_sold}</span> remaining tickets
      </div>
      <span class="ui label">
        ${showing.showtime}
      </span>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>`
  
  showingDiv.addEventListener('click', (event) => {
    let updatedTix = parseInt(showingDiv.querySelector('.remtix').innerText)
    
    if (event.target.className === 'ui blue button') {
      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          showing_id: showing.id
        })
      })
      .then(response => response.json())
      .then(updatedShowing => {
        // I blew it. This doesn't work.
        console.log(showing.tickets_sold)
        updatedTix -= 1
      })
    } 
  })

  showingsDiv.append(showingDiv)
}





