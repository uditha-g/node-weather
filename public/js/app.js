const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')

const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'
    const address = search.value
    const url = new URL('http://localhost:3000/weather')
    url.searchParams.append('address', address)
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = JSON.stringify(data)
            }
        })
})