let addToy = false;
function postOnClick(json){
    fetch("http://localhost:3000/toys/" + json[id].id, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": json[id].likes + 1
        })
      })
      .catch(function(error) {
        console.log(error.message);
      });
}

function createCard(id,json){
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    
    const header2 = document.createElement('h2');
    header2.textContent = json[id].name;
    
    const imageAvatar = document.createElement('img');
    imageAvatar.setAttribute('src', json[id].image);
    imageAvatar.setAttribute('class', 'toy-avatar');
    
    const likesSpan = document.createElement('span');
    const likesCount = json[id].likes;
    likesSpan.textContent = likesCount == 1 ? '1 Like' : likesCount + ' Likes';
    const likeButton = document.createElement('button');
    likeButton.setAttribute('class', 'like-btn');
    likeButton.textContent = 'Like';
    likeButton.onclick = (json) => {
        postOnClick(json)
    };

    cardDiv.append(header2, imageAvatar, likesSpan, likeButton);
    return cardDiv;
}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector('#toy-collection');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
   fetch('http://localhost:3000/toys')
    .then(resp => resp.JSON())
    .then(function(json) {
      for (let id in json) {
        toyCollectionDiv.append(createCard(id,json));
      }
    });

    document.querySelector('.submit').onclick = function (event) {

      let objectSettings = {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": document.querySelector('input[name*=name]').value,
          "image": document.querySelector('input[name*=image]').value,
          "likes": 0
        })
      };

      fetch("http://localhost:3000/toys", objectSettings)
        .then(function(response) {
          return response.json();
        })
        .catch(function(error) {
          alert(error.message);
        });
    };
  
});
