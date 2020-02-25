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

    let img = document.createElement("img");
    container.appendChild(img);   
    img.src = toy.image;
    img.classList.add('toy-avatar');

    let p = document.createElement("p");
    container.appendChild(p); 
    p.innerHTML = `${toy.likes} likes`

    let button = document.createElement("button");
    container.appendChild(button);
    div.classList.add('like-btn');
    p.innerHTML = "Like";
  }
}



