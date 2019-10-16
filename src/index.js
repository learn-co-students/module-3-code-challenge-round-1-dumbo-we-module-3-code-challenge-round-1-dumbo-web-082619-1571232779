const theatreId = 903
const showingsDiv = document.querySelector(".showings")


function getTheatreData()
{

    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(res => res.json())
    .then((data) => 
    {

        data.showings.forEach((showing) => 
        {
            renderShowingCard(showing)
        })

    })

}


function createTicket(showing)
{

    let ticketsSold = showing.tickets_sold
    let capacity = showing.capacity
    let remainingTickets = capacity - ticketsSold
    let ticketsSoldOut = remainingTickets === 0

    fetch('https://evening-plateau-54365.herokuapp.com/tickets', 
    {

        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(
        {
            showing_id: showing.id
        })

    })
    .then(res => res.json())
    .then((ticket) => 
    {
        let card = document.querySelector(`div[data-id="${ticket.showing_id}"]`)
        let description = card.querySelector(".description")
        let button = card.querySelector(".button")
        button.innerText = `${ticketsSoldOut ? "Sold Out" : "Buy Ticket"}`
        description.innerText = `${remainingTickets} remaining tickets`
        debugger
        // OR

        // showingsDiv.innerHTML = null
        // getTheatreData()
    })

}


function renderShowingCard(showing)
{

    let remainingTickets = (showing.capacity - showing.tickets_sold)
    let ticketsSoldOut = (remainingTickets === 0)

    let card = document.createElement("div")
    card.className = "card"
    card.dataset.id = showing.id

    let content = document.createElement("div")
    content.className = "content"

    let header = document.createElement("div")
    header.className = "header"
    header.innerText = showing.film.title

    let meta = document.createElement("div")
    meta.className = "meta"
    meta.innerText = `${showing.film.runtime} minutes`

    let description = document.createElement("div")
    description.className = "description"
    description.innerText = `${remainingTickets} remaining tickets`

    let label = document.createElement("span")
    label.className = "ui label"
    label.innerText = showing.showtime

    content.append(header, meta, description, label)

    let extra = document.createElement("div")
    extra.className = "extra content"

    let button = document.createElement("div")
    button.className = "ui blue button"
    button.innerText = ticketsSoldOut ? "Sold Out" : "Buy Ticket"
    button.addEventListener("click", () => 
    {
        createTicket(showing)
    })

    extra.append(button)

    card.append(content, extra)

    showingsDiv.append(card)

}


window.addEventListener("DOMContentLoaded", () => 
{

    getTheatreData()

})
