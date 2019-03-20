class Corkboard {
    constructor(options) {
        this.words = [];
        this.domElement = null;
        this.callbacks = {
            sendToImageCallback: options.callback
        }
        // this.addWords(); // FOR TESTING
    }

    addWord(word) {
        if(this.words.length < 20) {
            this.words.push(word);
            const newWord = new CorkboardWord(word, this.callbacks.sendToImageCallback);
            this.domElement.append(newWord.render());
        }
    }

    render() {
        this.domElement = $('<div>', {'class': 'spit-board'});
        return this.domElement;
    }

}

class CorkboardWord {
    constructor(word, callback) {
        this.word = word;
        this.callback = callback;
        this.domElement = null;
        this.selected = false;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.callback(this.word);
        // this.selected = !this.selected;
        // this.domElement.remove();   // FOR TESTING
    }

    render() {
        this.domElement = $('<div>', {'class': 'spit-board-word'}).append(
            $('<div>', {'class': 'wordInner'}).text(this.word)
        )
        this.domElement.click(this.handleClick);
        return this.domElement;
    }
}

// let test;
// $(document).ready(function () {
//     test = new Corkboard();
//     $('.spitboard-container').append(test.render());
// });