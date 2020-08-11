const input = document.querySelector('.input-js');
const USER_PER_PAGE = 5;
const URL = 'https://api.github.com/';
const reposList = document.querySelector('.repositories-js');
const mainContainer = document.querySelector('.main-js');





async function loadRepos() {
    return await fetch(`${URL}search/repositories?q=${input.value}&per_page=${USER_PER_PAGE}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(res => {
            console.log(res['items']);
            const resArr = res['items'];
            resArr.forEach(el => {
                const elementreposList = createElement('li'); //Нужно добавить класс для стилизации 
                elementreposList.textContent = el.name;
                reposList.append(elementreposList);

                function clickHandler() {

                    const container = createElement('div');
                    reposList.style.display = 'none';
                    mainContainer.append(container);
                    const spanName = createElement('div');
                    spanName.textContent = `Name: ${el.name} `
                    const spanOwner = createElement('div');
                    spanOwner.textContent = `Owner : ${el.owner.login}`;
                    const spanStars = createElement('div');
                    spanStars.textContent = `Stars: ${el.stargazers_count} `
                    container.append(spanName);
                    container.append(spanOwner);
                    container.append(spanStars);
                }

                elementreposList.addEventListener('click', clickHandler);
            })



        })

}

loadRepos = debounce(loadRepos,500);
input.addEventListener('keyup', loadRepos);
function createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
        element.classList.toggle(className);
    }
    return element;
}

function debounce(fn, ms) {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments) };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    }
}

function clearUsers() {

}