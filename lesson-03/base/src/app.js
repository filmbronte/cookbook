window.addEventListener('load', start)

async function start() {
    const main = document.querySelector('main');
    const p = document.querySelector('p')

    const guestNav = document.getElementById('guest');
    const userNav = document.getElementById('user');

    if (localStorage.getItem('accessToken') == null) {
        guestNav.style.display = 'inline';
        userNav.style.display = 'none';
    } else {
        guestNav.style.display = 'none';
        userNav.style.display = 'inline';

        const logOut = document.getElementById('logoutBtn');

        logOut.addEventListener('click', async () => {
            localStorage.clear();

            location = 'index.html';
        })
    }

    const recipes = await getRecipes();

    recipes.map(createPreview).forEach(el => main.appendChild(el));

    p.remove();
}

async function togglePreview(id, preview) {
    const recipe = await getRecipeById(id);

    const element = document.createElement('article');

    element.innerHTML = `<h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src="${recipe.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(p => `<p>${p}</p>`).join('')}
    </div>`;

    preview.replaceWith(element);
}

function createPreview(recipe) {
    const element = document.createElement('article');
    element.setAttribute('class', 'preview');

    element.innerHTML = `<div class="title">
            <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>`;

    element.addEventListener('click', () => {
        element.querySelector('h2').textContent = 'Loading...'
        togglePreview(recipe._id, element);
    })

    return element;
}

async function getRecipes() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes'

    const res = await fetch(url);
    const data = await res.json();

    return Object.values(data);
}

async function getRecipeById(id) {
    const url = 'http://localhost:3030/jsonstore/cookbook/details/' + id;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const error = await res.json();
            throw error;
        }
        const data = await res.json();

        return data;
    } catch (err) {
        alert(err.message);
    }
}