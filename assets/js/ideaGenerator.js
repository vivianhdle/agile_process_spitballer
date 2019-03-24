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
        this.callbacks = {
            callbackFromController: options.callback
        }
    }


    /**
     * Adds event habdler on Generate Random Ideas button.
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
        $.ajax(
            {
                url: "https://random-word-api.herokuapp.com/word",
                method: "get",
                data: {
                    key: "MHXUDGCF",
                    number: 5
                },
                success: (response) =>{
                    $(".ideas > div").remove();
                    let newIdeaCard = null;
                    for(let index = 0; index < response.length; index++)
                    {
                        newIdeaCard = new ideaCard(response[index], this.callbacks.callbackFromController);
                        $(".ideas").append(newIdeaCard.render());
                        
                    }
                }
            }
        );
        $('.spit-board').show('slow');
    }
}

/**
 * Class representing an idea card with a random word.
 */
class ideaCard {
    /**
     * Creates a an idea card object.
     * @param {string} word - Random word returned from API call.
     * @param {object} callback - callback pased from succesful API call which was passed from controller.
     */
    constructor(word, callback) {
        this.word = word;
        this.callback = callback;
        this.domElement = null;
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Clickhandler for when an idea card is clicked.
     * Sends the clicked word to the callback function and then to Controller.
     * Controller will send the clicked word to cork board object.
     */
    handleClick = () => {
        this.callback(this.word);
        $('.spit-board > .instructions').remove();
    }

    /**
     * @return {null} this.domElement 
     * this.domElement is a new div element that has the random word from API call.
     */
    render = () => {
        this.domElement = $('<div>').append(
            $('<div>').text(this.word)
        )
        this.domElement.click(this.handleClick);
        return this.domElement;
    }
}