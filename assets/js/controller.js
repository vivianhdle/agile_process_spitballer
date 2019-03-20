class Controller{
    constructor(){
        this.newGenerator=null;
        this.relevantWords = null;
        this.board = null;
        this.imageHolder = null;
        this.relatedApps = null;
    }
    putWordOnBoard = (word) => {
        console.log(word);
        this.relevantWords.getSynonyms(word);
        this.board.addWord(word);
    }

    sendToImageCard = (word) => {
        this.imageHolder.handleWordClick(word);
        if(!this.imageHolder.rejected) {
            this.relatedApps.getRelatedApps(word);
        }
    }

    showApps = (word) =>
    {
        this.relatedApps.getRelatedApps(word);
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
            callback: this.showApps
        });

        this.relatedApps = new RelatedApps({
            displayArea:'.apps'
        });
    }
}