const theatreId = 900;
const showingsDIV = document.querySelector(".showings")


fetch("https://evening-plateau-54365.herokuapp.com/theatres/900")
.then(res => res.json())
.then(moviesArrJSON => {
    // debugger
    moviesArrJSON.showings.forEach(showing => {
        displayOneShowing(showing)
    });
})

function displayOneShowing(showing) {
    // debugger
    showingsDIV.innerHTML += `
    <div class="card">
        <div class="content">
            <div class="header">
                ${showing.film.title}
            </div>
            <div class="meta">
                ${showing.film.runtime} minutes
            </div>
            <div class="description" data-id="${showing.id}">
                <span id="js-remaining">${(showing.capacity - showing.tickets_sold)}</span> remaining tickets
            </div>
            <span class="ui label">
                ${showing.showtime}
            </span>
        </div>
        <div class="extra content">
            <div class="ui blue button" data-id="${showing.id}"> Buy Ticket </div>
            
        </div>
    </div>
    `
}
// ${(showing.capacity - showing.tickets_sold) === 0 ? "Sold Out" : "Buy Ticket"}

showingsDIV.addEventListener("click", handleBuy)
function handleBuy(evt) {
    let id = evt.target.dataset.id
    let curRemaining = parseInt(evt.target.parentElement.parentElement.querySelector("#js-remaining").innerText)
    // debugger

    if (evt.target.tagName === "DIV" && evt.target.className === "ui blue button") {

        if(curRemaining > 0){
            fetch("https://evening-plateau-54365.herokuapp.com/tickets",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    showing_id: id
                })
            })
            .then(res => res.json())
            .then(createdTicket => {
                curRemaining = curRemaining - 1
                evt.target.parentElement.parentElement.querySelector("#js-remaining").innerText = curRemaining
                
                if (curRemaining === 0) {
                    evt.target.classList.remove("button")
                    evt.target.innerText = "Sold Out"
                }
            })
        }
    }
    
}