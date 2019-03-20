
class imageHolder
{
    constructor()
    {
        this.imageCards = [];
    }

    handleWordClick = (word) =>
    {
        if(this.imageCards.length < 3)
        {
            const newCard = new ImageGenerator(word);
            this.imageCards.push(newCard);
        }
    }
}
