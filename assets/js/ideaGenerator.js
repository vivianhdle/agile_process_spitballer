
class IdeaGenerator
{
    constructor()
    {
        this.words = [];
        this.handleBtnClick();
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
                    this.words.length = 0;
                    for(let index = 0; index < response.length; index++)
                    {
                        this.words.push(response[index]);
                        
                    }
                    console.log("words array: ", this.words);
                    this.appendWordsToDom();
                }
            }
        );
        
    }
}

