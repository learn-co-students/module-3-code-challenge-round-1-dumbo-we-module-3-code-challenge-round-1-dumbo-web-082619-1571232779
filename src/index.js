const theatreId = 898;

document.addEventListener('DOMContentLoaded', () => {
    showingsLi = document.querySelector('.showings')
    fetch('https://evening-plateau-54365.herokuapp.com/theatres/898')
    .then(resp => {
        return resp.json()})
    .then(showings => {
        for( var i = 0; i < showings.showings.length; i++){
        
        showingsLi.innerHTML += `
        <div class="card">
  <div class="content">
    <div class="header">
      ${showings.showings[i].film.title}
    </div>
    <div class="meta">
      ${showings.showings[i].film.runtime} minutes
      
    </div>
    <div class="description">
    ${showings.showings[i].capacity - showings.showings[i].tickets_sold} remaining tickets
    </div>
    <span class="ui label">
    ${showings.showings[i].showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button" id='${showings.showings[i].id}'>Buy Ticket</div>
  </div>
</div>`  
}

buyTicketbtn = document.querySelector(".button")

buyTicketbtn.addEventListener('click', (event) => {
    event.preventDefault()
    if(event.target.id === buyTicketbtn.id){
        ticketsLeft = document.querySelector(".description").innerHTML
        
       
       
        fetch('https://evening-plateau-54365.herokuapp.com/tickets',{
            
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
            
                
            
                
            
                
        
        })

        // showings.showings[i].tickets_sold + 1
    }

    debugger
    
})
    })
    });
