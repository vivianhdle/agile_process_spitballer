
class imageHolder
{
    constructor(options)
    {
        this.imageCards = [];
        this.rejected = false;
        this.callback = options.callback;
    }

    handleWordClick = (word) =>
    {
        if(this.imageCards.length < 3)
        {
            const newCard = new ImageGenerator(word, this.callback);
            this.imageCards.push(newCard);
        } else {
            this.rejected = true;
        }
    }

}
