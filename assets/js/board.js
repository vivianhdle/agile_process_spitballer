/**
 * Class representing the board on the page, which holds idea words selected by the user
 */
class Board {
    /**
     * Creates a board object
     * @param callbacks - object that holds the callbacks for board and BoardWord
     */
    constructor(callbacks) {
        this.words = [];
        this.domElement = null;
        this.callbacks = {
            sendToImageCard: callbacks.sendToImageCard,
            checkIfEmpty: callbacks.checkIfEmpty,
            deleteImage: callbacks.deleteImage,
        };

        this.deleteWord = this.deleteWord.bind(this);
        this.randomFillBoard = this.randomFillBoard.bind(this);
        this.selectAtRandom = this.selectAtRandom.bind(this);
        this.checkBoardNotFull = this.checkBoardNotFull.bind(this);
    }

    /**
     * Returns true if the board is not full
     */
    checkBoardNotFull() {
        return this.words.length < 20;
    }

    /**
     * Add a word to the board if there is room and it isn't already on the board
     * @param {string} word - the word to be added to the board
     * @returns {boolean} - true if the add succeeded and false if it failed
     */
    addWord(word) {
        if (this.words.length < 20 && this.wordIsOnBoard(word) === -1) {
            $('.display-modal-btn').css({
                'pointer-events': 'auto',
                'background-color': 'grey'
            });

            const newWord = new BoardWord({
                word: word,
                callbacks: {
                    sendToImage: this.callbacks.sendToImageCard,
                    deleteWord: this.deleteWord,
                    checkBoardNotFull: this.checkBoardNotFull
                }
            });
            this.domElement.append(newWord.render());
            this.words.push(newWord);
            return true;
        } else {
            $('.display-modal-btn').css('pointer-events', 'none');
            $('.display-modal-btn').css('cursor', 'auto');
            return false;
        }
    }

    /**
     * Deletes a word from the word storage array
     * @param {string} word - the word to be deleted from the words array
     */
    deleteWord(word) {
        const wordIndex = this.wordIsOnBoard(word);
        if (wordIndex >= 0) {
            this.words.splice(wordIndex, 1);
        }
        this.callbacks.deleteImage(word);
        if (this.callbacks.checkIfEmpty()) {
            $('.clear-board').css({
                'pointer-events': 'none',
                'background-color': 'gray'
            });
        } else {
            $('.clear-board').css({
                'pointer-events': 'auto',
                'background-color': 'rgb(80, 124, 168)'
            });
        }
    }

    /**
     * Checks if a word is in the word storage array
     * @param {string} word - the word to check
     * @returns {number} - index of the word if it exists in the array, -1 if it isn't in the array
     */
    wordIsOnBoard(word) {
        for (let index in this.words) {
            if (this.words[index].word === word) {
                return index;
            }
        }
        return -1;
    }

    /**
     * Clears the board elements and storage array
     */
    clearBoard() {
        $(".spit-board-word").remove();
        this.words = [];
        this.callbacks.checkIfEmpty();
    }

    /**
     * Creates the board DOM element
     * @returns {null} - the selector for the board's DOM element
     */
    render() {
        this.domElement = $('<div>', {'class': 'spit-board'});
        return this.domElement;
    }

    randomFillBoard() {
        $('.image-random-div').show();
        $(".word-generator-button > i").addClass('spinn');
        $(".board-spinner").removeClass('hidden');
        $.ajax(
            {
                url: "https://random-word-api.herokuapp.com/word",
                method: "get",
                data: {
                    key: localStorage.getItem('wordAPIKey'),
                    number: 25
                },
                success: response => {
                    if (response !== "wrong API key") {
                        this.clearBoard();
                        for (let index = 0; index < response.length; index++) {
                            if (response[index] !== '') {
                                this.addWord(response[index]);
                            }
                        }
                    }
                },
                complete: () => {
                    this.callbacks.checkIfEmpty();
                    $('.image-wrapper').show();
                    $(".word-generator-button > i").removeClass('spinn');
                    $(".board-spinner").addClass('hidden');
                }
            }
        );
    }

    selectAtRandom() {
        const limit = Math.min(3, this.words.length);
        let results = [];
        const words = this.words.slice();

        for (let index = 0; index < limit; index++) {
            const choice = Math.floor(Math.random() * words.length);
            results.push(words.splice(choice, 1)[0].word);
        }

        return results;
    }
}

/**
 * Class representing individual words on the board
 */
class BoardWord {
    /**
     * Creates a word object
     * @param options - object holding callback functions
     */
    constructor(options) {
        this.word = options.word;
        this.sendToImageCallback = options.callbacks.sendToImage;
        this.deleteCallback = options.callbacks.deleteWord;
        this.checkBoardNotFull = options.callbacks.checkBoardNotFull;
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
        if (this.sendToImageCallback(this.word)) {
            $(".app-instructions").show();
        }
    }

    /**
     * Creates the DOM element and adds the delete handler to it
     * @returns {null} - the DOM element
     */
    render() {
        this.domElement = $('<div>', {'class': 'spit-board-word'}).append(
            $('<div>', {'class': 'wordInner'}).text(this.word),
            $('<div>', {'class': 'wordCloseButton'}).on('click', this.deleteSelf).append(
                $('<span>', {'class': 'wordCloseText'}).text('X')
            )
        );
        this.domElement.on('click', this.handleClick);
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
        if (this.checkBoardNotFull()) {
            $('.display-modal-btn').css({
                'pointer-events': 'auto',
                'cursor': 'pointer',
                'background-color': 'rgb(80, 124, 168)'
            });
        }
    }
}