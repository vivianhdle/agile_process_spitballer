/**
 * Class representing the individual images on the page
 */
class Image {
    /**
     * Creates an Image object and calls the Image API
     * @param {string} word - the word associated with the Image
     * @param callback - object holding callback functions
     */
    constructor(word, callback) {
        this.word = word;
        this.domElement = null;
        this.callbacks = {
            showApps: callback.showApps,
            showRelatedWords: callback.showRelatedWords,
            decrementQueue: callback.decrementQueue,
            deleteImageFromArray: callback.deleteImageFromArray
        }
        this.images = [];
        this.getImage();

        this.handleClick = this.handleClick.bind(this);
        this.render = this.render.bind(this);
        this.getImage = this.getImage.bind(this);
        this.refreshImage = this.refreshImage.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
    }

    /**
     * Click handler for the image
     * Shows the apps and words associated with the Image's word
     * Highlights the last Image that was clicked on
     * Reveals refresh button on hover
     */
    handleClick() {
        this.callbacks.showApps(this.word);
        this.callbacks.showRelatedWords(this.word);
        $(".image-wrapper > div").removeClass("selected");
        this.domElement.addClass("selected");
        
        $(".image-refresh-button").css("visibility", "hidden");
        this.domElement.find(".image-refresh-button").css("visibility", "visible");
        
        $('.relevant').show('slow');
        $('.app-instructions').remove();
        $(".app-container>*").show();
        $('.syn i').removeClass('flipped');
    }

    /**
     * Creates the DOM element and its children, adds click handlers, and appends it to the DOM
     * @param {string} imageURL - the URL of the image received from the image API
     */
    render(imageURL) {
        let imageContainer = $("<div>", { class: "images-container" });
        // let imageDiv = $("<div>", { class: "image" }).css("background-image", `url(${imageURL})`);
        let imageDiv = $("<div>", { class: "image" }).append(
            $('<img>', {class: 'image-inner'}).on('load', this.onImageLoad).attr('src', imageURL)
        );
        let wordDiv = $("<div>", { class: "word" }).text(this.word).css({"border-top": "1px solid black"});
        let deleteButton = $('<div>', { 'class': 'imgCloseButton' }).click(this.deleteSelf).append(
            $('<span>', {'class': 'imgCloseText'}).text('x')
        );
        let refreshButton = $('<div>', { 'class': 'image-refresh-button' }).click((event) => {
            event.stopPropagation();
            this.refreshImage(event);
        });
        let refreshIcon = $("<i>", { "class": "fas fa-redo" });
        refreshButton.append(refreshIcon);
        imageContainer.append(
            $('<div>', {'class': 'spinner image-spinner'}).append(
                $('<img>', {'src': './assets/images/spinner.png'})
            ), imageDiv, wordDiv, refreshButton, deleteButton);
        refreshButton.css("visibility", "hidden");
        this.domElement = imageContainer;
        $(".image-wrapper").append(imageContainer);
        $(this.domElement).on("click", this.handleClick);
    }

    /**
     * Calls the image API and sends the image URL to the render function
     */
    getImage() {
        $.ajax({
            url: "https://pixabay.com/api/",
            method: "get",
            data: {
                key: "11924912-d50c8a58952636b33dd8589d6",
                q: this.word,
                per_page: 50,
            },
            dataType: "jsonp",
            success: (response) => {
                let imageURL;
                if (response.totalHits > 0) {
                    imageURL = response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL;
                } else {
                    imageURL = "https://t4.ftcdn.net/jpg/01/39/16/63/240_F_139166369_NdTDXc0lM57N66868lC66PpsaMkFSwaf.jpg"
                }
                this.render(imageURL);
                this.images = response.hits;
                this.callbacks.decrementQueue();
            }
        });
    }

    /**
     * Refreshes the image of the DOM element
     */
    refreshImage(event) {
        if (this.images.length > 0) {
            $(event.target).addClass('spinn');

            let image = $(this.domElement).find(".image-inner");
            image.attr('src', this.images[Math.floor(Math.random() * this.images.length)].webformatURL);
        }
    }

    /**
     * Deletes the DOM element and calls an ImageHolder function, removing it from the image array
     */
    deleteSelf() {
        // this.domElement.remove();
        this.callbacks.deleteImageFromArray(this.word);
    }

    onImageLoad(event) {
        $(event.target).parent().parent().find('.spinner').addClass('hidden');
        $(event.target).parent().parent().find('i').removeClass('spinn');
    }
}

