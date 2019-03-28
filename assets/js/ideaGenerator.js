/**
 * Class representing an Idea Generator
 */
class IdeaGenerator
{
    /**
     * Create an Idea Generator
     * @param {object} options - Object containing callbacks from Controller
     */
    constructor(options)
    {
        this.addEventHandler();
        this.apiKey = new IdeaAPIKey('COMH5PUQ'); // API key to start with
        this.callbacks = {
            putWordOnBoard: options.putWordOnBoard,
            checkIfEmpty:options.checkIfEmpty
        }
    }


    /**
     * Adds event handler on Generate Random Ideas button.
     * On click calls generateWords function.
     */
    addEventHandler = () => 
    { 
        $(".word-generator-button").on("click", this.generateWords);
    }

    /**
     * Makes ajax call to request 5 random words from random-word-api.
     * On success creates 5 instances of ideaCard and renders them to the DOM.
     */
    generateWords = () =>
    {
        $(".word-generator-button > i").addClass('spinn');
        $.ajax(
            {
                url: "https://random-word-api.herokuapp.com/word",
                method: "get",
                data: {
                    key: this.apiKey.getKey(),
                    number: 5
                },
                success: (response) => {
                    if (response === "wrong API key") {
                        this.apiKey.generateNewKey(this.generateWords);
                    } else {
                        $(".ideaCard").remove();
                        let newIdeaCard = null;
                        for(let index = 0; index < response.length; index++)
                        {
                            newIdeaCard = new ideaCard({
                                word:response[index],
                                callbacks:{
                                    putWordOnBoard:this.callbacks.putWordOnBoard,
                                    checkIfEmpty:this.callbacks.checkIfEmpty
                                }
                            })
                            $(".ideas").append(newIdeaCard.render());

                        }
                    }
                },
                complete: () => {
                    localStorage.setItem('wordAPIKey', this.apiKey.getKey());
                    $(".word-generator-button > i").removeClass('spinn');
                }
            }
        );
        $('.spit-board').show('slow');
    }
}

/**
 * Class object used for storing and retrieving the API key for the random word API
 */
class IdeaAPIKey {
    /**
     * Creates the key object and stores the initial api key
     * @param key -
     */
    constructor(key = null) {
        if (key) {
            this.key = key;
        } else {
            this.generateNewKey();
        }
    }

    /**
     * Calls the key generator API and stores the new key
     * Then optionally runs a callback function (used when IdeaGenerator's key has expired)
     * @param callback - function to call after generating a new key
     */
    generateNewKey(callback = null) {
        $.ajax({
            url: "https://yacdn.org/proxy/https://random-word-api.herokuapp.com/key",
            method: 'get',
            datatype: 'text',
            success: response => {
                this.key = response;
                console.log('Got a new key: ' + this.key);
                if(callback) {
                    callback();
                }
            }
        })
    }

    /**
     * Returns the current api key
     * @returns {string} - the API key that is stored
     */
    getKey() {
        return this.key;
    }

}


/**
 * Class representing an idea card with a random word.
 */
class ideaCard {
    /**
     * Creates a an idea card object.
     * @param {object} options - an object of callbacks and the word from API call
     */
    constructor(options) {
        this.word = options.word;
        this.callbacks = {
            putWordOnBoard:options.callbacks.putWordOnBoard,
            checkIfEmpty:options.callbacks.checkIfEmpty
        }
        this.domElement = null;
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Clickhandler for when an idea card is clicked.
     * Sends the clicked word to the callback function and then to Controller.
     * Controller will send the clicked word to cork board object.
     */
    handleClick = () => {
        if(this.callbacks.putWordOnBoard(this.word)) {
            this.callbacks.checkIfEmpty();
            this.domElement.remove();
        }    
    }

    /**
     * @return {null} this.domElement 
     * this.domElement is a new div element that has the random word from API call.
     */
    render = () => {
        this.domElement = $('<div>', {class: 'ideaCard'}).append(
            $('<div>').text(this.word)
        )
        this.domElement.click(this.handleClick);
        return this.domElement;
    }
}