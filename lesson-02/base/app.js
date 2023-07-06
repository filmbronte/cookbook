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

            let imagesrc = el.img;
            const img = document.createElement('img');
            img.setAttribute('src', imagesrc);
            div2.appendChild(img)

            // newArticle.addEventListener('click', () => {
            //     if (newArticle.classList.contains('preview')) {
            //         newArticle.removeAttribute('class');

            //         const newh2 = document.createElement('h2');
            //         newh2.textContent = h2.textContent;
            //         newArticle.replaceChildren(newh2)

            //         const divBand = document.createElement('div');
            //         divBand.setAttribute('class', 'band');
            //         newArticle.appendChild(divBand);

            //         const divThumb = document.createElement('div');
            //         divThumb.setAttribute('class', 'thumb');
            //         divBand.appendChild(divThumb);

            //         const img = document.createElement('img');
            //         img.setAttribute('src', imagesrc)
            //         divThumb.appendChild(img)

            //         const divIngredients = document.createElement('div');
            //         divIngredients.setAttribute('class', 'ingredients');
            //         divBand.appendChild(divIngredients);

            //         const h3 = document.createElement('h3');
            //         h3.textContent = 'Ingredients';
            //         divIngredients.appendChild(h3);

            //         const ul = document.createElement('ul');
            //         divIngredients.appendChild(ul)

            //         const li1 = document.createElement('li');
            //         li1.textContent = 'Ingredient 1';
            //         ul.appendChild(li1)
            //         const li2 = document.createElement('li');
            //         li2.textContent = 'Ingredient 2';
            //         ul.appendChild(li2)
            //         const li3 = document.createElement('li');
            //         li3.textContent = 'Ingredient 3';
            //         ul.appendChild(li3)
            //         const li4 = document.createElement('li');
            //         li4.textContent = 'Ingredient 4';
            //         ul.appendChild(li4)

            //         const divDescription = document.createElement('div');
            //         divDescription.setAttribute('class', 'description');
            //         newArticle.appendChild(divDescription)

            //         const newh3 = document.createElement('h3');
            //         newh3.textContent = 'Preparation:';
            //         divDescription.appendChild(newh3);

            //         const p1 = document.createElement('p');
            //         p1.textContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quaerat.';
            //         divDescription.appendChild(p1)
            //         const p2 = document.createElement('p');
            //         p2.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officia ipsam nulla vitae nobis reprehenderit pariatur aut dolor exercitationem impedit.';
            //         divDescription.appendChild(p2)
            //         const p3 = document.createElement('p');
            //         p3.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolorem odit officiis numquam corrupti? Quam.';
            //         divDescription.appendChild(p3)
            //     }
            // })

            newArticle.addEventListener('click', getRecipe)
        })
    }

    function getRecipe(e) {
        if (e.target.classList.contains('preview')) {
            e.target.removeAttribute('class');


        }
    }
})
