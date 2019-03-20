
class ImageGenerator{
    constructor(word, callback){
        this.word = word;
        this.domElement = null;
        this.callbacks = {
            showApps:callback.showApps,
            showRelatedWords:callback.showRelatedWords,
            deleteImageFromArray: callback.deleteImageFromArray
        }
        this.getImage();
    }

    handleClick = () =>
    {
        console.log("handleClick in ImageGenerator");
        this.callbacks.showApps(this.word);
        this.callbacks.showRelatedWords(this.word);
        $(".image-wrapper > div").removeClass("selected");
        this.domElement.addClass("selected");
    }

    render = (imageURL) =>
    {
        $(".image-wrapper > div").removeClass("selected");
        let imageContainer = $("<div>",{class: "images-container selected"});
        let imageDiv = $("<div>",{class: "image"}).css("background-image", `url(${imageURL})`);
        let wordDiv = $("<div>", {class: "word"}).text(this.word);

        let deleteButton = $('<div>', {'class': 'wordCloseButton'}).text('X').click(this.deleteSelf)
        imageContainer.append(imageDiv, wordDiv, deleteButton);

        this.domElement = imageContainer;
        $(".image-wrapper").append(imageContainer);
        $(this.domElement).on("click", this.handleClick);
    }

    getImage = () =>
    {
        console.log("getImage was called");
        $.ajax({
            url: "https://pixabay.com/api/",
            method: "get",
            data: {
                key: "11924912-d50c8a58952636b33dd8589d6",
                q: this.word,
                per_page: 3,
            },
            dataType: "jsonp",
            success: (response) => 
            {
                console.log(response);
                let imageURL = response.hits[0].largeImageURL;
                console.log(`imageURL is: ${imageURL}`);
                this.render(imageURL);
            }
        });
    }

    deleteSelf = () =>
    {
        this.domElement.remove();
        this.callbacks.deleteImageFromArray(this.word);

    }
}

