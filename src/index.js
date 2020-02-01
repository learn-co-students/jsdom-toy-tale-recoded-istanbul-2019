let addToy = false;

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
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      for (const id in json) {
        console.log(json[id].name);
        const cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        const nameH2 = document.createElement('h2');
        nameH2.textContent = json[id].name;
        const avatarImg = document.createElement('img');
        avatarImg.setAttribute('src', json[id].image);
        avatarImg.setAttribute('class', 'toy-avatar');
        const likesP = document.createElement('p');
        const likesCount = json[id].likes;
        likesP.textContent = likesCount == 1 ? '1 Like' : likesCount + ' Likes';
        const likeButton = document.createElement('button');
        likeButton.setAttribute('class', 'like-btn');
        likeButton.textContent = 'Like ❤️';
        likeButton.onclick = () => {
          console.log(id + ' liked' + (likesCount + 1));
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
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log(object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
        };
        
        cardDiv.append(nameH2, avatarImg, likesP, likeButton);
        toyCollectionDiv.append(cardDiv);
      }
    });

    document.querySelector('.submit').onclick = function (event) {
      
      let configObj = {
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
       
      fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          console.log(object);
        })
        .catch(function(error) {
          alert(error.message);
          console.log(error.message);
        });
    };

});
