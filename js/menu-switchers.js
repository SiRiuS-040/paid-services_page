// Главное меню

const pageNavLinks = document.querySelectorAll('.navigation__nav-button');
// const menuSlider = document.querySelector('.menu-slider');

function showPaidServicesSection(link) {
    pageNavLinks.forEach(function (pageNavLink) {
        const idElement = pageNavLink.id;
        const block = document.querySelector(`.${idElement}`);

        if (link !== pageNavLink) {
            pageNavLink.classList.remove('navigation__nav-button--active');
            block.classList.add('disabled');
        } else {
            pageNavLink.classList.add('navigation__nav-button--active');
            block.classList.remove('disabled');
        }
    })
}

pageNavLinks.forEach(function (pageNavLink) {
    pageNavLink.addEventListener('click', () => showPaidServicesSection(pageNavLink))
});


// анимация главного меню

const navButtons = document.querySelectorAll('.navigation__nav-button');
const navButtonsActive = document.querySelector('.navigation__nav-button--active');
const navButtonSlider = document.querySelector('.navigation__nav-slider');

//передвижение фона 

navButtonSlider.style.width = `${navButtons[0].offsetWidth - 4}px`;

navButtons.forEach(function (navButton) {
    navButton.addEventListener('click', () => {
        navButtonSlider.style.width = `${navButton.offsetWidth - 4}px`;
        navButtonSlider.style.left = `${navButton.offsetLeft + 2}px`;
        navButtonSlider.style.transition = '0.5s all';

    })
})

window.addEventListener('resize', function () {
    navButtons.forEach(function (navButton) {
        if (navButton.classList.contains('navigation__nav-button--active')) {
            navButtonSlider.style.width = `${navButton.offsetWidth - 4}px`;
            navButtonSlider.style.left = `${navButton.offsetLeft + 2}px`;
        }
    })
});

// Второе меню 

const catalogNavLinks = document.querySelectorAll('.catalog__nav-button');
// const menuSlider = document.querySelector('.menu-slider');

function showCatalogSection(link) {
    catalogNavLinks.forEach(function (catalogNavLink) {
        const idElement = catalogNavLink.id;

        // console.log(idElement);
        const block = document.querySelector(`.${idElement}`);

        if (link !== catalogNavLink) {
            catalogNavLink.classList.remove('catalog__nav-button--active');
            block.classList.add('disabled');
        } else {
            catalogNavLink.classList.add('catalog__nav-button--active');
            block.classList.remove('disabled');
        }
    })
}

catalogNavLinks.forEach(function (catalogNavLink) {
    catalogNavLink.addEventListener('click', () => showCatalogSection(catalogNavLink))
});