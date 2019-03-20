
class imageHolder
{
    constructor(options)
    {
        this.imageCards = [];
        this.rejected = false;
        this.callbacks = {
            showApps:options.showApps,
            showRelatedWords: options.showRelatedWords
        }
    }

    handleWordClick = (word) =>
    {
        if(this.imageCards.length < 3)
        {
            const newCard = new ImageGenerator(word, this.callbacks);
            this.imageCards.push(newCard);
        } else {
            this.rejected = true;
        }
    }

}
