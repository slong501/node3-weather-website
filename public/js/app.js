//fetch('http://puzzle.mead.io/puzzle').then((response) => {
//    response.json().then((data) => {
//        console.log(data)
//    })


//})

//fetch('http://localhost:3000/weather?address=brisbane').then((response) => {
//    response.json().then((data) => {
//        if (data.error) {
//            return console.log(data.error)
//        }

//        console.log(data.location)
//        console.log(data.forecast)

//    })

//})





//Select relevant elements from document to use below
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//Use selected form to add submit event listener, >> addEventListener(event type, callback(event object))
weatherForm.addEventListener('submit', (e) => {
    //Prevent default behaviour of reloading page 
    e.preventDefault()
    //Use value from search field selected above
    const location = search.value

    //Set loading message and clear second message content for time between form submit and API return
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //Use weather-app HTTP JSON endpoint to search by location string and return forecast string
    // query address=string
    //return JSON{location string, forecast string}
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //Write error content if endpoint returns with an error and return from function
               return messageOne.textContent = data.error
            }

            //Write forecast location string and forecast string to page, selected from above
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})

