window.addEventListener('load', start)

async function start() {
    const main = document.querySelector('main');
    const p = document.querySelector('p')
    const recipes = await getRecipes();

    recipes.map(createPreview).forEach(el => main.appendChild(el));

    p.remove()
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
        alert(err.message)
    }
}