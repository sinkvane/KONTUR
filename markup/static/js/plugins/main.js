window.onload = function () { document.documentElement.style.opacity = '1'; }

// All consts

const header = document.querySelector('.header'),
    headerMobileBtn = document.querySelector('.header__mobile'),
    navTop = document.querySelector('.nav__top'),
    navBottom = document.querySelector('.nav__bottom'),
    headerInnerLogo = document.querySelector('.header-inner__logo'),
    headerInnerNav = document.querySelector('.header-inner__nav'),
    first = document.querySelector('.main'),
    headerHeight = header.offsetHeight,
    firstHeight = first.offsetHeight / 2,
    pageMask = document.querySelector('.overlay'),
    accordions = document.querySelectorAll('.accordion'),
    accordionTitle = document.querySelector('.accordion__title'),
    navMenu = document.querySelector('.navmenu-inner'),
    body = document.querySelector('body'),
    paddingOffset = window.innerWidth - document.body.clientWidth + 'px',
    navMenuBlock = document.querySelector('.navmenu');

function menuShow() {
    header.classList.add('header--fixed');

    headerMobileBtn.style.display = 'grid';

    navTop.classList.add('nav__top--fixed');

    headerInnerNav.classList.add('header-inner__nav--fixed');

    headerInnerLogo.classList.add('hidden');

    navBottom.classList.add('hidden');

    first.style.marginTop = `${headerHeight}px`;
}

function menuHide() {
    header.classList.remove('header--fixed');

    headerMobileBtn.style.display = 'none';

    navTop.classList.remove('nav__top--fixed');

    headerInnerNav.classList.remove('header-inner__nav--fixed');

    headerInnerLogo.classList.remove('hidden');

    navBottom.classList.remove('hidden');

    first.style.marginTop = null;
}

// Fixed header on scroll

window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;

    if (scrollDistance >= firstHeight + headerHeight + 150) {
        menuShow();
    } else {
        menuHide();
    }
});

// Click on mask to close NavMenu

document.addEventListener('click', (e) => {
    if (e.target === document.querySelector('.overlay')) {
        menuHide();

        navMenu.classList.remove('navmenu-inner--open');

        navMenuBlock.classList.remove('navmenu--opened');

        pageMask.classList.remove('overlay--opened');

        body.classList.remove('no-scroll');

        header.classList.add('header--fixed');

        headerMobileBtn.style.display = 'grid';

        navTop.classList.add('nav__top--fixed');

        headerInnerNav.classList.add('header-inner__nav--fixed');

        headerInnerLogo.classList.add('hidden');

        navBottom.classList.add('hidden');

        first.style.marginTop = `${headerHeight}px`;

        headerMobileBtn.classList.remove('open');

    }
});

// Accordion menu

document.addEventListener('DOMContentLoaded', () => {
    accordions.forEach(el => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget;
            const control = self.querySelector('.accordion__control');
            const content = self.querySelector('.accordion__content');

            self.classList.toggle('open');

            if (self.classList.contains('open')) {

                content.style.maxHeight = content.scrollHeight + 'px';
                accordionTitle.style.color = '#F47A0B';
            } else {
                control.setAttribute('aria-expanded', false);
                content.setAttribute('aria-hidden', true);
                content.style.maxHeight = null;
                accordionTitle.style.color = '#313B59';
            }
        });
    });
});

//Mobile menu Mask

headerMobileBtn.addEventListener('click', () => {
    headerMobileBtn.classList.toggle('open');
    navMenuBlock.classList.toggle('navmenu--opened');
    navMenu.classList.toggle('navmenu-inner--opened');
    body.classList.toggle('no-scroll');
    pageMask.classList.toggle('overlay--opened');
});

//Phone mask

let inputs = document.querySelectorAll('input[type="tel"]'),
    im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

//Validate forms

function validateForms(selector, rules) {

    new window.JustValidate(selector, {
        rules: rules,
        submitHandler: function (form, values, ajax) {
            console.log(form);

            let formData = new FormData(form);

            fetch("mail.php", {
                method: "POST",
                body: formData
            })
                .then(function (data) {
                    console.log(data);
                    console.log('Отправлено');
                    form.reset();
                });
        }
    });
}

validateForms('.quest__form', { mail: { required: true, email: true }, fio: { required: true }, phone: { required: true } });

//Fade animations plugin

new WOW().init();

// Reset phone form

let phoneForm = document.querySelector('.form__block--reset');
let resetBtn = document.querySelector('.reset__form');
let phoneInput = document.querySelector('.form__input--phone');

phoneForm.addEventListener('input', (e) => {
    resetBtn.classList.remove('reset__form--hidden');
});

resetBtn.addEventListener('click', (e) => {
    resetBtn.classList.add('reset__form--hidden');
    phoneInput.value = '';
});