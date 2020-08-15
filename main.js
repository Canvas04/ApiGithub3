const input = document.querySelector('.input-js');
const USER_PER_PAGE = 5;
const URL = 'https://api.github.com/';
const reposList = document.querySelector('.repositories-js');
const mainContainer = document.querySelector('.main-js');
async function loadRepos() {
    if (input.value) {
        return await fetch(`${URL}search/repositories?q=${input.value}&per_page=${USER_PER_PAGE}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(res => {
                const resArr = res['items'];
                clearUsers();
                resArr.forEach(el => {
                    const elementreposList = createElement('li', 'list-group-item'); 
                    elementreposList.textContent = el.name;
                    reposList.append(elementreposList);

                    function clickHandler() {

                        const container = createElement('div', 'container');

                        reposList.style.display = 'none';
                        document.querySelector('.form-group').append(container);
                        const spanName = createElement('div');
                        spanName.textContent = `Name: ${el.name} `
                        const spanOwner = createElement('div');
                        spanOwner.textContent = `Owner : ${el.owner.login}`;
                        const spanStars = createElement('div');
                        spanStars.textContent = `Stars: ${el.stargazers_count} `;
                        const icon = createElement('button', 'icon');
                        icon.classList.add('btn');
                        
                        const elemCLose = createElement('span', 'close');

                        const commonElForInfo = createElement('div', 'common');
                        icon.append(elemCLose);
                        container.append(commonElForInfo);
                        container.append(icon);
                        commonElForInfo.append(spanName);
                        commonElForInfo.append(spanOwner);
                        commonElForInfo.append(spanStars);
                        document.querySelector('.icon').addEventListener('click', (e) => {
                            e.preventDefault();
                            document.querySelector('.container').style.top = '-500px';
                            input.value = '';
                            setTimeout(() => document.location.reload(true),2000)
                        })
                    }
                    elementreposList.addEventListener('click', clickHandler);


                })
            })

    } else {
        clearUsers();
    }
}

loadRepos = debounce(loadRepos, 500);
input.addEventListener('keyup', loadRepos);
input.addEventListener('keyup', () => {
    if (!input.value) {
        document.querySelector('.container').innerHTML = '';
    }
})
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
    reposList.innerHTML = '';
}


