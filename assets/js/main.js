$(document).ready(initializeApp);

var mainController;

function initializeApp(){
    mainController = new Controller({
        relatedWordsButton:'.syn>.title',
        adjectiveWordsButton:'.adj>.title'
    });
    mainController.start();
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
}