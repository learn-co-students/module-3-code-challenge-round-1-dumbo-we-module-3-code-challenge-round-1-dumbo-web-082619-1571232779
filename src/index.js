//Theatre ID that I pull my API from--------------------------------------------------------------->
const theatreId = 911;

//Where I will display each showing---------------------------------------------------------------->
const showingsUL = document.querySelector('.showings')

//Calls on a function to load the browser with the data from my API-------------------------------->
initialLoad()

//List of functions I will be calling---------------------------------------------------------------
//------------------------------------------------------------------------------------------------->

//Inital load of the browser----------------------------------------------------------------------->
function initialLoad(){
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
        .then(resp => resp.json())
        .then(respJSON => {
            respJSON.showings.forEach(createCard)
        })
}

//Creates a display card for each showing in my API------------------------------------------------>
function createCard(obj){
    //Display container---------------------------------------->
    let cardDIV = document.createElement('div')
        cardDIV.className = 'card'
        cardDIV.dataset.id = obj.id

        //Content block---------------------------------------->
        let contentBlock = document.createElement('div')
            contentBlock.className = 'content'

            //Content Header----------------------------------->
            let cardHeader = document.createElement('div')
                cardHeader.className = 'header'
                cardHeader.innerText = obj.film.title

            //Show Duration------------------------------------>
            let showDuration = document.createElement('div')
                showDuration.className = 'meta'
                showDuration.innerText = `${obj.film.runtime} minutes`

            //Remaining tickets-------------------------------->
            let tixRemaining = document.createElement('div')
                tixRemaining.className = 'description'
                tixRemaining.id = `remaining_tix_${obj.id}`
                tixRemaining.innerText = ` remaining tickets`

                let tixSpan = document.createElement('span')
                    tixSpan.innerText = obj.capacity - obj.tickets_sold

                tixRemaining.prepend(tixSpan)

            //ShowTime----------------------------------------->
            let showTime = document.createElement('span')
                showTime.className = 'ui label'
                showTime.innerText = obj.showtime 

        contentBlock.append(cardHeader, showDuration, tixRemaining, showTime)

        //Extra Content (Buy Button)--------------------------->
        let extraContent = document.createElement('div')
            extraContent.className = 'extra content'

            let buyBtn = document.createElement('div')
                buyBtn.className = 'ui blue button'
                obj.tickets_sold === obj.capacity ? buyBtn.innerText = 'Sold Out' : buyBtn.innerText = 'Buy Ticket'
                buyBtn.addEventListener('click', evt => {
                    buyTicket(obj)
                })

        extraContent.append(buyBtn)

    cardDIV.append(contentBlock, extraContent) 
    showingsUL.append(cardDIV)   
}

//Function to buy a ticket------------------------------------------------------------------------->
function buyTicket(obj){
    let currentShowing = document.querySelector(`[data-id="${obj.id}"]`)
    let tixRemaining = currentShowing.querySelector(`#remaining_tix_${obj.id}`)
    let tix = tixRemaining.querySelector('span')
    if (tix.innerText === '0') {return window.alert(`"error": That showing is sold out`)}
    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: parseInt(obj.id)
        })
    })
    .then(resp => resp.json())
    .then(respJSON => {
        let currentShowing = document.querySelector(`[data-id="${obj.id}"]`)
        let tixRemaining = currentShowing.querySelector(`#remaining_tix_${obj.id}`)
        let tix = tixRemaining.querySelector('span')
            if (tix.innerText === '0'){return}
            tix.innerText = parseInt(tix.innerText) - 1
        if (tix.innerText === '0'){
            let btn = currentShowing.querySelector('.button')
            btn.innerText = 'Sold Out'
        }
    })
}