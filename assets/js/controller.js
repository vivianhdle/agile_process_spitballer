class Controller{
    constructor(){
        this.newGenerator=null;
    }
    putWordOnBoard(){

    }
    createIdeaGenerator(){
        this.newGenerator = new IdeaGenerator({
            callBack:this.putWordOnBoard
        }) 
    }
}