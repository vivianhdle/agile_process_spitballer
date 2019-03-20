class RelevantWords{
    constructor(options){
        this.synonymArea = $('.syn');
        this.adjectiveArea = $('.adj');
        this.domElements={
            synonyms:null
        }
        this.synonyms = [];
        this.adjectives = [];
        //=============================================
        //BIND
        this.getSynonyms = this.getSynonyms.bind(this);
        this.gotSynonyms = this.gotSynonyms.bind(this);
        this.displaySynonyms = this.displaySynonyms.bind(this);
        this.displayAdjectives = this.displayAdjectives.bind(this);
        //=============================================
    }
    getAllData(word){
        this.getSynonyms(word);
        this.getAdjectives(word);
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
        this.displaySynonyms();
    }
    getAdjectives = (word) => {
        var ajaxOptions = {
            url:"https://api.datamuse.com/words",
            method:"get",
            dataType:"json",
            data:{
                rel_jjb:word
            },
            success:this.gotAdjectives
        }
        $.ajax(ajaxOptions)
    }
    gotAdjectives = (response) => {
        for(let item in response){
            this.adjectives.push(response[item].word);
        }
        this.displayAdjectives();
    }
    displaySynonyms(){
        $('.synonyms').remove();
        for (let item in this.synonyms){
            let newWord = $('<div>',{
                text:this.synonyms[item],
                class: 'synonyms'
            })
            this.synonymArea.append(newWord);
        }
        this.synonyms = [];
    }
    displayAdjectives(){
        $('.adjectives').remove();
        for (let item in this.adjectives){
            let newWord = $('<div>',{
                text:this.adjectives[item],
                class: 'adjectives',
                css: {
                    'display':'none'
                }
            })
            this.adjectiveArea.append(newWord);
        }
        this.adjectives = [];
    }
}
