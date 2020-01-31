let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form

    addToy = !addToy
    if (addToy) {

    } else {
      toyForm.style.display = 'none'
    }
  })

  function getToysNames() {
    return document.querySelectorAll('.card > h2');
  }

  function getToys() {
    return fetch('http://localhost:3000/toys')
      .then(json => {
        return json.json();
      })
  }

  function postToy(data) {
    let url = 'http://localhost:3000/toys';
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(
        {
          'name': data.name.value,
          'image': data.image.value,
          'likes': 0
        }

      )
    }

    fetch(url, config)
      .then(resp => resp.json())
      .then(obj => {
        let new_toy = renderToys(obj)
        toyCollection.append(new_toy);
      })
  }

  function like (data) {
    data.preventDefault();

    let more = parseInt(e.target.previousElementSibling.innerText) + 1;
    let create = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    }

    fetch(`http://localhost:3000/toys/${e.target.id}`, create)
    .then(resp => resp.json())
    .then((like => {
      data.target.previousElementSibling.innerText = `${more} likes`;
    }))

  }

  function renderToys(toy) {
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
  
    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
  
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
  
    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"
    btn.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })
  
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    divCollect.append(divCard)
  }
  getToys().then(toys => {
    toys.forEach(toy => {
      //function to render toys goes here or something
      renderToys(toy)
    })
  })
  })   





