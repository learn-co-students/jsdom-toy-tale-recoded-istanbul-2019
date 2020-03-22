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
});

//document.addEventListener('DOMContentLoaded', () => { 

    fetch ("http://localhost:3000/toys")
    .then(response => response.json())
    .then ((data) => {

      let div=document.createElement('card'); 
      div.appendChild(div)
      let name=document.createElement('h2');
      div.appendChild(name);
      let img = document.createElement('img')
      div.appendChild(img)
      let p= document.createElement('p')
      div.appendChild(p)
      let btn=document.createElement('button');
      

    
    
    
    }
    })



