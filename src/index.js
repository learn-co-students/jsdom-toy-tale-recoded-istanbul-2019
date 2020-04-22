let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const addToyForm= document.querySelector('.add-toy-form');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
 
  let newToy ="";
  let imgLink ="";

  addToyForm.addEventListener('submit', e =>{
    newToy = document.querySelectorAll('.input-text')[0].value;
    imgLink = document.querySelectorAll('.input-text')[1].value;

    configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newToy,
        image: imgLink,
        likes: 0
      })
    };

    addNewToy(configurationObject);

    
  
  })
  

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(object =>{
    for(let i =0; i< object.length ;i++){
    let toyDiv= document.createElement('div')
    let toyName=document.createElement('h2')
    let toyImg= document.createElement('img')
    let toyLikes=document.createElement('p')
    let toyBtn= document.createElement('button')

    toyDiv.setAttribute('class', 'card');
    toyName.innerHTML=object[i].name;
    toyDiv.appendChild(toyName);

    toyImg.src=`${object[i].image}`;
    toyImg.setAttribute('class', 'toy-avatar')
    toyDiv.appendChild(toyImg);

    toyLikes.innerHTML=`${object[i].likes} Likes`;
    toyDiv.appendChild(toyLikes);

    toyBtn.innerHTML=`Like <3`;
    toyBtn.setAttribute('class', 'like-btn');
    toyBtn.setAttribute('id', object[i].id);
    toyDiv.appendChild(toyBtn);
    
    document.querySelector('#toy-collection').appendChild(toyDiv);

    toyBtn.addEventListener('click', e => {
      e.preventDefault();
      increaseLikes(e);
    })
    // console.log(object);
  }
  });
});


let addNewToy = configurationObject => {
 return fetch('http://localhost:3000/toys' , configurationObject);
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

}