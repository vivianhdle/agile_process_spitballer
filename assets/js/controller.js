class Controller{
    constructor(options){
        this.newGenerator=null;
        this.relevantWords = null;
        this.board = null;
        this.imageHolder = null;
        this.relatedApps = null;
        this.buttons={
            relatedWords: $(options.relatedWordsButton),
            adjectiveWords: $(options.adjectiveWordsButton)
        }
    }
    putWordOnBoard = (word) => {
        console.log(word);
        if(this.board.addWord(word)) {
            this.relevantWords.getAllData(word);
        }
    }
    addEventListeners = () => {
        this.buttons.relatedWords.on('click', this.toggleRelatedWords);
        this.buttons.adjectiveWords.on('click',this.toggleAdjectives);
    }
    toggleRelatedWords(){
        $('.adjectives').hide();
        $('.synonyms').toggle();
    }
    toggleAdjectives(){
        $('.synonyms').hide();
        $('.adjectives').toggle();
    }

    sendToImageCard = word => {
        this.imageHolder.handleWordClick(word);
        if(!this.imageHolder.rejected) {
            this.relatedApps.getRelatedApps(word);
        }
    }
    showApps = (word) =>
    {
        this.relatedApps.getRelatedApps(word);
    }
    showRelatedWords = word => {
        this.relevantWords.getAllData(word);
    }

    start() {
        this.newGenerator = new IdeaGenerator({
            callback:this.putWordOnBoard
        });
        this.relevantWords = new RelevantWords({

        });
        this.board = new Corkboard({
            callback: this.sendToImageCard
        });
        $('.spitboard-container').append(this.board.render());
        this.imageHolder = new imageHolder({
            showApps: this.showApps,
            showRelatedWords: this.showRelatedWords
        });

        this.relatedApps = new RelatedApps({
            displayArea:'.apps'
        });
        this.addEventListeners();
    }
}