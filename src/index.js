const theatreId = 899;

loadPage()

function loadPage(){
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(res => res.json())
    .then(resjson =>{
        let showings = resjson.showings
        showings.forEach(show => {
            movieCardDiv(show)
            console.log(show)
        })
    })
}
let cardShowings = document.querySelector(".ui-cards-showings")
console.log(cardShowings)

function movieCardDiv(shows){
    let showFilms = shows.film 
    
    const divCard = document.createElement("DIV")
    divCard.className = "card"
    const divContent = document.createElement("DIV")
    divContent.className = "content"
    const divHeader = document.createElement("DIV")
    divHeader.className ="header"

    divHeader.innerText = showFilms.title
    const divMeta = document.createElement("DIV")
    divMeta.className= "meta"
    divMeta.innerText= `runtime: ${showFilms.runtime}`
    const divDescription = document.createElement("DIV")
    divDescription.className="description"
    divDescription.innerText = `${shows.capacity - shows.tickets_sold} tickets left`
    const spanUiLabel = document.createElement("SPAN")
    spanUiLabel.className= "ui-label"
    spanUiLabel.innerText=`showtime: ${shows.showtime}`
    const divExtraContent = document.createElement("DIV")
    divExtraContent.className="extra content"
    const divUiBlueButton = document.createElement("DIV")
    divUiBlueButton.className = "ui-blue-button"


    if(shows.capacity === shows.tickets_sold){

        divUiBlueButton.innerText="sold out"
        divUiBlueButton.removeEventListener()
    }else{
        divUiBlueButton.innerText="Buy Ticket"

    }
    divCard.appendChild(divContent)
    divContent.appendChild(divHeader)
    divContent.appendChild(divMeta)
    divContent.appendChild(divDescription)
    divContent.appendChild(spanUiLabel)
    divContent.appendChild(divUiBlueButton)
   cardShowings.appendChild(divExtraContent)
    cardShowings.appendChild(divCard)



    divUiBlueButton.addEventListener("click",evt =>{

        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                showing_id: shows.id

            })
        })
        .then(res => res.json())
        .then(resjson =>{
            let l = parseInt(divDescription.innerText) 
           
            divDescription.innerText = `${l - 1} tickets left`
        
            console.log(resjson)
        })
    })
}