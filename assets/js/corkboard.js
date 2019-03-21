/**
 * Class representing the cork board on the page, which holds idea words selected by the user
 */
class Corkboard {
    /**
     * Creates a corkboard object
     * @param options - object that holds the callbacks for Corkboard and CorkBoardWord
     */
    constructor(options) {
        this.words = [];
        this.domElement = null;
        this.callbacks = {
            sendToImageCallback: options.callback
        };

        this.deleteWord = this.deleteWord.bind(this);
    }

    /**
     * Add a word to the board if there is room and it isn't already on the board
     * @param {string} word - the word to be added to the board
     * @returns {boolean} - true if the add succeeded and false if it failed
     */
    addWord(word) {
        if(this.words.length < 20 && this.wordIsOnBoard(word) === -1) {
            const newWord = new CorkboardWord({
                word: word,
                callbacks: {
                    sendToImage: this.callbacks.sendToImageCallback,
                    deleteWord: this.deleteWord
                }
            });
            this.domElement.append(newWord.render());
            this.words.push(newWord);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Deletes a word from the word storage array
     * @param {string} word - the word to be deleted from the words array
     */
    deleteWord(word) {
        let wordIndex = this.wordIsOnBoard(word);
        if(wordIndex >= 0) {
            this.words.splice(wordIndex, 1);
        }
        console.log(this.words);
    }

    /**
     * Checks if a word is in the word storage array
     * @param {string} word - the word to check
     * @returns {number} - index of the word if it exists in the array, -1 if it isn't in the array
     */
    wordIsOnBoard(word) {
        for(let index in this.words) {
            if (this.words[index].word === word) {
                return index;
            }
        }
        return -1;
    }

    /**
     * Creates the cork board DOM element
     * @returns {null} - the selector for the board's DOM element
     */
    render() {
        this.domElement = $('<div>', {'class': 'spit-board'});
        return this.domElement;
    }

}

/**
 * Class representing individual words on the board
 */
class CorkboardWord {
    /**
     * Creates a word object
     * @param options - object holding callback functions
     */
    constructor(options) {
        this.word = options.word;
        this.sendToImageCallback = options.callbacks.sendToImage;
        this.deleteCallback = options.callbacks.deleteWord;
        this.domElement = null;
        this.selected = false;

        this.handleClick = this.handleClick.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
    }

    /**
     * Handles user clicking on the word
     * Passes the word to a callback in Controller to be made into an Image
     */
    handleClick() {
        this.sendToImageCallback(this.word);
        $(".app-instructions").show();
    }

    /**
     * Creates the DOM element and adds the delete handler to it
     * @returns {null} - the DOM element
     */
    render() {
        this.domElement = $('<div>', {'class': 'spit-board-word'}).append(
            $('<div>', {'class': 'wordInner'}).text(this.word),
            $('<div>', {'class': 'wordCloseButton'}).text('X').click(this.deleteSelf)
        );
        this.domElement.click(this.handleClick);
        return this.domElement;
    }

    /**
     * Handles clicks on the close button on the word
     * Stops the click event from propagating to the entire word element
     * @param event - the click event
     */
    deleteSelf(event) {
        this.domElement.remove();
        event.stopPropagation();
        this.deleteCallback(this.word);
    }
}