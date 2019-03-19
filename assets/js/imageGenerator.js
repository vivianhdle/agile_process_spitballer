
class ImageGenerator{
    constructor(word){
        this.word = word;
        this.domElement = null;
        this.getImage();
    }


    render = (imageURL) =>
    {
        let imageContainer = $("<div>",{class: "images-container"});
        let imageDiv = $("<div>",{class: "image"}).css("background-image", `url(${imageURL})`);
        let wordDiv = $("<div>", {class: "word"}).text(this.word);
        imageContainer.append(imageDiv, wordDiv);

        this.domElement = imageContainer;
        $(".bottom-half").append(imageContainer);
    }

    getImage = () =>
    {
        debugger;
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
                debugger;
                console.log(response);
                let imageURL = response.hits[0].largeImageURL;
                console.log(`imageURL is: ${imageURL}`);
                this.render(imageURL);
            }
        });
    }
}

