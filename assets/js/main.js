$(document).ready(initializeApp);

var mainController;

function initializeApp(){
    mainController = new Controller({
        relatedWordsButton:'.syn>.title',
        adjectiveWordsButton:'.adj>.title'
    });
    mainController.start();
}