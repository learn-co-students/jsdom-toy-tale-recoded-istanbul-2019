let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

/** Fetch Andy's Toys */

document.addEventListener("DOMContentLoaded", function() { fetchToys(); })

function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(json => addingToys(json))
}

function addingToys(json) {
  let collection = document.getElementById("toy-collection");

  for (const toy of json) {
    let div = document.createElement('div');
    div.classList.add('card');

    let h2 = document.createElement('h2');
    collection.appendChild(h2);   
    h2.innerHTML = toy.name;
    console.log(toy.name);
    
    let img = document.createElement("img");
   collection.appendChild(img);   
    img.src = toy.image;
    img.classList.add('toy-avatar');

    let p = document.createElement("p");
    collection.appendChild(p); 
    p.innerHTML = `${toy.likes} likes`

    let button = document.createElement("button");
    collection.appendChild(button);
    div.classList.add('like-btn');
    p.innerHTML = "Like";
  }
}

/** Add a New Toy */

let inputs = document.querySelectorAll('input');

inputs[2].addEventListener('click', () => {
  let formData = {
    name: inputs[0].value,
    image: inputs[1].value,
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

  fetch("http://localhost:3000/toys", configObj)

})



