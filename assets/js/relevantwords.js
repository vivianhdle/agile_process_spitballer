/**
 * looks for related words/related adjectives to a specific word
 */
class RelevantWords{
    /**will take in display areas, and create storage for our synonym/adjective list and dom elements
     * @param {object} options - display areas for synonyms/adjectives
     */
    constructor(options){
        this.displayAreas = {
            synonymArea: options.synonymArea,
            adjectiveArea:options.adjectiveArea
        }
        this.callbacks={
            putWordOnBoard:options.callbacks.putWordOnBoard
        }
        this.synonyms = [];
        this.adjectives = [];
        //==========================================================
        //BIND
        this.getSynonyms = this.getSynonyms.bind(this);
        this.gotSynonyms = this.gotSynonyms.bind(this);
        this.displaySynonyms = this.displaySynonyms.bind(this);
        this.displayAdjectives = this.displayAdjectives.bind(this);
        //===========================================================
    }
    /**
     * Makes API calls for synonyms and adjectives
     * @param {string} word - search this word for synonyms/adjectives
     */
    getAllData(word){
        this.getSynonyms(word);
        this.getAdjectives(word);
    }
    /**
     * If called, will make an API call for synonyms
     * @param {string} word  - search this word for synonyms
     */
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
    /**
     * The success call for getting synonyms, will save them in a list and display them
     * @param {object} response - data we receieve back (synonyms)
     */
    gotSynonyms(response){
        for(let item in response){
            this.synonyms.push(response[item].word);
        }
        this.displaySynonyms();
    }
    /**
     * If called, will make an API call for adjectives
     * @param {string} word - search this word for adjectives
     */
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
    /**
     * The success call for getting adjectives, will save them in a list and display them
     * @param {object} response - data we receive back (adjectives)
     */
    gotAdjectives = (response) => {
        for(let item in response){
            this.adjectives.push(response[item].word);
        }
        this.displayAdjectives();
    }
    /**
     * clears the display,loops through synonym list, and makes a new Synonym class and displays it and empties the list.
     */
    displaySynonyms(){
        $('.synonyms').remove();
        if(this.synonyms.length === 0){
            this.displayNoneFound('synonyms')
        } else {
            for (let item in this.synonyms){
                let newWord = new Synonym(this.synonyms[item],this.callbacks.putWordOnBoard)
                this.displayAreas.synonymArea.append(newWord.render());
            }
        }
        this.synonyms = [];
    }
    /**
     * clears the display,loops through adjective list and appends a new div with a class of adjective to the display area and empties the list
     */
    displayAdjectives(){
        $('.adjectives').remove();
        if (this.adjectives.length === 0){
            this.displayNoneFound('adjectives')
        } else {
            for (let item in this.adjectives){
                let newWord = new Adjective(this.adjectives[item],this.callbacks.putWordOnBoard)
                this.displayAreas.adjectiveArea.append(newWord.render());
            }
        }
        
        this.adjectives = [];
    }
    /**
     * if no adjectives/synonyms are found, let user know by appending a div with text
     * @param {string} type 
     */
    displayNoneFound(type){
        const noWord = $('<div>',{
            class:type,
            text:`NO ${type.toUpperCase()} FOUND`
        })
        if (type==='synonyms'){
            this.displayAreas.synonymArea.append(noWord);
        }else {
            this.displayAreas.adjectiveArea.append(noWord);
        }
    }
}
/**
 * A synonym that can be clicked and sent to the board
 */
class Synonym{
    /**
     * Creates a Synonym
     * @param {string} word - the synonym word
     * @param {function} callback - the callback to put the word on the controller
     */
    constructor(word,callback){
        this.word = word
        this.putWordOnBoard = callback
        this.domElement = null;
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * When clicked, put word on board and remove the dom element 
     */
    handleClick(){
        this.putWordOnBoard(this.word);
        this.domElement.remove();
    }
    /**
     * Create a dom element for the word, save the dom element, and give it a click handler
     */
    render(){
        this.domElement = $('<div>',{
            text:this.word,
            class: 'synonyms'
        })
        this.domElement.on('click',this.handleClick);
        return this.domElement
    }
}
/**
 * An adjective that can be clicked and sent to the board
 */
class Adjective{
    /**
     * Creates an Adjective
     * @param {string} word - the adjective word
     * @param {function} callback - the callback to put the word on the controller
     */
    constructor(word,callback){
        this.word = word;
        this.putWordOnBoard = callback
        this.domElement = null;
        this.handleClick=this.handleClick.bind(this);
    }
    /**
     * When clicked, put word on board and remove the dom element 
     */
    handleClick(){
        this.putWordOnBoard(this.word);
        this.domElement.remove();
    }
    /**
     * Create a dom element for the word, save the dom element, and give it a click handler
     */
    render(){
        this.domElement = $('<div>',{
            text:this.word,
            class: 'adjectives'
        })
        this.domElement.on('click',this.handleClick);
        return this.domElement
    }
}
