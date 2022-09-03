
document.addEventListener("DOMContentLoaded", () => {

    // ОТКРЫТИЕ МОДАЛОК

    const popupModalClose = document.querySelectorAll('.popup-template__modal-close');

    const promoInputField = document.querySelector('.act-promo__text-input');
    const promoUseField = document.querySelector('.use-promo__text-input');


    const isEscapeKey = (evt) => evt.key === 'Escape';

    // элементы для модального окна ввести Промокод



    const promocodeActPopUpTitle = document.querySelector('.act-promo__main-title');
    const promocodeActPopUpDesc = document.querySelector('.act-promo__desc');

    const promocodeActPopUpAlert = document.querySelector('.act-promo__desc-alert');


    const promoCodeOpenInserButton = document.querySelectorAll('.main-nav__button--open-use-promocode');
    const promocodeActPopUp = document.querySelector('.act-promo');
    const promocodeActPopUpInner = document.querySelector('.act-promo__inner');
    const promocodeActPopUpInnerClass = '.act-promo__inner';
    const promocodeActPopSwipeClose = document.querySelector('.act-promo__swipe-close');


    const promocodeCheckeControls = document.querySelector('.act-promo__controls');

    const promocodeActPopCancel = document.querySelector('.act-promo__button-cancel');
    const promocodeActPopNext = document.querySelector('.act-promo__button-check');


    // элементы для модального окна использовать Промокоды


    const promoCodeActivateControls = document.querySelector('.use-promo__controls');

    const promoCodeOpenCheckButton = document.querySelectorAll('.act-promo__button-check');
    const promocodeUsePopUp = document.querySelector('.use-promo');
    const promocodeUsePopUpInner = document.querySelector('.use-promo__inner');
    const promocodeUsePopUpInnerClass = '.use-promo__inner';
    const promocodeUsePopSwipeClose = document.querySelector('.use-promo__swipe-close');
    const promocodeUsePopCancel = document.querySelector('.use-promo__button-cancel');
    const promocodeUsePopNext = document.querySelector('.use-promo__button-activate-now');

    // элементы для модального окна Промокод применен

    const promoCodeActivateButton = document.querySelectorAll('.use-promo__button-activate-now');
    const promocodeActivatedPopUp = document.querySelector('.activated-promo');
    const promocodeActivatedPopUpInner = document.querySelector('.activated-promo__inner');
    const promocodeActivatedPopUpInnerClass = '.activated-promo__inner';
    const promocodeActivatedPopUpSwipeClose = document.querySelector('.activated-promo__swipe-close');

    const promocodeActivatedPopCancel = document.querySelector('.activated-promo__button-cancel');
    const promocodeActivatedPopNext = document.querySelector('.activated-promo__button-go-to-orders');

    // элементы для модального окна Промокод применен

    // const promoCodeActivateButton = document.querySelectorAll('.use-promo__button--buy-now');
    // const promocodeActivatedPopUp = document.querySelector('.use-promo');
    // const promocodeActivatedPopUpInner = document.querySelector('.use-promo__inner');
    // const promocodeActivatedPopUpInnerClass = '.use-promo__inner';
    // const promocodeActivatedPopUpSwipeClose = document.querySelector('.use-promo__swipe-close');

    //




    const lWidth = window.screen.width;

    let scrollY;

    function clickOpenpopup(openModalBtn, modalWindow, modalInner, modalInnerClass, closeSwipeBtn, cancelBtn, nextBtn) {
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

            if (lWidth < 1140) {


            }
        }
        // разблокировать скролл
        let enableScroll = function () {
            html.style.height = 'auto';
            body.style.height = 'auto';
            body.style.overflow = 'hidden auto';
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

            setControlsDefault();




        }
        // закрытие модального окна
        const closeModal = () => {
            modalWindow.classList.remove('active');
            background.classList.remove('overlay--active');


            promoInputField.removeAttribute("disabled", false);
            promoInputField.value = '';
            // promoUseField.value = '';

            setControlsDefault();

            promocodeActivatedPopNext.removeEventListener('click', closeModal);
            nextBtn.removeEventListener('click', closeModal);
            cancelBtn.removeEventListener('click', closeModal);
            modalWindow.removeEventListener('swiped-down', closeModalOnInnerSwipe);
            closeSwipeBtn.removeEventListener('swiped-down', closeModal);
            closeSwipeBtn.removeEventListener('click', closeModal);

            promoCodeOpenCheckButton.forEach(item => {
                item.style.pointerEvents = "none";
            })

            setTimeout(() => {
                enableScroll();
                body.style.top = `0px`;
                window.scrollTo(0, scrollY);
            }, 200);
        }

        const nextStep = () => {

            if (nextBtn.classList.contains('act-promo__button-check')) {

                console.log('кнопка проверить промокод');

            }

            if (nextBtn.classList.contains('act-promo__button-check') == false) {

                // closeModal();

                setControlsDefault();

                modalWindow.classList.remove('active');
                // console.log('свайп вниз');

                nextBtn.removeEventListener('click', closeModal);
                cancelBtn.removeEventListener('click', closeModal);
                modalWindow.removeEventListener('swiped-down', closeModalOnInnerSwipe);
                closeSwipeBtn.removeEventListener('swiped-down', closeModal);
                closeSwipeBtn.removeEventListener('click', closeModal);

            }

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
                // console.log('начало');
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

                cancelBtn.addEventListener('click', closeModal, { once: true });

                nextBtn.addEventListener('click', nextStep, { once: true });
                // nextBtn.addEventListener('click', closeAndOpen, { once: true });

                document.addEventListener('keydown', onKeydown, { once: true });

                promocodeActivatedPopNext.addEventListener('click', closeModal, { once: true });

                popupModalClose.forEach(element => {
                    element.addEventListener('click', closeModal, { once: true });
                });



            })
        })

    };

    clickOpenpopup(promoCodeOpenInserButton, promocodeActPopUp, promocodeActPopUpInner, promocodeActPopUpInnerClass, promocodeActPopSwipeClose, promocodeActPopCancel, promocodeUsePopNext);
    // clickOpenpopup(promoCodeOpenCheckButton, promocodeUsePopUp, promocodeUsePopUpInner, promocodeUsePopUpInnerClass, promocodeUsePopSwipeClose, promocodeUsePopCancel, promocodeUsePopNext);
    clickOpenpopup(promoCodeActivateButton, promocodeActivatedPopUp, promocodeActivatedPopUpInner, promocodeActivatedPopUpInnerClass, promocodeActivatedPopUpSwipeClose, promocodeActivatedPopCancel, promocodeActivatedPopNext);



    //

    // Проверка промокода

    function validateCode() {

        promoInputField.style.color = "red";
        promoInputField.style.borderColor = "red";

        const validityState = promoInputField.validity;
        // console.log('patternMismatch');
        // console.log(validityState.patternMismatch);

        if (validityState.patternMismatch) {
            promoInputField.setCustomValidity('Допускаются только A-Z a-z 0-9, минимум 4 символа');
            // promoInputField.setCustomValidity('Допускаются только A-Z a-z 0-9, минимум 4 символа');
        }

        else if (promoInputField.value.length < 4) {
            promoInputField.setCustomValidity('минимум 4 символа');
        }
        else {
            promoInputField.setCustomValidity('');
        }

        console.log(promoInputField.reportValidity());

        promoInputField.reportValidity();
    }

    const promoArray = [
        '11111111',
        '1111',
        '22222222',
        '33333333'
    ]


    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    }

    promoCodeOpenCheckButton.forEach(item => {
        item.style.pointerEvents = "none";
    })



    promoInputField.addEventListener('input', () => {

        setControlsDefault();

        // promoInputField.style.color = "var(--gray-800)";

        if (promoInputField.value.length > 0) {
            let inputDataArr = promoInputField.value.toUpperCase().split(/[- — /]/);
            let inputDataClear = inputDataArr.join('');
            let inputDataArrNew = inputDataClear.match(/.{1,4}/g);
            promoInputField.value = inputDataClear;

        }

        // promoUseField.value = promoInputField.value;

        validateCode();


        if (promoInputField.reportValidity() != true) {
            console.log('промежуточная проверка не прошла - повторить');


            promoCodeOpenCheckButton.forEach(item => {
                item.style.pointerEvents = "none";
            })





        } else if (promoInputField.reportValidity() === true) {

            promoInputField.style.color = "var(--gray-800)";
            promoInputField.style.borderColor = "var(--gray-500)";


            console.log('промежуточная проверка ПРОЙДЕНА!');

            promoCodeOpenCheckButton.forEach(item => {
                item.style.pointerEvents = "auto";
            })




            // if (contains(promoArray, promoInputField.value) != true) {
            //     console.log('ИТОГОВАЯ проверка не прошла - повторить');

            //     return

            // } else if (contains(promoArray, promoInputField.value) === true) {

            //     console.log('ИТОГОВААЯ проверка ПРОЙДЕНА!');

            //     promoInputField.style.color = "green";
            //     promoInputField.style.borderColor = "green";

            //     promoCodeOpenCheckButton.forEach(item => {
            //         item.style.pointerEvents = "auto";
            //     })
            // }
        }
    })


    let newInputData = promoInputField.value;

    const setControlsDefault = () => {

        promoInputField.style.color = "var(--gray-800)";
        promoInputField.style.borderColor = "var(--gray-500)";

        promocodeActPopUpTitle.textContent = 'Активация промокода';
        promoCodeActivateControls.classList.remove('active');

        promocodeUsePopUpInner.classList.remove('active');
        promocodeCheckeControls.classList.add('active');
        promocodeActPopUpDesc.classList.add('active');

        promocodeActPopUpAlert.classList.remove('active');
    }


    promoCodeOpenCheckButton.forEach(item => {
        item.addEventListener('click', event => {




            if (contains(promoArray, promoInputField.value) != true) {
                console.log('ИТОГОВАЯ проверка не прошла - повторить');


                promocodeActPopUpAlert.classList.add('active')

                promoInputField.style.color = "var(--red-600)";
                promoInputField.style.borderColor = "var(--red-600)";

                return

            } else if (contains(promoArray, promoInputField.value) === true) {

                console.log('ИТОГОВААЯ проверка ПРОЙДЕНА!');

                promoInputField.setAttribute("disabled", true);

                promocodeActPopUpTitle.textContent = 'Услуга по промокоду';

                promoCodeActivateControls.classList.add('active');

                promocodeUsePopUpInner.classList.add('active');

                promocodeCheckeControls.classList.remove('active');
                promocodeActPopUpDesc.classList.remove('active');



                promoInputField.style.color = "green";
                promoInputField.style.borderColor = "green";

                promoCodeOpenCheckButton.forEach(item => {
                    item.style.pointerEvents = "auto";
                })
            }
        })
    })

    promocodeUsePopCancel.addEventListener('click', () => {

        setControlsDefault();

        promoInputField.removeAttribute("disabled", true);
    })




});

