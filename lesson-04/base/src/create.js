
export async function create() {

    document.getElementById('create-button').setAttribute('class', 'active');
    document.getElementById('register-button').removeAttribute('class');
    document.getElementById('login-button').removeAttribute('class');
    document.getElementById('catalog-button').removeAttribute('class');

    document.getElementById('recipes-page').style.display = 'none';
    document.getElementById('register-article').style.display = 'none';
    document.getElementById('log-in-article').style.display = 'none';
    document.getElementById('create-recipe-article').style.display = 'block';

    const form = document.getElementById('create-form');

    console.log(form);
    form.addEventListener('submit', (ev => {
        console.log('test1')
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
}
async function onSubmit(data) {
    console.log('test2')
    const body = JSON.stringify({
        name: data.name,
        img: data.img,
        ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: data.steps.split('\n').map(l => l.trim()).filter(l => l != '')
    });

    const token = localStorage.getItem('authToken');
    if (token == null) {
        return window.location.pathname = 'index.html';
    }

    try {
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });

        if (response.status == 200) {

            document.getElementById('recipes-page').style.display = 'block';
            window.location.pathname = 'index.html';
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
}
