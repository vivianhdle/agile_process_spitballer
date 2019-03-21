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
            $('.image-wrapper').show();
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
        $('.instructions').hide();
        // const instructions = $('<div>',{

        // })
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
            synonymArea:$('.syn'),
            adjectiveArea:$('.adj')
        });
        $('.relevant').hide();
        this.board = new Corkboard({
            callback: this.sendToImageCard
        });
        $('.spitboard-container').append(this.board.render());
        $('.spit-board').hide();
        this.imageHolder = new imageHolder({
            showApps: this.showApps,
            showRelatedWords: this.showRelatedWords
        });
        
        this.relatedApps = new RelatedApps({
            displayArea:'.apps'
        });

        $(".app-container").append(
            $('<div>',{
                text:'CLICK AN IMAGE FOR RELATED APPS/WORDS',
                class:'app-instructions'
                })
            )
        $(".app-container>*").hide()
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