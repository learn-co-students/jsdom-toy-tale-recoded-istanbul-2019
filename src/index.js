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


  const form = toyForm.querySelectorAll("input")
  form[2].addEventListener("click", ()=>{
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        name : form[0].value,
        image: form[1].value,
        likes: 0
      })
    });
  });


  fetch("http://localhost:3000/toys").then(res => res.json()).then(res => insert(res))
  function insert(data) {
    const parentDiv = document.querySelector('#toy-collection');
    data.map(cards => {
      const card = document.createElement('div');
      card.classList.add("card")
      
      const h2 = document.createElement('h2');
      h2.textContent = cards.name

      const img = document.createElement('img');
      img.src = cards.image
      img.classList.add("toy-avatar");
      
      const p = document.createElement('p')
      p.textContent = `${cards.likes} Likes`

      const button = document.createElement('button');
      button.classList.add('like-btn');
      button.textContent = "Like";
      parentDiv.appendChild(card);
      card.appendChild(h2);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(button);
    });
  }
})