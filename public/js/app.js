const weatherForm = document.querySelector('form')
const search = document.querySelector('form input[name=location]')
const pMessage1 = document.querySelector('#message-1')
const pMessage2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value;

    pMessage1.textContent = 'Loading forecast...'
    pMessage2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        if(!response.ok) {
            return pMessage1.textContent = 'Error when trying to fetch the forecast.'
        }

        response.json().then(({error, location, forecast}) => {
            if(error) {
                return pMessage1.textContent = error
            }

            pMessage1.textContent = location
            pMessage2.textContent = forecast
        })
    })
})