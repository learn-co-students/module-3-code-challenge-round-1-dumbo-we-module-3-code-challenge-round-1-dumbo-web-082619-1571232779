const theatreId = 907;
const showingsDiv = document.querySelector(".showings")

listMovies()

function listMovies(){
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(res => res.json())
    .then(theater => {
        
        theater.showings.forEach(showings => {
            showingDisplay(showings)
        });
    })

}

function showingDisplay(showings){
    const newUl = document.createElement("ul")
    newUl.classList.add("showings")
    const newLi = document.createElement("li")
    newLi.setAttribute("data-id", `${showings.id}`)
    newLi.innerHTML += `<div class="card">
    <div class="content">
      <div class="header">
        ${showings.film.title}
      </div>
      <div class="meta">
      ${showings.film.runtime}
      </div>
      <div data-id=${showings.id} class="description">
      ${showings.capacity - showings.tickets_sold}
      </div>
      <span class="ui label">
      ${showings.showtime}
      </span>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>
  </div>`

  newLi.addEventListener("click", (evt) => {
      console.log(newLi)
      
      if(evt.target.className === "ui blue button"){
        let remTix = parseInt(newLi.children[0].children[0].children[2].innerText)
        newTixAmt = remTix - 1
        newLi.children[0].children[0].children[2].innerText = newTixAmt
      }
      
      fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify {
            showing_id: `${showings.id}`
          }
      })
  })

  newUl.append(newLi)
  showingsDiv.append(newUl)
}
