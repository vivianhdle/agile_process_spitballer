
class imageHolder
{
    constructor()
    {
        this.imageCards = [];
        this.rejected = false;
    }

    handleWordClick = (word) =>
    {
        if(this.imageCards.length < 3)
        {
            const newCard = new ImageGenerator(word);
            this.imageCards.push(newCard);
        } else {
            this.rejected = true;
        }
    }

}
