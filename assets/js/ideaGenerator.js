
class IdeaGenerator
{
    constructor(options)
    {
        // this.words = [];
        this.handleBtnClick();
        this.callbacks = {
            callBackFromController = options.callback
        }
    }

    handleBtnClick = () => 
    {
        $(".word-generator-button").on("click", this.generateWords);
        console.log("words: ", this.words)
        
    }

    appendWordsToDom = () =>
    {
        let containers = $(".ideas > div");
        console.log(containers);
        for(let index = 0; index < this.words.length; index++)
        {
            let targetedElement = $(containers[index]);
            targetedElement.text(this.words[index]);
        }

    }

    generateWords = () =>
    {
        $.ajax(
            {
                url: "https://random-word-api.herokuapp.com/word?key=RC7UUADK&number=5",
                method: "get",
                key: "RC7UUADK",
                number: 5,
                success: (response) =>{
                    console.log(response);
                    $(".ideas > div").remove();
                    // this.words.length = 0;
                    let newIdeaCard = null;
                    for(let index = 0; index < response.length; index++)
                    {
                        newIdeaCard = new ideaCard(response[index], this.callbacks.callBackFromController);
                        $(".ideas").append(newIdeaCard.render());
                        // this.words.push(newIdeaCard);
                        
                    }
                    console.log("words array: ", this.words);
                    this.appendWordsToDom();
                }
            }
        );
        
    }
}

class ideaCard {
    constructor(word, callback) {
        this.word = word;
        this.callback = callback;
        this.domElement = null;
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        // this.callback(this.word);
        // this.selected = !this.selected;
        this.domElement.remove();   // FOR TESTING
    }

    render = () => {
        this.domElement = $('<div>').append(
            $('<div>').text(this.word)
        )
        this.domElement.click(this.handleClick);
        return this.domElement;
    }
}
