let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewCard(e.target);
      })
    } else {
      toyForm.style.display = "none";
    }
  });
});

function fetchToys() {
  return fetch('http://localhost:3000/toys', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then((res) => {
    return res.json()
  }).then((json) => {
    console.log(json)
    json.forEach(element => {
      insertIntoDiv(element);
    });
  })

}
function insertIntoDiv(card) {
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let image = document.createElement('img')
  let paragraph = document.createElement('p')
  let btn = document.createElement('button')
  let toys = document.getElementById('toy-collection')

  div.className = "card"
  image.className = "toy-avatar"
  btn.className = "like-btn"
  btn.setAttribute('id', card.id)
  h2.textContent = card['name']
  image.src = card['image']
  paragraph.textContent = `${card['likes']} Likes`
  btn.textContent = "Like <3"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    Increaselikes(e)
  })

  div.appendChild(h2)
  div.appendChild(image)
  div.appendChild(paragraph)
  div.appendChild(btn)
  toys.appendChild(div)

}
function addNewCard(target) {
  let configurationObject = {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: {
      "name": target.name.value,
      "image": target.image.value,
      "likes": 0
    }
  }
  return fetch("http://localhost:3000/toys", configurationObject).then(function (res) {
    return res.json();
  }).then(function (json) {
    insertIntoDiv(json)
  })




}
function Increaselikes(e) {
  e.preventDefault()
  let likesNum = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": likesNum
    })
  })
    .then(res => res.json())
    .then((temp => {
      e.target.previousElementSibling.innerText = `${likesNum} likes`;
    }))

}