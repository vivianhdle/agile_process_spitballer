$(document).ready(initializeApp);

var mainController;

function initializeApp(){
    mainController = new Controller({
        buttons:{
            relatedWords:'.syn>.title',
            adjectiveWords:'.adj>.title',
            start:'.landing-page>button',
            random3:'.random3',
            randomizeBoard: '.randomize-board',
            clearBoard:'.clear-board',
            yesClearBoard:'.yes-clear',
            noClearBoard:'.no-clear',
            addWordButton:'.add-button'
        },
        relatedWordsButton:'.syn>.title',
        adjectiveWordsButton:'.adj>.title',
        startButton:'.landing-page>button',
        random3Button:'.random3',
        randomizeBoardButton: '.randomize-board',
        displayAreas:{
            relevant:'.relevant',
            synonymArea:'.syn',
            adjectiveArea:'adj',
            appArea:'.apps',
            appTitleArea:'.names',
            appContainer:'.app-container',
        }
    });
    mainController.start();
    // particlesJS.load('particles-js', 'assets/particles_landing.json', function() {});
}