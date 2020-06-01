const weatherForm = document.querySelector('form')
const search = document.querySelector('search')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  messageOne.textContent = 'Loading ... '
  messageTwo.textContent = ""

  fetch('/weather?address='+ search.value).then((response)=>{
    response.json().then((data=>{
      if(data.error){
        messageOne.textContent = data.error
        messageTwo.textContent = ""
      }else{
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    }))
  })
})

