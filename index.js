/** Implemente seu código abaixo. Boa sorte! */

const addList = document.getElementById('add-list');
const includeInput = document.getElementById('include-input');
const newsToday = document.getElementById('newsToday');
const btnRemove = document.getElementsByClassName('btn-remove');

let interestList = [];

function include() {
    const addInput = document.getElementById('include-input').value;
    interestList.push(addInput);
    localStorage.setItem('meusInteresses', JSON.stringify(interestList));

    const addElement = document.createElement('li');
    const addButton = document.createElement('button');

    addButton.className = 'btn-remove';
    addElement.innerHTML += `<li>${addInput}</li>`;
    addButton.innerHTML = `🗑️`;

    addElement.appendChild(addButton);
    addList.appendChild(addElement);

    includeInput.value = '';
    removeItem();
}
function listClear() {
    interestList = [];
    localStorage.clear();
}
function removeItem() {
    const removeButton = document.getElementsByClassName('btn-remove');
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', () => {
            interestList.splice(i, 1);
            localStorage.setItem('meusInteresses', JSON.stringify(interestList));
            listLoad();
        });
    }
}

function listLoad() {
    addList.innerHTML = '';

    if (localStorage.getItem('meusInteresses')) {
        interestList = JSON.parse(localStorage.getItem('meusInteresses'));

        interestList.forEach((item) => {
            const addElement = document.createElement('li');
            const addButton = document.createElement('button');

            addElement.className = 'btn-remove';
            addElement.innerHTML = `<li>${item}</li>`;
            addButton.innerHTML = `🗑️`;

            addElement.appendChild(addButton);
            addList.appendChild(addElement);
        });
    } else {
        console.log('Não há itens salvos');
    }
    removeItem();
}
const updateList = setInterval(listLoad, 1000);

async function getListApi() {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release');
        const data = await response.json();
        const newsTodayElement = document.getElementById('newsToday');

        if (newsTodayElement) {
            const randomIndex = Math.floor(Math.random() * data.items.length);
            const newsRandom = data.items[randomIndex];
            newsTodayElement.innerHTML = `<p>${newsRandom.titulo}</p>`;
        }

    } catch (error) {
        console.error('Erro ao buscar notícias', error);
    }
};
function updateNews() {
    getListApi();
    setTimeout(updateNews, 5000);
};
getListApi();
updateNews();
