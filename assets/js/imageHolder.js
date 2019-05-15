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

        this.handleWordClick = this.handleWordClick.bind(this);
        this.deleteImageFromArray = this.deleteImageFromArray.bind(this);
        this.clear = this.clear.bind(this);
        this.checkInstructions = this.checkInstructions.bind(this);

        this.callbacks = {
            showApps:options.showApps,
            showRelatedWords: options.showRelatedWords,
            decrementQueue: options.decrementQueue,
            deleteImageFromArray: this.deleteImageFromArray
        }
    }

    /**
     * Handler for clicks on word objects on the board
     * If there is room, create a new Image and add it to the image array
     * @param {string} word - the word used to create a new Image
     */
    handleWordClick(word) {
        if(this.imageCards.indexOf(word) === -1)
        {
            if(this.imageCards.length < 3)
            {
                const newCard = new Image(word, this.callbacks);
                this.imageCards.push(newCard);
                return true;
            }else {
                return false;
            }
        }else {
            return false;
        }
        
    }

    /**
     * Deletes an Image from the image array
     * @param {string} word - the word associated with the Image to be deleted
     */
    deleteImageFromArray(word) {
        let indexToBeDeleted = this.imageCards.indexOf(word);
        this.imageCards.splice(indexToBeDeleted, 1);
    }
    checkInstructions(){
        if (this.imageCards.length === 0){ //&& there are words on the board
            $('.image-wrapper>.instructions').show();
        } else{
            $('.image-wrapper>.instructions').hide();
        }
    }
    /**
     * Clears the images on page and the image storage array
     */
    clear() {
        debugger;
        this.imageCards = [];
        $('.images-container').remove();
    }
}
