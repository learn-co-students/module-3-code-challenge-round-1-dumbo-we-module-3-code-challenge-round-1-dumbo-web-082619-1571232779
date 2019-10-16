const theatreId = 902;
let jsonify = (res) => res.json()
let cardShowing = document.querySelector(".ui-cards-showings")


//STEP 1 GET /theatres/:id
fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(jsonify)
    .then((movieList) => {
        
        movieList.showings.forEach((movie) => {
           movieCard(movie)
           console.log(movie)
            if (movie.tickets_sold > movie.capacity){
               throw Error("This showing is sold out");
            }
        })
    })

cardShowing.addEventListener("click", (evt) => {
    console.log(evt.target)
    let id = evt.target.dataset.id
    let showingNumber = parseInt(evt.target.parentElement.parentElement.querySelector(".description").innerText) + 1
   
    if (evt.target.className === "ui blue button"){
        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                
                showing_id: id
            })
            
        })
        .then(jsonify)
        .then((createdTicket) => {
            evt.target.parentElement.parentElement.querySelector(".description").innerText = showingNumber

        })
        .catch(error => 
            "This showing is sold out"
            // console.log("hi", error.message)
        )
        //got 422 error status . how to raise an error

//Created Ticket
//    { id: 75584,
//     showing_id: 8727,
//     created_at: "2019-10-16T14:24:44.919Z"}
    }
})



function movieCard(movie){
    cardShowing.innerHTML += `
    <div data-id="${movie.id}" class="card">
        <div data-id="${movie.id}" class="content">
            <div class="header">
            Title:  ${movie.film.title}
            </div>
            <div class="meta">
            RunTime: ${movie.film.runtime}
            </div>
            <div data-id="${movie.id}" class="description">
            ${movie.tickets_sold }
            </div>
            <span class="ui label">
            Show Time: ${movie.showtime}
            </span>
        </div>
        <div class="extra content">
            <div data-id="${movie.id}" class="ui blue button">Buy Ticket</div>
        </div>
    </div>`

   

}