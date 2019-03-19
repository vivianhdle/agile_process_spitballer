class Corkboard {
    constructor() {
        this.words = [];
        this.domElement = null;
        this.addWords(); // FOR TESTING
    }

    // FOR TESTING
    addWords() {
        let word;
        for (let i = 0; i < 20; i ++) {
            word = new CorkboardWord('giraffle', null);
            this.words.push(word);
        }
    }

    render() {
        this.domElement = $('<div>', {'class': 'spit-board'});
        for(let index in this.words) {
            this.domElement.append(this.words[index].render());
        }
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
        // this.callback(this.word);
        // this.selected = !this.selected;
        this.domElement.remove();   // FOR TESTING
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