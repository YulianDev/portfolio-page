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
        socialBox.style.left = '15px';
        mailBox.style.right = '-76px';
    } else {
        socialBox.style.left = marginLeft;
        mailBox.style.right = (parseFloat(marginRight) - 85) + 'px';
    }
};