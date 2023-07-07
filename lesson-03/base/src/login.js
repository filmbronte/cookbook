document.getElementById('login').parentNode.addEventListener('submit', onLogin)

async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData.entries());

    const url = 'http://localhost:3030/users/login';
    const options = {
        'method': 'post',
        'header': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ email, password })
    };

    try {
        const response = await fetch(url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw error;
        }

        const userData = await response.json();
        localStorage.setItem('accessToken', userData.accessToken)
        // localStorage.setItem('username', userData.username)

        location = 'index.html';

    } catch (err) {
        alert(err.message)
    }
}