import { login } from "./login.js";
import { create } from "./create.js";
import { register } from "./register.js";

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();

    return recipes;
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    return recipe;
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: toggleCard },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);

        result.replaceWith(createRecipeCard(fullRecipe));
    }
}

function createRecipeCard(recipe) {
    const result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    return result;
}

async function logout() {
    localStorage.clear();
    window.location.pathname = 'index.html';
}

window.addEventListener('load', async () => {
    if (localStorage.getItem('authToken') == null) {
        document.getElementById('guest').style.display = 'inline';
    } else {
        document.getElementById('user').style.display = 'inline';
        document.getElementById('logoutBtn').addEventListener('click', logout);
    }

    const main = document.querySelector('main');

    const catalogBtn = document.getElementById('catalog-button');
    const createBtn = document.getElementById('create-button');
    const loginBtn = document.getElementById('login-button');
    const registerBtn = document.getElementById('register-button');

    loginBtn.addEventListener('click', login)
    createBtn.addEventListener('click', create)
    registerBtn.addEventListener('click', register)
    catalogBtn.addEventListener('click', catalog)

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);

    main.innerHTML = '';
    cards.forEach(c => main.appendChild(c));
});

async function catalog() {
    document.getElementById('create-button').removeAttribute('class');
    document.getElementById('register-button').removeAttribute('class');
    document.getElementById('login-button').removeAttribute('class');
    document.getElementById('catalog-button').setAttribute('class', 'active');


    document.getElementById('recipes-page').style.display = 'block';
    document.getElementById('register-article').style.display = 'none';
    document.getElementById('log-in-article').style.display = 'none';
    document.getElementById('create-recipe-article').style.display = 'none';
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}