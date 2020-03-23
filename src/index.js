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

  //ADD TOY INFO TO CARD
    fetch ("http://localhost:3000/toys")
    .then(response => response.json())
    .then ((data) => {
      //console.log(data)
    const html = data
    .map(toy => {
    return `<div class="card"> 
            <h2>Name: ${toy.name}</h2>
            <p>Image:<img src="${toy.image}"style=width:100%;/></p>
            <p>Likes: ${toy.likes}</p>   
            </div>` })  

    //console.log(html);
    document
    .querySelector('#toy-collection')
    .insertAdjacentHTML("afterbegin",html);
    }) 
    .catch(error => {
      console.log(error);
    });

  //ADD A NEW TOY
  
  /*fetch('http://localhost:3000/toys', {
    method: 'POST', 
    body: JSON.stringify({
      name: "",
      image: "",
      likes: ""
    }), 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json));

*/

//INCREASE TOYS LIKES
