const theatreId = 908;
const getURL = "https://evening-plateau-54365.herokuapp.com/theatres/"
const postURL = "https://evening-plateau-54365.herokuapp.com/tickets"

fetch(getURL + theatreId)
  .then(resp => resp.json())
  .then(moviesObj => {

    moviesObj['showings'].forEach((showing) => {
      createCardDOM(showing)
    })
  })

  function createCardDOM(showing){
    let cardsMainDIV = document.getElementById('cardsMainDIV')
    let cardDIV = document.createElement('div')
    let buttonDIV = document.createElement('div')
    let buyButton = document.createElement('button')
    let tickets = showing['capacity'] - showing['tickets_sold']

    cardDIV.className = "card"
    buttonDIV.className = "extra content"
    buyButton.className = "ui blue button"

    if (tickets > 0) {
      buyButton.innerText = "Buy Ticket"
    } else {
      buyButton.innerText = "Sold Out"
      buyButton.disabled = true;

    }


    // buyButton.innerText = (tickets > 0 ? "Buy Ticket" : "Sold Out")

    cardDIV.innerHTML += `

    <div class="content">
      <div class="header">
        ${showing['film']['title']}
      </div>
      <div class="meta">
        ${showing['film']['runtime']} minutes
      </div>
      <div class="description">
        ${tickets}
      </div>
      <span class="ui label">
        ${showing['showtime']}
      </span>
    </div>

    `

    // addEventListenerToButton(cardDIV, showing)

    buyButton.addEventListener("click", (evt) => {
      let remainigDIV = cardDIV.querySelector('.description')
      remainigDIV.innerText -= 1

      buyButton.disabled = (remainigDIV.innerText > 0 ? false : true)

      fetch(postURL, {
        method: 'POST',
        body: JSON.stringify({
          showing_id: showing.id
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(obj => {
        console.log(obj);
      })


    })

    buttonDIV.append(buyButton)
    cardDIV.append(buttonDIV)
    cardsMainDIV.append(cardDIV)

  }










// <div class="card">
//   <div class="content">
//     <div class="header">
//       (Film Title)
//     </div>
//     <div class="meta">
//       (Runtime) minutes
//     </div>
//     <div class="description">
//       (Num Tickets) remaining tickets
//     </div>
//     <span class="ui label">
//       (Showtime)
//     </span>
//   </div>
//   <div class="extra content">
//     <div class="ui blue button">Buy Ticket</div>
//   </div>
// </div>
