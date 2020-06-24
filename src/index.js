let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      header: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify({
        "name": "",
        "image": "",
        "likes": ","
      })
    });
    
    
    
    
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    let toyCollection = document.getElementById("toy-collection");
    toys.forEach( toy => {
      let toyDiv = document.createElement("div");
      toyDive.setAttribute("class", "card");

      let toyName = document.createElement('h2');
      toyName.innerText = toy.name;
      toyDiv.appendChild(toyName);



    let toyImg= document.createElement("img");
    toyImg.setAttribute("src", toy.image);
    toyImg.setAttribute("class", "toy-avatar");
    toyDiv.appendChild(toyImg)


    let toyLikes = document.createElement('p');
    toyLikes.innerText = `${toy.likes} likes`;
    toyDiv.appendChild(toyLikes);

    let toyBtn = document.createElement('button');
    toyBtn.setAttribute("class", "like-btn");
    toyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      increaseLike(toy.id, toy.likes + 1);
    });
    toyBtn.innerText = "Like";
    toyDiv.appendChild(toyBtn);

    toyCollection.appendChild(toyDiv);
  });

});

function increaseLike (toyId, newLikeNum) {
fetch(`http://localhost:3000/toys/${toyId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "likes": newLikeNum
    
  })
})
}





    

