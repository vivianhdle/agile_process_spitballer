class Controller{
    constructor(){
        this.newGenerator=null;
    }
    putWordOnBoard(word){
        console.log(word);
    }
    createIdeaGenerator(){
        this.newGenerator = new IdeaGenerator({
            callback:this.putWordOnBoard
        }) 
    }
}