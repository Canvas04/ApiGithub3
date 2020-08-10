const input = document.querySelector('.input-js');
const USER_PER_PAGE = 5;
const URL = 'https://api.github.com/';
const reposList = document.querySelector('.repositories-js');
const mainContainer = document.querySelector('.main-js');

input.addEventListener('keyup', (e) => {


    let p = loadRepos(input.value).then(res => {
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

});

async function loadRepos(value) {
    return await fetch(`${URL}search/repositories?q=${value}&per_page=${USER_PER_PAGE}`)
}
function createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
        element.classList.toggle(className);
    }
    return element;
}

function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let  later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};