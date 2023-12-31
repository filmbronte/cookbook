export async function register() {

    document.getElementById('create-button').removeAttribute('class');
    document.getElementById('register-button').setAttribute('class', 'active');
    document.getElementById('login-button').removeAttribute('class');
    document.getElementById('catalog-button').removeAttribute('class');

    document.getElementById('recipes-page').style.display = 'none';
    document.getElementById('register-article').style.display = 'block';
    document.getElementById('log-in-article').style.display = 'none';

    document.getElementById('details-page').style.display = 'none';
    document.getElementById('create-recipe-article').style.display = 'none';

    const form = document.getElementById('register-form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));

    async function onSubmit(data) {
        if (data.password != data.rePass) {
            return console.error('Passwords don\'t match');
        }

        const body = JSON.stringify({
            email: data.email,
            password: data.password,
        });

        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
            const data = await response.json();
            if (response.status == 200) {
                localStorage.setItem('authToken', data.accessToken);
                window.location.pathname = 'index.html';
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    }
}