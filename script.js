
function renderToy(toy) {
    const toyCollectionsDiv = document.getElementById('toy-collection');
    // toyCollectionsDiv.insertAdjacentHTML('beforeend', `
    //   <div class='card'>
    //   <h2>${toy.name}</h2>
    //   <img src='${toy.image}' class="toy-avatar" />
    //   <p>${toy.likes} Likes </p>
    //   <button class="like-btn" id='${toy.id}'>Like <3</button>
    //   </div>
    // `);

    //Commented the previous approach of rendering toys and used the following approach for the sake of adding event listener to the button
    const div = document.createElement('div');
    div.setAttribute('class', 'card');

    const h2 = document.createElement('h2');
    h2.innerText = toy.name;

    const img = document.createElement('img');
    img.setAttribute('src', toy.image);
    img.setAttribute('class', 'toy-avatar');

    const p = document.createElement('p');
    p.innerText = toy.likes + ' likes';

    const button = document.createElement('button');
    button.setAttribute('class', 'like-btn');
    button.setAttribute('id', toy.id);
    button.innerText = 'Like <3';

    button.addEventListener('click', (e) => {
        likeToy(e);
        console.log(e.target.dataset);
    });

    div.append(h2, img, p, button);
    toyCollectionsDiv.append(div);
}

function getToys() {
    fetch('http://localhost:3000/toys').then(response => response.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
            renderToy(data[i]);
        }
    }).catch(error => console.log(error));
}

function postNewToy() {
    const name = document.getElementsByName('name')[0];
    const image = document.getElementsByName('image')[0];
    const dataToAdd = {
        'name': name.value,
        'image': image.value,
        'likes': 0
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dataToAdd)
    };
    fetch('http://localhost:3000/toys', options).then(response => response.json()).then(data => {
        renderToy(data);
    }).catch(error => console.log(error));
}

function likeToy(e) {
    e.preventDefault();
    const incrementLike = parseInt(e.target.previousElementSibling.innerText) + 1;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ 'likes': incrementLike })
    };
    fetch('http://localhost:3000/toys/' + e.target.id, options).then(resp => resp.json()).then(like_obj => {
        e.target.previousElementSibling.innerText = incrementLike + ' likes';
    }).catch(error => console.log(error));
}

const submitToyBtn = document.querySelector('#submit-toy-btn');
submitToyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    postNewToy();
});

document.addEventListener('DOMContentLoaded', () => {
    getToys();
});