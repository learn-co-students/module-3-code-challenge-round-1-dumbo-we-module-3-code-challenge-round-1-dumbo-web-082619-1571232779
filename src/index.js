const theatreId = 895;

const movieBox = document.querySelector(".cards")


function getMovies() {
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/895`)
    .then(r => r.json())
    .then(e => {
        makeCards(e['showings'])
    })
}

getMovies()

function makeCards(arrayOfHash) {
    arrayOfHash.forEach(makeCard)
}


function makeCard(hash) {
    let tickets = hash.capacity - hash['tickets_sold']
    const standard = "Buy Tickets"
    const wonky = "SOLD OUT"
    let text
    if (tickets === 0) {
        text = wonky
    } else {
        text = standard
    }
    const newCard = document.createElement("div")
    newCard.classList = "card" 
    newCard.innerHTML = `
        <div class="content">
        <div class="header">
        ${hash.film.title}
        </div>
        <div class="meta">
        ${hash.film.runtime} minutes
        </div>
        <div class="description">
        ${tickets} remaining tickets
        </div>
        <span class="ui label">
        ${hash.showtime}
        </span>
        </div>
        <div class="extra content">
            <div class="ui blue button" data-id="${hash.id}">${text}</div>
        </div>
    `
    movieBox.append(newCard)
}

movieBox.addEventListener("click", e => {
    let tiks = parseInt(e.target.parentElement.parentElement.querySelector(".description").innerText)
    if (e.target.classList.value === "ui blue button" && tiks > 0) {     
        // let tikText = e.target.parentElement.parentElement.querySelector(".description").innerText
        const showId = e.target.dataset.id
        buyTicket(showId)
        e.target.parentElement.parentElement.querySelector(".description").innerText = `${tiks - 1} remaining tickets`
        
        if (tiks === 1) {
            e.target.innerText = `SOLD OUT`    
        }
    } else if (e.target.classList.value === "ui blue button" && tiks === 0) {
        alert('Sold Out')
    }
})

function buyTicket(showId) {
    fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method:  "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({
            showing_id: showId
          })
    })
}


