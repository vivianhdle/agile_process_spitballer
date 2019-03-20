class Controller{
    constructor(){
        this.newGenerator=null;
        this.relevantWords = null;
        this.board = null;
        this.imageHolder = null;
    }
    putWordOnBoard = (word) => {
        console.log(word);
        this.relevantWords.getSynonyms(word);
        this.board.addWord(word);
    }

    sendToImageCard = (word) => {
        this.imageHolder.handleWordClick(word);
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
        this.imageHolder = new imageHolder;
    }
}