class Controller{
    constructor(){
        this.newGenerator=null;
        this.relevantWords = null;
    }
    putWordOnBoard = (word) => {
        console.log(word);
        this.relevantWords.getSynonyms(word);
    }

    start() {
        this.newGenerator = new IdeaGenerator({
            callback:this.putWordOnBoard
        });
        this.relevantWords = new RelevantWords({

        });
    }
}