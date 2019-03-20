class Corkboard {
    constructor(options) {
        this.words = [];
        this.domElement = null;
        this.callbacks = {
            sendToImageCallback: options.callback
        };

        this.deleteWord = this.deleteWord.bind(this);
    }

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

    deleteWord(word) {
        let wordIndex = this.wordIsOnBoard(word);
        if(wordIndex >= 0) {
            this.words.splice(wordIndex, 1);
        }
        console.log(this.words);
    }

    wordIsOnBoard(word) {
        for(let index in this.words) {
            if (this.words[index].word === word) {
                return index;
            }
        }
        return -1;
    }

    render() {
        this.domElement = $('<div>', {'class': 'spit-board'});
        return this.domElement;
    }

}

class CorkboardWord {
    constructor(options) {
        this.word = options.word;
        this.sendToImageCallback = options.callbacks.sendToImage;
        this.deleteCallback = options.callbacks.deleteWord;
        this.domElement = null;
        this.selected = false;

        this.handleClick = this.handleClick.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
    }

    handleClick() {
        this.sendToImageCallback(this.word);
        $(".app-instructions").show();
    }

    render() {
        this.domElement = $('<div>', {'class': 'spit-board-word'}).append(
            $('<div>', {'class': 'wordInner'}).text(this.word),
            $('<div>', {'class': 'wordCloseButton'}).text('X').click(this.deleteSelf)
        );
        this.domElement.click(this.handleClick);
        return this.domElement;
    }

    deleteSelf(event) {
        this.domElement.remove();
        event.stopPropagation();
        this.deleteCallback(this.word);
    }
}