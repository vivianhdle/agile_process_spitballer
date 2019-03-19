class RelevantWords{
    constructor(options){
        this.displayArea = $('.relevant');
        this.domElements={
            synonyms:null
        }
        this.synonyms = [];
        //=============================================
        //BIND
        this.getSynonyms = this.getSynonyms.bind(this);
        this.gotSynonyms = this.gotSynonyms.bind(this);
        this.displayWords = this.displayWords.bind(this);
        //=============================================
    }
    getSynonyms(word){
        var ajaxOptions = {
            url:"https://api.datamuse.com/words",
            method:"get",
            dataType:"json",
            data:{
                rel_syn:word
            },
            success:this.gotSynonyms
        }
        $.ajax(ajaxOptions)
    }
    gotSynonyms(response){
        for(let item in response){
            this.synonyms.push(response[item].word);
        }
        console.log(this.synonyms);
        this.displayWords();
    }
    displayWords(){
        for (let item in this.synonyms){
            let newWord = $('<div>',{
                text:this.synonyms[item]
            })
            this.displayArea.append(newWord);
        }
    }
}
