$(document).ready(initializeApp);

var mainController;

function initializeApp(){
    mainController = new Controller({
        relatedWordsButton:'.syn>.title',
        adjectiveWordsButton:'.adj>.title',
        startButton:'.landing-page>button'
    });
    mainController.start();
}