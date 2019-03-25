$(document).ready(initializeApp);

var mainController;

function initializeApp(){
    mainController = new Controller({
        relatedWordsButton:'.syn>.title',
        adjectiveWordsButton:'.adj>.title',
        startButton:'.landing-page>button',
        random3Button:'.random3',
        randomizeBoardButton: '.random-fill-button'
    });
    mainController.start();
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
}