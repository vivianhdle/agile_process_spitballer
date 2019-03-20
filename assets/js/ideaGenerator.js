
class IdeaGenerator
{
    constructor(options)
    {
        this.handleBtnClick();
        this.callbacks = {
            callbackFromController: options.callback
        }
    }

    handleBtnClick = () => 
    {
        $(".word-generator-button").on("click", this.generateWords);
        console.log("words: ", this.words)
        
    }

    generateWords = () =>
    {
        console.log("generateWords called");
        $.ajax(
            {
                url: "https://random-word-api.herokuapp.com/word",
                method: "get",
                data: {
                    key: "SL5GDWCQ",
                    number: 5
                },
                success: (response) =>{
                    console.log(response);
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
        
    }
}

class ideaCard {
    constructor(word, callback) {
        this.word = word;
        this.callback = callback;
        this.domElement = null;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.callback(this.word);
    }

    render = () => {
        this.domElement = $('<div>').append(
            $('<div>').text(this.word)
        )
        this.domElement.click(this.handleClick);
        return this.domElement;
    }
}