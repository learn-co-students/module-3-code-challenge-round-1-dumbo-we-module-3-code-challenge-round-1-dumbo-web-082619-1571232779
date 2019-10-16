const theatreId = 904;
const showingsCard = document.getElementById("ui cards showings")

console.log(showingsCard)
// this concerns me as it comes up null? I must not have used the correct getby? 


   fetch('https://evening-plateau-54365.herokuapp.com/theatres/904')
  .then(r => r.json())
  .then(showingsArray => {
    

    // showingsArray.forEach(showing) {
    //     toShowingCard
        
    // };
    
    console.log(showingsArray)

  })

    function toShowingCard(showing) {

    showingsCard.innerHTML += `
        <div class="card">
        <div class="content">
        <div class="header">
            ${film.title}
        </div>
      <div class="meta">
        (Runtime) minutes
      </div>
      <div class="description">
        (Num Tickets) remaining tickets
      </div>
      <span class="ui label">
        (Showtime)
      </span>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>
  </div> `

}


// UGHHHHHHHHHHHH
