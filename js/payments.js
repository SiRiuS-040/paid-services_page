import { clearPopupContent } from './popups.js';



document.addEventListener("DOMContentLoaded", () => {
    const popupModalClose = document.querySelectorAll('.popup-template__modal-close');

    // Выбор способа оплаты
    const paymentMethodATW = document.querySelector('.payment__method-item--atw');
    const paymentMethods = document.querySelectorAll('.payment__method-link');
    const paymentAccountToPayData = document.querySelector('.payment__account-to-pay-data');

    let paymentPayButtonData = document.querySelector('.payment__pay-data');
    const buyNowButton = document.querySelectorAll('.popup-block__button--buy-now');
    const paymentPopUpNext = document.querySelector('.payment__button-pay');
    const paymentPopUpNextDesc = document.querySelector('.payment__button-pay-desc');
    const parent = document.querySelector('.buy-service');

    let curentWalletToPay = 0;
    let currentPayData = 0;
    let currentPayListData = 0;

    // Отлов клика на чекбокс

    document.addEventListener('change', function (e) {
        let target = e.target;
        if (target.closest('.buy-service')) {
            let elem = 0;

            // console.log(elem);
            elem = target.closest('.service-item__price-item').querySelector('.raise__price-data').textContent;
            // console.log(elem);
            currentPayListData = elem;
            buyNowButton.forEach(item => {
                item.style.pointerEvents = "auto";
            })
        }
    })

    const drawMyWallet = () => {
        currentPayData = 0;

        let paymentPayData = parent.querySelector('.service-item__price-data');

        if (paymentPayData === null) {
            // console.log("нет такого класса");
            paymentPayButtonData.innerHTML = currentPayListData;
            currentPayData = currentPayListData;
        } else {
            currentPayData = paymentPayData.innerHTML;
            paymentPayButtonData.innerHTML = paymentPayData.innerHTML;
            // console.log(paymentPayData);
            // console.log(curentWalletToPay);
            // console.log(paymentAccountToPayData.innerHTML);
            curentWalletToPay = paymentPayData.innerHTML - paymentAccountToPayData.innerHTML;
            // console.log(curentWalletToPay);
        }
        if (Number(paymentAccountToPayData.innerHTML) <= 0) {
            // console.log('нет денег');
            paymentMethodATW.classList.add('visually-hidden');
        } else {

        }
    }

    function chooseMethod(link) {
        paymentMethods.forEach(function (method) {
            let parentMethod = method.closest('.payment__method-item');
            const paymentMethod = parentMethod.querySelector('.payment__method-link');

            if (link !== paymentMethod) {
                // console.log('клик по методу');
                parentMethod.classList.remove('active');
            } else {
                // console.log('мимо');
                parentMethod.classList.add('active');
            }
        })
    }

    const setMethodInfo = (link) => {
        let parentMethod = document.querySelector('.payment__method-item');
        const myWallet = parentMethod.querySelector('.my-wallet');

        if (link === myWallet) {

            if (Number(paymentAccountToPayData.innerHTML) >= Number(paymentPayButtonData.innerHTML)) {

                // console.log('Своих средств больше чем оплата');

                paymentPayButtonData.innerHTML = paymentPayButtonData.innerHTML;
                paymentPopUpNextDesc.textContent = 'Списать';

                // console.log('к оплате ' + paymentPayButtonData.innerHTML);
            } else {

                // console.log('выбрал мой кошелек');
                // console.log('мой кошелек ' + paymentAccountToPayData.innerHTML);
                // console.log('разница оплаты ' + curentWalletToPay);
                // console.log('начальная сумма к оплате ' + paymentPayButtonData.innerHTML);
                // console.log( + paymentAccountToPayData.innerHTML);
                paymentPayButtonData.innerHTML = paymentPayButtonData.innerHTML - paymentAccountToPayData.innerHTML;
                // console.log('разница оплаты ' + paymentPayButtonData.innerHTML);
                paymentPopUpNextDesc.textContent;
                // console.log('текст кнопки к оплате ' + paymentPopUpNextDesc.textContent);
                paymentPopUpNextDesc.textContent = 'Доплатить';

                // return
            }

        }
        if (link != myWallet) {
            // console.log('выбрал другой способ оплаты ');

            paymentPayButtonData.innerHTML = currentPayData;
            paymentPopUpNextDesc.textContent = 'Оплатить';
        }
    }

    paymentMethods.forEach(function (paymentMethod) {
        paymentMethod.addEventListener('click', () => chooseMethod(paymentMethod))
    });

    paymentMethods.forEach(function (paymentMethod) {
        paymentMethod.addEventListener('click', () => setMethodInfo(paymentMethod))
    });


    //

    const isEscapeKey = (evt) => evt.key === 'Escape';

    // элементы для модального окна оплатить 
    const paymentPopUp = document.querySelector('.payment');
    const paymentPopUpInner = document.querySelector('.payment__inner');
    const paymentPopUpInnerClass = '.payment__inner';
    const paymentPopUpSwipeClose = document.querySelector('.payment__swipe-close');
    const paymentPopUpCancel = document.querySelector('.payment__button-cancel');

    // попап сведения оплаты

    const paymentAlertPopUpOpen = document.querySelectorAll('.payment__button-pay');
    const paymentAlertPopUp = document.querySelector('.payment-alert');
    const paymentAlertPopUpInner = document.querySelector('.payment-alert__inner');
    const paymentAlertPopUpInnerClass = '.payment-alert__inner';
    const paymentAlertPopUpSwipeClose = document.querySelector('.payment-alert__swipe-close');
    const paymentAlertPopUpCancel = document.querySelector('.payment-alert__button-close');
    const paymentAlertPopUpNext = document.querySelector('.payment-alert__button-my-orders');
    //

    let scrollY;

    function clickOpenPopup(openModalBtn, modalWindow, modalInner, modalInnerClass, closeSwipeBtn, cancelBtn, nextBtn) {
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
            drawMyWallet();
        }
        // закрытие модального окна
        const closeModal = () => {
            modalWindow.classList.remove('active');
            background.classList.remove('overlay--active');

            // вставить очистку модального окна
            nextBtn.removeEventListener('click', closeModal);
            cancelBtn.removeEventListener('click', closeModal);
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
            // background.classList.remove('overlay--active');
            // console.log('свайп вниз');
            nextBtn.removeEventListener('click', closeModal);
            cancelBtn.removeEventListener('click', closeModal);
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

        openModalBtn.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault();
                const parent = item.closest('.service-item');
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

                popupModalClose.forEach(element => {
                    element.addEventListener('click', closeModal, { once: true });
                });
                cancelBtn.addEventListener('click', closeModal, { once: true });
                nextBtn.addEventListener('click', nextStep, { once: true });
                paymentAlertPopUpNext.addEventListener('click', closeModal, { once: true });
                document.addEventListener('keydown', onKeydown, { once: true });
            })
        })

    };

    clickOpenPopup(buyNowButton, paymentPopUp, paymentPopUpInner, paymentPopUpInnerClass, paymentPopUpSwipeClose, paymentPopUpCancel, paymentPopUpNext);
    clickOpenPopup(paymentAlertPopUpOpen, paymentAlertPopUp, paymentAlertPopUpInner, paymentAlertPopUpInnerClass, paymentAlertPopUpSwipeClose, paymentAlertPopUpCancel, paymentAlertPopUpNext);
});
