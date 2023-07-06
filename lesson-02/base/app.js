window.addEventListener('load', () => {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    const mainPage = document.getElementById('main-page');
    const p = document.querySelector('p');

    p.remove();

    fetch(url)
        .then(res => res.json())
        .then(data => getData(data))
        .catch(err => console.log(err))

    function getData(data) {
        Object.values(data).forEach((el) => {
            console.log(el)
            const newArticle = document.createElement('article');
            newArticle.setAttribute('class', 'preview');

            mainPage.appendChild(newArticle);

            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'title');
            newArticle.appendChild(newDiv);

            const h2 = document.createElement('h2');
            h2.textContent = el.name;
            newDiv.appendChild(h2);

            const div2 = document.createElement('div');
            div2.setAttribute('class', 'small');
            newArticle.appendChild(div2);

            const img = document.createElement('img');
            img.setAttribute('src', el.img);
            div2.appendChild(img)
        })
    }
})
