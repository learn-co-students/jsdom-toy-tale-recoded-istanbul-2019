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
    toyForm.addEventListener("submit", ()=>{
      let formData = {
        name: document.getElementsByTagName("input")[0].value,
        likes: 0,
        image:document.getElementsByTagName("input")[1].value,

      }
      let configObj ={
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
      console.log(configObj)
      fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();

      })
      .then(function(toys){
        toys.forEach(toy =>{
          const mainDiv = document.getElementById('toy-collection')
          const div = document.createElement('div');
          div.className = "card";
          const h2 = document.createElement('h2');
          h2.innerHTML = json["name"];
          const img = document.createElement('img')
          img.src = json["image"];
          img.className = "toy-avatar";
          const p = document.createElement('p')
          p.innerHTML = `${json["likes"]} Likes `;
          const button = document.createElement('button')
          button.innerHTML = "Like <3";
          button.className = "like-btn";
          button.addEventListener("click", function() {liked(json["id"], p)});
          div.appendChild(h2);
          div.appendChild(img);
          div.appendChild(p);
          div.appendChild(button);
          mainDiv.appendChild(div);
        })

      })







      });


    })
//post request




function liked(id, p) {
    let likes = parseInt(p.innerHTML.split(' ')[0]);
    p.innerHTML = `${parseInt(likes)+1} Likes `;
    let formData = {
      likes: `${parseInt(likes)+1}`
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(function(response) {
      return response.json();
    })
  }



//get request
fetch("http://localhost:3000/toys")
.then(function(res){
  return res.json();
})
.then(function(toys){
  console.log(toys);
  toys.forEach(toy=>{
    let mainDiv = document.getElementById('toy-collection')
    let div = document.createElement('div');
    div.className = "card";
    let h2 = document.createElement('h2');
    h2.innerHTML = toy.name;
    let img = document.createElement('img')
    img.src = toy["image"];
    img.className = "toy-avatar";
    let p = document.createElement('p')
    p.innerHTML = `${toy.likes} Likes `;
    let button = document.createElement('button')
    button.innerHTML = "Like <3";
    button.className = "like-btn";
    button.addEventListener("click", function() {liked(toy.id, p)});
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    mainDiv.appendChild(div);
  })

    });



});
