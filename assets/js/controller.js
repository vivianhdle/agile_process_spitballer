
/**
 * Class representing the overarching object that creates the page objects and handles communication between them
 */
class Controller{
    /**
     * Creates a Controller object
     * @param options - object holding the selectors for the related and adjective words buttons
     */
    constructor(options){
        this.newGenerator=null;
        this.relevantWords = null;
        this.board = null;
        this.imageHolder = null;
        this.relatedApps = null;
        this.buttons={
            relatedWords: $(options.relatedWordsButton),
            adjectiveWords: $(options.adjectiveWordsButton),
            startButton: $(options.startButton),
            random3: $(options.random3Button)
        }
    }

    /**
     * Takes a word from IdeaGenerator callback and attempts to put the word on the Board object
     *
     * @param {string} word - the word to be added to the Board
     */
    putWordOnBoard = (word) => {
        if(this.board.addWord(word)) {
            $('.image-wrapper').show();
            $('.image-random-div').show();
        }
    }

    /**
     * Adds click handlers to the related and adjective words buttons
     */
    addEventListeners = () => {
        this.buttons.relatedWords.on('click', this.toggleRelatedWords);
        this.buttons.adjectiveWords.on('click',this.toggleAdjectives);
        this.buttons.startButton.on('click',this.startButton),
        this.buttons.random3.on('click', this.select3Images)

    }

    /**
     * hides landing page and makes an API call 
     */
    startButton = () => {
        $('.landing-page').hide()
        this.newGenerator.generateWords();
    }

    /**
     * Shows the related words div and hides the adjective words div
     */
    toggleRelatedWords(){
        $('.syn i').toggleClass('flipped');
        $('.adj i').removeClass('flipped');
        $('.adjectives').hide();
        $('.synonyms').toggle();
    }

    /**
     * Hides the related words div and shows the adjective words div
     */
    toggleAdjectives(){
        $('.adj i').toggleClass('flipped');
        $('.syn i').addClass('flipped');
        $('.synonyms').hide();
        $('.adjectives').toggle();
    }

    /**
     * Takes a word from the Board and sends it to ImageHolder to be made into an Image
     * @param word - the word to make an Image off of
     */
    sendToImageCard = word => {
        this.imageHolder.handleWordClick(word);
        $('.instructions').hide();
    }

    /**
     * Tells related apps object to make API call for apps
     * @param {string} word - the word to call the API with
     */
    showApps = (word) =>
    {
        this.relatedApps.getRelatedApps(word);
    }

    /**
     * Tells relevant words object to call API and get related words and adjectives
     * @param {string} word - the word used in the API call
     */
    showRelatedWords = word => {
        this.relevantWords.getAllData(word);
    }

    select3Images = () => {
        this.imageHolder.clear();
        $('.instructions').hide();
        let imagesToAdd = this.board.selectAtRandom();
        for (let index in imagesToAdd) {
            this.imageHolder.handleWordClick(imagesToAdd[index]);
        }
    }

    /**
     * Instantiates all the page objects and calls the addEventListeners function
     */
    start() {
        this.newGenerator = new IdeaGenerator({
            callback:this.putWordOnBoard
        });

        this.relevantWords = new RelevantWords({
            synonymArea:$('.syn'),
            adjectiveArea:$('.adj')
        });

        $('.relevant').hide();
        this.board = new Board({
            callback: this.sendToImageCard
        });

        $('.spitboard-container').append(this.board.render());
        $('.spit-board').hide();
        this.imageHolder = new imageHolder({
            showApps: this.showApps,
            showRelatedWords: this.showRelatedWords
        });
        
        this.relatedApps = new RelatedApps({
            appArea:'.apps',
            titleArea:'.names',
            appContainer:'.app-container'
        });

        $('.image-random-div').hide();

        /*========================================
            Instructions elements to guide user
        =========================================*/
        $('.image-wrapper').append(
            $('<div>',{
                text:'CLICK AN IDEA FROM BOARD',
                class:'instructions'
            })).hide();

        $(".app-container").append(
            $('<div>',{
                text:'CLICK AN IMAGE FOR RELATED APPS/WORDS',
                class:'app-instructions'
                })
            );

        $(".app-container>*").hide();

        $('.spit-board').append($('<div>',{
            text:'CLICK AN IDEA',
            class:'instructions',
            css:{
                "text-align":"center"
            }
        }));

        this.addEventListeners();
    }
}