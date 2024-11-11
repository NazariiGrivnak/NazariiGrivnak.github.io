const header = document.querySelector('header');
const section = document.querySelector('section');

const requestURL = 'https://semegenkep.github.io/json/example.json';

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    const superHeroes = request.response;
    console.log(superHeroes); // Перевірка, що дані завантажені
};

function populateHeader(superHeroes) {
    const headerH1 = document.createElement('h1');
    headerH1.textContent = superHeroes.squadName;
    header.appendChild(headerH1);

    const headerPara = document.createElement('p');
    headerPara.textContent = `Home Town: ${superHeroes.homeTown} // Formed: ${superHeroes.formed}`;
    header.appendChild(headerPara);
}

function showHeroes(superHeroes) {
    const heroes = superHeroes.members;

    heroes.forEach((hero) => {
        const heroArticle = document.createElement('article');
        
        const heroH2 = document.createElement('h2');
        heroH2.textContent = hero.name;
        heroArticle.appendChild(heroH2);

        const heroPara1 = document.createElement('p');
        heroPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        heroArticle.appendChild(heroPara1);

        const heroPara2 = document.createElement('p');
        heroPara2.textContent = `Age: ${hero.age}`;
        heroArticle.appendChild(heroPara2);

        const heroPara3 = document.createElement('p');
        heroPara3.textContent = 'Superpowers:';
        heroArticle.appendChild(heroPara3);

        const heroList = document.createElement('ul');
        hero.powers.forEach((power) => {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            heroList.appendChild(listItem);
        });
        heroArticle.appendChild(heroList);

        section.appendChild(heroArticle);
    });
}

