//to register form and input with js
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//event listener on submit 
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault(); //to prevent refreshing

    const location = search.value;
    
    messageOne.textContent="loading message";
    messageTwo.textContent='';
    
    let url = '/weather?address='+location;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})