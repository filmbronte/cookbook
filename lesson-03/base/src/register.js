document.getElementById('register').parentNode.addEventListener('submit', onRegister)

async function onRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, rePass } = Object.fromEntries(formData.entries());

    if (email == '' || password == '') {
        return alert('All fields are required!');
    }
    if (password != rePass) {
        return alert('Passwords must match!');
    }

    const url = 'http://localhost:3030/users/register';
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

        location = 'index.html';
    } catch (err) {
        alert(err.message);
    }
}