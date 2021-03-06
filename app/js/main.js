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
        };

        if(window.innerWidth <= '767') {
            displayMenu();
        } 
    };


    /* Scroll animation */
    const animatedItems = document.querySelectorAll('.anim-item');

    if(animatedItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        
    };

    function animOnScroll() {
        animatedItems.forEach(item => {
            const animItemHeight = item.offsetHeight;
            const animItemOffset = offset(item).top;
            const animStart = 3;
            
            let animPoint = window.innerHeight - animItemHeight/animStart;
            if(animItemHeight > window.innerHeight) {
                animPoint = window.innerHeight - window.innerHeight/animStart;
            }

            if(pageYOffset > animItemOffset - animPoint && pageYOffset < (animItemOffset + animPoint)) {
                item.classList.add('animated');
            } 
        })
    };

    function offset(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return {top: rect.top + scrollTop}
    }

    setTimeout(() => {
        animOnScroll();}, 1000);
    





/* <--------------------Portfolio Slider-------------------> */


    /* Portfolio tabs */
    const portfolioBtnList = document.querySelectorAll('.portfolio__btn');
    const sliderList = document.querySelector('.portfolio__slider .slider__list');

    portfolioBtnList.forEach(btn => {
        btn.addEventListener('click', activateTab);
    });

    function activateTab() {
        const linkBox = this.nextElementSibling;
        const btnValue = this.getAttribute('value');
        closeTab();

        this.classList.add('active');
        linkBox.style.display = 'block';
        sliderList.classList.add('fade');
        setTimeout(() => {
            linkBox.classList.add('active');
            createSlider(btnValue);
            showSlides(0);
            sliderList.classList.remove('fade');
        }, 700);

        
    };

    function closeTab() {
        portfolioBtnList.forEach(item => {
            const linkBox = item.nextElementSibling;
            item.classList.remove('active');
            linkBox.style.display = 'none';
            linkBox.classList.remove('active');
        });
    };



    /* Filling slider*/
    const projectsSrc = {
        flowerbox: ['flowerbox/1.jpg', 'flowerbox/2.jpg', 'flowerbox/3.jpg', 'flowerbox/4.jpg'],
        kiliyabuild: ['kiliyabuild/1.jpg', 'kiliyabuild/2.jpg', 'kiliyabuild/3.jpg', 'kiliyabuild/4.jpg', 'kiliyabuild/5.jpg'],
        mayak: ['mayak/1.jpg', 'mayak/2.jpg', 'mayak/3.jpg', 'mayak/4.jpg', 'mayak/5.jpg'],
        serg: ['serg/1.jpg', 'serg/2.jpg', 'serg/3.jpg', 'serg/4.jpg'],
    };


    function createSliderItem(src) {
        const sliderItemTemplate = '<div class="slider__item"><img class="slider__img" src="images/content/slider/' + src +'" alt="Main page"></div>';

        return sliderItemTemplate;
    };

    function fillSlider(project) {
        const srcArray = projectsSrc[project];
        sliderList.innerHTML = '';
        srcArray.forEach(src => {
            let item = createSliderItem(src);
            sliderList.innerHTML += item;
        });
    };

    function createSlider(value) {
        if(value in projectsSrc && value !== undefined) {
            fillSlider(value);
        } else {
            fillSlider(Object.keys(projectsSrc)[0]);
            console.log('Invalid tab value!')
        }
    };

    





    /* Slider functionality*/
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

    
    
    
    