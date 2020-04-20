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

// let formData = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   },
//   body: JSON.stringify({
//     "name": name,
//     "image": image,
//     "likes": likes
//   })
// }


function createToy() {
  fetch('http://localhost:3000/toys')
  .then((res) => res.json())
  .then((data) => {
    let output = '<h2>Toys</h2>'
    data.forEach(function(toys){
      output += `
      <div class="card">
      <h2>${toys.name}</h2>
      <img src= ${toys.image} class="toy-avatar" />
      <p> ${toys.likes} </p>
      <button class="like-btn">Like <3</button>
      </div>
      `;
      })
      document.getElementById('toy-collection').innerHTML = output
  })
}
createToy();