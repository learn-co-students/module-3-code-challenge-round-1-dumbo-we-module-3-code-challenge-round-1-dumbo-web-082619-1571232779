const theatreId = 902;

let showingDiv = document.querySelector(".showings")

fetch("https://evening-plateau-54365.herokuapp.com/theatres/902")
  .then(r => r.json())
  .then(res => {
    //   console.log(res.showings);
    let response = res.showings

    for (let i of response) {
        console.log(i)
        showingDiv.innerHTML += `
        <div class="card">
        <div class="content">
          <div class="header">
            ${i.film.title}
          </div>
          <div class="meta">
            ${i.film.runtime}
          </div>
          <div class="description">
            ${i.tickets_sold}
          </div>
          <span class="ui label">
          ${i.showtime}
          </span>
        </div>
        <div class="extra content">
          <div class="ui blue button" data-id="${i.id}">Buy Ticket</div>
        </div>
        </div>
        `;
    }

  })


  setTimeout(() => {
    // let buttonSelector = document.querySelectorAll(".button")

    // buttonSelector.forEach(i => {
    //     i.addEventListener("click", (evt) => {
            
    //         let entireBoxInfo = evt.target.parentElement.parentElement;
    //         debugger
    //         console.log(entireBoxInfo["description"])

    //     })
    // })


    showingDiv.addEventListener("click", (evt) => {
        // console.log(evt.target.className)



        if (evt.target.className === "ui blue button"){
            // console.log("clicked")
            let cardSelector = evt.target.parentElement.parentElement
            debugger
            console.log(cardSelector.target)

            
            
            // fetch("https://evening-plateau-54365.herokuapp.com/theatres/902", {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify()
            // })
        }
        

    })

    










  }, 1000)


