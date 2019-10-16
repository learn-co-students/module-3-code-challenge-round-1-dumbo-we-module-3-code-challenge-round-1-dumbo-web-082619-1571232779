const theatreId = 905;
const showingsDiv = document.querySelector(".showings")

loadShowings()

function loadShowings(){
    fetch("https://evening-plateau-54365.herokuapp.com/theatres/905")
    .then(r => r.json())
    .then(data => {
        showingsDiv.innerHTML = ""
        data.showings.forEach(show => {
            displayTitle(show)
        })
    })
}

function displayTitle(show){
    let filmTitle = show.film.title
    let runtime = show.film.runtime
    let remaining = show.capacity - show.tickets_sold
    let showtime = show.showtime

    showingsDiv.innerHTML += 
    `
    <div class="card" data-id="${show.id}">
        <div class="content">
            <div class="header">
                ${filmTitle}
            </div>
            <div class="meta">
                ${runtime} minutes
            </div>
            <div class="description">
                ${remaining} remaining tickets
            </div>
            <span class="ui label">
                ${showtime}
            </span>
        </div>
        <div class="extra content">
            <div class="ui blue button">Buy Ticket</div>
        </div>
    </div>
    `

    // Not enough time to correctly implement the disabled button
    // if(remaining == 0){
    //     let buyBtn = showingsDiv.querySelector(".button")
    //     buyBtn.className += "disabled"
    //     buyBtn.textContent = "Sold Out!"
    // }
}

showingsDiv.addEventListener("click", evt => {
    evt.preventDefault()
    let showId = evt.target.parentNode.parentNode.getAttribute("data-id")
    fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: showId
        })
    })
    .then(r => r.json())
    .then(data => {
        let newRemaining
        fetch("https://evening-plateau-54365.herokuapp.com/theatres/905")
        .then(r => r.json())
        .then(data => {
            data.showings.filter(show => {
                if (show.id == showId)
                    newRemaining = show.capacity - show.tickets_sold
            })
            let showCard = evt.target.parentNode.parentNode
            let runTimeEl = showCard.querySelector(".description")
            runTimeEl.innerHTML = `${newRemaining} remaining tickets`
        })    
    })
})