document.addEventListener('DOMContentLoaded', (event) => {
const theatreId = 896;
let showingsDiv = document.querySelector(".movie-showings")
fetch("https://evening-plateau-54365.herokuapp.com/theatres/896")
.then(res => res.json())
.then(showings => {
    showings.showings.forEach(showing => {
        let remain = `${(showing.capacity) - (showing.tickets_sold)}` 
        showingsDiv.innerHTML += `<div data-id=${showing.id} class="card">
        <div class="content">
          <div class="header">
            ${showing.film.title}
          </div>
          <div data-id=${showing.id} class="meta">
          ${showing.film.runtime}
          </div>
          <div data-id=${showing.id} class="description">
            <span>${remain}</span>
          </div>
          <span data-id=${showing.id}class="ui label">
            ${showing.showtime}
          </span>
        </div>
        <div class="extra content">
          <div data-id=${showing.id} id ="buy" class="ui blue button">Buy Ticket</div>
        </div>
      </div>`
        
    });

    let buyButton = document.querySelector("#buy")
    let tickets = document.querySelector(".description")
    let remainTickets = tickets.querySelector("span")
    buyButton.addEventListener("click", evt => {
        let id = evt.target.dataset.id
        if (remainTickets === 0){
            buyButton.disabled = true 
            console.log("That showing is sold out")}
        else 
        fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST", 
        header: {
            "Content-Type":"application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify({
            showing_id: parseInt(id)
        }) 
        })
        .then(res => res.json())
        .then(json => {
            remainTickets = parseInt(remainTickets) - 1
            tickets = remainTickets
        })
        // .catch(error => {
        //     if (remainTickets === 0){
        //         buyButton.disabled = true 
        //     console.error("That showing is sold out")}})
            // if (remainTickets === 0){
            //     buyButton.disabled = true 
            //     return "That showing is sold out"}
        
            // .catch(error) {
            //     // if (remainTickets === 0){
            // //     buyButton.disabled = true 
            // //     return "That showing is sold out"}
            // console.error(error)} 
           
    })

})

    







})
