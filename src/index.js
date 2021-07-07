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

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(obj =>{
      toyCards(obj);
   } );



toyCards = (obj) =>{
  for(let i =0; i< obj.length ; i++){
    let objs = obj[i];
    let toyCollection = document.querySelector('#toy-collection');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let button = document.createElement('button');
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src' , objs.image);
    img.setAttribute('class' , 'toy-avatar');
    button.setAttribute('class', 'like-btn');
    div.setAttribute('class' , 'card');
    h2.innerText = objs.name;
    p.innerText = `${objs.likes} likes `
    button.innerText = `likes ${objs.likes}`
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    toyCollection.appendChild(div);
    
}
}


increaseLikes = e => {
  e.preventDefault();
  // console.log(e.target.id);
  let likesNumber=parseInt(e.target.previousElementSibling.innerText) +1;
  configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likesNumber
    })
  };
  fetch(`http://localhost:3000/toys/${e.target.id}`, configurationObject)
  .then(resp => resp.json())
  .then(temp => {
    e.target.previousElementSibling.innerText=`${likesNumber} Likes`})
   const likeBtn =document.querySelectorAll('.like-btn') 
    likeBtn[0].addEventListener('click', e => {
      e.preventDefault();
      increaseLikes(e);
    })
}


});