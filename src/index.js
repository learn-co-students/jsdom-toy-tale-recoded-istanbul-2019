let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyDiv = document.getElementById("toy-collection");
  const createBtn = document.querySelectorAll(".container input")[2];

  function createCardIndex(newDiv, objElement) {
    addToyName(newDiv, objElement);
    addImage(newDiv, objElement);
    addLikeNum(newDiv, objElement);
    addLikeButton(newDiv, objElement);
  }

  function addToyName(element, obj) {
    let h2 = document.createElement("h2");
    h2.textContent = obj["name"];
    return element.appendChild(h2);
  }

  function addImage(element, obj) {
    let img = document.createElement("img");
    img.src = obj["image"];
    img.style.width = "75%";
    element.appendChild(img); //el.
  }

  function addLikeNum(element, obj) {
    let p = document.createElement("p");
    p.textContent = "Likes: " + obj["likes"];
    element.appendChild(p);
  }

  function addLikeButton(element, obj) {
    let likeBtn = document.createElement("button");
    likeBtn.textContent = "Like";
    element.appendChild(likeBtn);
    let id = obj["id"];

    likeBtn.addEventListener("click", () => {
      let likes = parseInt(
        likeBtn.parentNode.querySelector("p").textContent.slice(7)
      );
      likes = likes + 1;
      console.log(typeof id);

      // likeBtn.parentNode.querySelector("p").textContent = "Likes: " + likes
      increaseLike(likes, id);
    });
  }

  async function increaseLike(likes, id) {
    likeData = {
      likes: likes
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(likeData)
    };

    try {
      const response = await fetch(
        "http://localhost:3000/toys/" + id + "/",
        configObj
      );
      await response.json();
      renderLike(json);
    } catch (error) {
      console.log("error");
    }
  }

  function getToys() {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(json => {
        // console.log(json[0]["name"]);
        for (let index = 0; index < json.length; index++) {
          const objElement = json[index];

          let newDiv = document.createElement("div");
          newDiv.className = "card";

          createCardIndex(newDiv, objElement);

          toyDiv.appendChild(newDiv);
        }
      });
  }

  getToys();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form

    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  createBtn.addEventListener("click", () => {
    let toyName = document.querySelectorAll(".container input")[0].value;
    let toyURL = document.querySelectorAll(".container input")[1].value;
    submitData(toyName, toyURL);
  });

  async function submitData(toyName, url) {
    let toyData = {
      name: toyName,
      image: url,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    };

    try {
      const response = await fetch("http://localhost:3000/toys", configObj);
      await response.json();
      getToys();
    } catch (error) {
      console.log("error");
    }
  }

  function renderLike(json) {
    toyLikes.innerText = json.likes.toString();
  }
});
