let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('#new-toy-btn');
	const toyFormContainer = document.querySelector('.container');
	const toyCollectionDiv = document.getElementById('toy-collection');
	const toyForm = document.querySelector('.add-toy-form');

	addBtn.addEventListener('click', () => {
		// hide & seek with the form

		addToy = !addToy;
		if (addToy) {
			toyFormContainer.style.display = 'block';
		} else {
			toyFormContainer.style.display = 'none';
		}
	});

	fetch('http://localhost:3000/toys')
		.then((response) => {
			return response.json();
		})
		.then((toys) => {
			for (const toy of toys) {
				let toyDiv = document.createElement('div');
				toyDiv.setAttribute('class', 'card');
				let toyName = document.createElement('h2');
				toyName.innerHTML = toy.name;
				toyDiv.appendChild(toyName);
				let toyImg = document.createElement('img');
				toyImg.setAttribute('class', 'toy-avatar');
				toyImg.src = toy.image;
				toyDiv.appendChild(toyImg);
				let toyLike = document.createElement('p');
				toyLike.innerHTML = toy.likes;
				toyDiv.appendChild(toyLike);
				let likeBtn = document.createElement('button');
				likeBtn.setAttribute('class', 'like-btn');
				likeBtn.setAttribute('id', toy.id);
				likeBtn.innerText = 'Like';
				likeBtn.addEventListener('click', (e) => {
					e.preventDefault();
					//console.log(e.target.id);
					let likesNumber = parseInt(e.target.previousElementSibling.innerText);
					let configObj = {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
						body: JSON.stringify({
							likes: likesNumber + 1,
						}),
					};
					//console.log(likesNumber);
					increaseLikesNumber(e.target.id, configObj);
				});
				toyDiv.appendChild(likeBtn);
				toyCollectionDiv.appendChild(toyDiv);
			}
		});

	toyForm.addEventListener('submit', (e) => {
		e.preventDefault();
		let toyData = {
			name: document.getElementsByClassName('input-text')[0].value,
			image: document.getElementsByClassName('input-text')[1].value,
			likes: 0,
		};
		let configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(toyData),
		};
		addNewToy(configObj);
	});
});

const addNewToy = async (configObj) => {
	await fetch('http://localhost:3000/toys', configObj);
};
const increaseLikesNumber = async (id, configObj) => {
	await fetch(`http://localhost:3000/toys/${id}`, configObj);
};
