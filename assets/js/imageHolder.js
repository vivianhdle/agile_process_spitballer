
class imageHolder
{
    constructor(options)
    {
        this.imageCards = [];
        this.callbacks = {
            showApps:options.showApps,
            showRelatedWords: options.showRelatedWords,
            deleteImageFromArray: this.deleteImageFromArray
        }
    }

    handleWordClick = (word) =>
    {
        // debugger;

        if(this.indexOfCard(word) === null)
        {
            if(this.imageCards.length < 3)
            {
                const newCard = new ImageGenerator(word, this.callbacks);
                this.imageCards.push(newCard);
            }
        }
        
    }

    deleteImageFromArray = (word) =>
    {
        let indexToBeDeleted = this.indexOfCard(word);
        this.imageCards.splice(indexToBeDeleted, 1);
    }

    indexOfCard = (word) =>
    {
        let indexToBeDeleted = null;
        for(let index = 0; index < this.imageCards.length; index++)
        {
            if(this.imageCards[index].word === word)
            {
                indexToBeDeleted = index;
            }
        }
        return indexToBeDeleted;
    }


}
