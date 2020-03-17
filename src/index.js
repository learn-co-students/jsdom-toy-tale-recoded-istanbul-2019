let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(data=>{data.map(toy=>{
    const toyCard = `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>`
  document.querySelector('#toy-collection').insertAdjacentHTML('afterbegin', toyCard)
  })
  })

  document.querySelector('.submit').addEventListener('click',toyPost)

  function toyPost(){
    if(document.querySelector(".container").style.display === "block"){
      fetch('http://localhost:3000/toys',{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: "application/json"
     }, 
     body: JSON.stringify({
       "name": document.querySelectorAll('.input-text')[0].value,
       "image": document.querySelectorAll('.input-text')[1].value,
       "likes": 0
  
     })
     
    })
  }
  }

  document.querySelector('.like-btn').addEventListener('click',(ele)=>increaseLike(ele))

  function increaseLike(ele){
    ele.preventDefault()
  fetch(`http://localhost:3000/toys/${ele.target.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    }, 
    body: JSON.stringify({
      "likes": parseInt(ele.target.previousElementSibling.innerHTML) + 1
    })
   })
   .then(res => res.json())
   .then(res=>ele.target.previousElementSibling.innerHTML = `${parseInt(ele.target.previousElementSibling.innerHTML) + 1} likes`)
  }




})









