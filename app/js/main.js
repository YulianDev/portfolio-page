'use strict';
/* Position social and mail fixed divs */
const container = document.querySelector('.container');
const socialBox = document.querySelector('.social-box');
const mailBox = document.querySelector('.mail-box');
const containerStyles = getComputedStyle(container);

calcBoxesPosition();
window.addEventListener('resize', calcBoxesPosition);

function calcBoxesPosition() {
    
    let marginLeft = containerStyles.marginLeft;
    let marginRight = containerStyles.marginRight;

    if(window.innerWidth <= '1230') {
        window.removeEventListener('resize', calcBoxesPosition);
        socialBox.style.left = '5px';
        mailBox.style.right = '-76px';
    } else {
        socialBox.style.left = marginLeft;
        mailBox.style.right = (parseFloat(marginRight) - 85) + 'px';
    }
};


/* Slider */
const sliderPrevArrow = document.querySelector('.slider__prevArrow');
const sliderNextArrow = document.querySelector('.slider__nextArrow');
let slideIndex = 0;

showSlides(slideIndex);

    sliderPrevArrow.addEventListener('click', showPrevSlide);
    sliderNextArrow.addEventListener('click', showNextSlide);

    function showSlides(n) {
        const itemList = document.querySelectorAll('.slider__item');

        if(n > itemList.length - 1) {
            slideIndex = 0;
        } else if(n < 0) {
            slideIndex = itemList.length - 1;
        }

        itemList.forEach(item => {
            item.style.display = 'none';
        });

        itemList[slideIndex].style.display = 'block';
    }

    function showNextSlide() {
        slideIndex += 1;
        showSlides(slideIndex);
    }
    function showPrevSlide() {
        slideIndex -= 1;
        showSlides(slideIndex)
    }



    /* Portfolio tabs */
     const portfolioBtnList = document.querySelectorAll('.portfolio__btn');

    portfolioBtnList.forEach(btn => {
        btn.addEventListener('click', showTab);
    });

    function showTab() {
        const linkBox = this.nextElementSibling;
        closeTab();

        this.classList.add('active');
        linkBox.style.display = 'block';
        setTimeout(() => {linkBox.classList.add('active')}, 700);
    };

    function closeTab() {
        portfolioBtnList.forEach(item => {
            const linkBox = item.nextElementSibling;
            item.classList.remove('active');
            linkBox.style.display = 'none';
            linkBox.classList.remove('active');
        });
    };



   /*  Random facts */ 
   setInterval(changeFact, 5000);

   const hiddenFacts = ["I was the head of the supply department", "Prefer rain over sunny weather", "Favorite color is white", "I play football", "I'm 24 years old"];
   const shownFacts = document.querySelectorAll('.facts__item');

    function changeFact() {
        const shownIndex = getRandomInt(shownFacts.length-1);
        const item = shownFacts[shownIndex];
        const oldFact = item.textContent;
        const newFact = hiddenFacts.shift();

        item.classList.add('fade');
        setTimeout(() => {
            item.innerText = newFact;
            item.classList.remove('fade');
        }, 2000);
        
        hiddenFacts.push(oldFact);
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    };


    /* Header visibility */
    let windowPosition;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if(windowPosition < this.pageYOffset) {
            header.classList.add('hide');
        } else if(windowPosition > this.pageYOffset) {
            header.classList.remove('hide');
        }
        windowPosition = this.pageYOffset;
    });


    /* Menu functionality */
    const menuIcon = document.querySelector('.menu__icon');
    const menuList = document.querySelector('.menu__list');
    const body = document.querySelector('body');
 

    menuIcon.addEventListener('click', displayMenu);
    window.addEventListener('click', (e) => {inMenu(e)});

    function displayMenu() {
        menuIcon.classList.toggle('active');
        menuList.classList.toggle('active');
        body.classList.toggle('lock');
    };

    function inMenu(e) {
        const target = e.target;
        const isMenu = target == menuList || menuList.contains(target);
        const isMenuActive = menuList.classList.contains('active');
        const isMenuIcon = target == menuIcon;


        if(!isMenu && !isMenuIcon && isMenuActive) {
            displayMenu();
        }
    };


    /* Scroll to section */
    const navLinks = document.querySelectorAll('a.nav-link');
    const menuLinks = document.querySelectorAll('a.menu__link');

    navLinks.forEach(link => {
        link.addEventListener('click', onLinkClick);
    });

    function onLinkClick(e) {
        e.preventDefault();
        const link = e.target;

        

        if(link.classList.contains('menu__link')) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
            });
            link.classList.add('active');
        };

        if(link.hasAttribute('href') && document.querySelector(link.getAttribute('href'))) {
            const goto = document.querySelector(link.getAttribute('href'));
            const coordinates = goto.getBoundingClientRect().top + pageYOffset;

            window.scrollTo({
                top: coordinates,
                behavior: 'smooth'
            });
        }
    };



    /* Change active class */
    const sections = document.querySelectorAll('section[id]');
    const sectionPosition = new Map();






    
    
    