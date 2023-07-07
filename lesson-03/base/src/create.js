const name = document.querySelector('input[type="name"]');
const img = document.querySelector('input[type="img"]');
const ingredients = document.querySelector('textarea[type="ingredients"]');
const steps = document.querySelector('textarea[type="steps"]');

const submitBtn = document.querySelector('input[type="submit"]');

submitBtn.parentElement.addEventListener('submit', submitRecipe)

async function submitRecipe(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n');
    let steps = formData.get('steps').split('\n');

    let data = {
        name,
        img,
        ingredients,
        steps
    };

    const token = localStorage.getItem('accessToken');

    const res = await fetch('http://localhost:3030/data/recipes', {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        'body': JSON.stringify({ data })
    });

    const result = await res.json();

    const newrecipe = await createRecipe(data.name, data.img);

    location = 'index.html'
    return result, newrecipe;
}

async function createRecipe(name, img) {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    const options = {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ name, img })
    }

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
}
