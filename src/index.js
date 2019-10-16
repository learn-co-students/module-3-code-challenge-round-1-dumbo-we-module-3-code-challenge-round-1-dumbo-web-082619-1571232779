const theatreId = 897;


let divShowing = document.getElementById("showings")

fetch("https://evening-plateau-54365.herokuapp.com/theatres/897")
.then(r => r.json())
.then(shows => {
    console.log(shows.showings);
    shows.showings.forEach(showings => {
        // console.log(shows);



        divShowing.innerHTML += 
        `
        <div class="card">
        <div class="content">
        <div class="header">
        ${showings.film.title}
        </div>
        <div class="meta"> Runtime- 
        ${showings.film.runtime} Minutes 
        </div>
        <div> Remain tickets </div>
        <div id = "remaining" class="description" value = "remain-tickets">
        ${`${showings.capacity} `-` ${showings.tickets_sold}`} 
        </div>
        <span class="ui label">
        ${showings.showtime}
        </span>
        </div>
        <div class="extra content">
        <div data-id = ${showings.id} id = "buyTicket" class="ui blue button">Buy Ticket</div>
        </div>
        </div>
        
        `
    });

 divShowing.addEventListener("click", (evt) => {
     let showId = evt.target.dataset.id 
     let remainTickets = document.querySelector("#remaining")
     let remainValue = parseInt(document.querySelector("#remaining").value)
    // let newTickets = `${`${showings.capacity} `-` ${showings.tickets_sold}`}`
    if (evt.target.id = "buyTicket")
    // debugger
    fetch("https://evening-plateau-54365.herokuapp.com/tickets/", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            showing_id: showId,

        }), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(r => r.json())
      .then( x => {
        let remainTickets = document.querySelector("#remaining")
        let re = parseInt(remainTickets.innerHTML)
        let remainValue = document.querySelector("#remaining").value
        // debugger;

        // divShowing.innerText +=
        // `
        // <div id = "remaining" class="description" value = "remain-tickets">
        // ${`${showings.capacity} `-` ${showings.tickets_sold}`} 
        // </div>
        // `

        // remainTickets.append(re - 1 )
        remainTickets.innerText  = re - 1 
        
      })




    

    





 })

 


})
