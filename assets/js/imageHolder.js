/**
 * Class representing the entire images section
 */
class imageHolder
{
    /**
     * Creates an ImageHolder object
     * @param options - object that holds callbacks for it and child objects
     */
    constructor(options)
    {
        this.imageCards = [];
        this.callbacks = {
            showApps:options.showApps,
            showRelatedWords: options.showRelatedWords,
            deleteImageFromArray: this.deleteImageFromArray
        }
    }

    /**
     * Handler for clicks on word objects on the board
     * If there is room, create a new Image and add it to the image array
     * @param {string} word - the word used to create a new Image
     */
    handleWordClick = (word) =>
    {
        if(this.indexOfCard(word) === null)
        {
            if(this.imageCards.length < 3)
            {
                const newCard = new Image(word, this.callbacks);
                this.imageCards.push(newCard);
            }
        }
        
    }

    /**
     * Deletes an Image from the image array
     * @param {string} word - the word associated with the Image to be deleted
     */
    deleteImageFromArray = (word) =>
    {
        let indexToBeDeleted = this.indexOfCard(word);
        this.imageCards.splice(indexToBeDeleted, 1);
    }

    /**
     * Searches the image array for an image associated with a given word
     * @param {string} word - the word associated with the Image to search for
     * @returns {number} - the index of the Image whose word matches the given word, or -1 if none is found
     */
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

    /**
     * Clears the images on page and the image storage array
     */
    clear = () => {
        this.imageCards = [];
        $('.images-container').remove();
    }
}
