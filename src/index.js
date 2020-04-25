let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const url = 'http://localhost:3000/toys';
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
 
  // make GET fetch
  fetch(url)
  .then(response => response.json())
  .then(function(object){
    console.log(object);
    for (let key of object) {
      // 1- make new div with class card for each toy
      let cardDiv = document.createElement('div');
      cardDiv.setAttribute('class','card');
      let likeBtn = document.createElement('button');
      likeBtn.setAttribute('class', 'like-btn')
      likeBtn.innerText = "like <3"
      
      // cardDiv.innerHTML = key;
      // 2- add div to toy collection div
      let toyCollection = document.querySelector('#toy-collection');
      toyCollection.append(cardDiv);
      // 3- Each card should have the following child elements:
      cardDiv.innerHTML += `<h2> ${key.name}</h2> 
      <img src="${key.image}" class="toy-avatar"/>
      <p>${key.likes}</p>`;
      cardDiv.appendChild(likeBtn);
      // <button class="like-btn">like</button>
      likeBtn.addEventListener('click', function(e){
       e.preventDefault();
       console.log('baba')
       Patch(key.id, key.likes);
       console.log(key.id)
     })
    }
    
  })
// The POST fetch
  let newToyBtn = document.querySelector('form');
  let inputText = document.querySelector('[name="name"]');
  let inputImage = document.querySelector('[name="image"]');
  newToyBtn.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('baba')
    let formData = {
      name: inputText.value,
      image: inputImage.value,
      likes: 0
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(url, configObj)
    // .then(function(response){
    //   return response.json();
    // })

  })

  // The POST fetch
  
  function Patch(id, likes) {
    let formDataPatch = {
      likes:  likes+1
    }
    let confObjPatch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formDataPatch)
    }
    console.log(id)
    
    fetch(`${url}/${id}`, confObjPatch)
    
  }


  


});
