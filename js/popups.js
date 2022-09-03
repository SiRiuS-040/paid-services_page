const popupModalClose = document.querySelectorAll('.popup-template__modal-close');

// document.addEventListener("DOMContentLoaded", () => {

// ОТРИСОВКА попапа нажатие на корзину

// замена присвоение

// Шаблон

const popupTitle = document.querySelector('.popup-block__title-wrapper');
const popupDesc = document.querySelector('.popup-block__desc-wrapper');
const popupValidity = document.querySelector('.popup-block__validity-wrapper');
const popupPrice = document.querySelector('.popup-block__price-wrapper');
const popupPriceOptions = document.querySelector('.popup-block__price-list-wrapper');

const drawPopupBuyContent = (parent) => {

    const serviceItemTitle = parent.querySelector('.service-item__title');
    const serviceItemDesc = parent.querySelector('.service-item__desc-wrapper');
    const serviceItemValidity = parent.querySelector('.service-item__validity');
    const serviceItemPrice = parent.querySelector('.service-item__price');
    const serviceItemPriceOptions = parent.querySelector('.service-item__price-list');

    buttonPopupBuyNow.style.pointerEvents = "auto";

    //заголовок 

    if (serviceItemTitle) {
        let cloneTitle = serviceItemTitle.cloneNode(true);
        popupTitle.appendChild(cloneTitle);
    }

    // описание

    if (serviceItemDesc) {
        let cloneDesc = serviceItemDesc.cloneNode(true);
        popupDesc.appendChild(cloneDesc);
    }

    // период действия

    if (serviceItemValidity) {
        let cloneValidity = serviceItemValidity.cloneNode(true);
        popupValidity.appendChild(cloneValidity);
    }

    // стоимость

    if (serviceItemPrice) {
        let clonePrice = serviceItemPrice.cloneNode(true);
        popupPrice.appendChild(clonePrice);
    }

    // список стоимостей

    if (serviceItemPriceOptions) {
        let clonePriceOptions = serviceItemPriceOptions.cloneNode(true);
        popupPriceOptions.appendChild(clonePriceOptions);
        popupPrice.innerHTML = '';

        buttonPopupBuyNow.style.pointerEvents = "none";

        let priceTip = document.createElement("p");
        priceTip.className = "popup-block__price-list-tip";
        priceTip.textContent = "Выберите опцию";

        popupPriceOptions.appendChild(priceTip);

    }
}

// отрисовка инфо попапа

const cartAlertPopup = document.querySelector('.cart-alert');
const cartAlertTitle = document.querySelector('.cart-alert__title');
const cartAlertClose = document.querySelector('.cart-alert__button-close');

const drawCartAlertInfo = (parent) => {
    const serviceItemTitle = parent.querySelector('.service-item__title');
    // const Test = document.querySelector('.service-item__title');

    if (serviceItemTitle) {
        cartAlertTitle.textContent = serviceItemTitle.textContent;
        // cartAlertTitle.textContent = Test.textContent;
    }
}

const clearCartAlertInfo = () => {
    cartAlertTitle.textContent = '';
};

// drawCartAlertInfo(parent);

const clearPopupContent = () => {
    popupTitle.innerHTML = '';
    popupDesc.innerHTML = '';
    popupValidity.innerHTML = '';
    popupPrice.innerHTML = '';
    popupPriceOptions.innerHTML = '';
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const lWidth = window.screen.width;
let scrollY;

const buyPopupButton = document.querySelectorAll('.service-item__button--in-cart');
const modalWindow = document.querySelector('.popup-block');
const closeSwipeBtn = document.querySelector('.popup-block__swipe-close');
const buttonPopupCart = document.querySelector('.popup-block__button--in-cart');
const buttonPopupBuyNow = document.querySelector('.popup-block__button--buy-now');
const modalInner = document.querySelector('.popup-block__inner');
const modalInnerClass = '.popup-raise-to-top__inner';;

//ФУНКЦИИ 

let html = document.querySelector('html'),
    body = document.querySelector('body'),
    background = document.querySelector('.overlay');

// заблокировать скролл

let disableScroll = function () {
    html.style.height = 'calc(100vh - 1px)';
    body.style.height = 'calc(100vh - 1px)';
    body.style.width = 'calc(100vw)';
    body.style.position = 'fixed';
    body.style.overflow = 'hidden';
}


// разблокировать скролл
let enableScroll = function () {
    html.style.height = 'auto';
    body.style.height = 'auto';
    body.style.overflow = 'auto';
    body.style.position = 'static';
}
// открытие модального окна
const openModal = () => {
    scrollY = window.scrollY;
    body.style.top = `-${scrollY}px`;
    body.style.height = `calc(${scrollY}px - 1px + 100vh)`;
    background.classList.add('overlay--active');
    modalWindow.classList.add('active');
    disableScroll();
}
// закрытие модального окна

const closeModal = () => {
    modalWindow.classList.remove('active');
    background.classList.remove('overlay--active');
    buttonPopupCart.onclick = null;
    modalWindow.removeEventListener('swiped-down', closeModalOnInnerSwipe);
    closeSwipeBtn.removeEventListener('swiped-down', closeModal);
    closeSwipeBtn.removeEventListener('click', closeModal);

    setTimeout(() => {
        clearPopupContent();
        enableScroll();
        body.style.top = `0px`;
        window.scrollTo(0, scrollY);
    }, 200);
}

const nextStep = () => {
    modalWindow.classList.remove('active');
    buttonPopupBuyNow.removeEventListener('click', closeModal);
    modalWindow.removeEventListener('swiped-down', closeModalOnInnerSwipe);
    closeSwipeBtn.removeEventListener('swiped-down', closeModal);
    closeSwipeBtn.removeEventListener('click', closeModal);
}

const closeModalOnInnerSwipe = (e) => {
    let target = e.target
    if (target.closest(modalInnerClass) && modalWindow.offsetHeight < modalInner.scrollHeight) {
        e.stopPropagation();
    } else {
        closeModal();
    }
}

const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
        closeModal();
    }
};

const movedToCart = (parent) => {
    const buttonToCartTarget = parent.querySelector('.service-item__button--in-cart');
    buttonToCartTarget.classList.add('active')
};

// запуск для кнопки корзина

const showAlertToCart = (parent) => {
    drawCartAlertInfo(parent);
    cartAlertPopup.classList.add('active');
    setTimeout(() => {
        cartAlertPopup.classList.remove('active');
        clearCartAlertInfo();
    }, 3000);
    cartAlertClose.addEventListener('click', function (e) {
        cartAlertPopup.classList.remove('active');
        clearCartAlertInfo();
    }, { once: true });
}

// Запуск - нажатие кнопки  корзина

buyPopupButton.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const parent = item.closest('.service-item');
        drawPopupBuyContent(parent);
        openModal();
        // Закрытие окна 
        // нажатие на фон
        background.addEventListener('click', (e) => {
            if (e.target == background) {
                closeModal();
            }
        }, { once: true });
        // скролл по модальному окну
        modalWindow.addEventListener('swiped-down', closeModalOnInnerSwipe, { once: true });
        // скролл по зоне закрытия модального окна
        closeSwipeBtn.addEventListener('swiped-down', closeModal, { once: true });
        // нажатие на зону закрытия модального окна
        closeSwipeBtn.addEventListener('click', closeModal, { once: true });
        //
        popupModalClose.forEach(element => {
            element.addEventListener('click', closeModal, { once: true });
        });

        buttonPopupCart.onclick = function () {
            movedToCart(parent);
            closeModal();
            showAlertToCart(parent)
        }

        //

        buttonPopupBuyNow.addEventListener('click', nextStep, { once: true });
        document.addEventListener('keydown', onKeydown, { once: true });
    })
})

// });

export { clearPopupContent };