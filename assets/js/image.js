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
            deleteImageFromArray: callback.deleteImageFromArray,
            deleteRelatedAppsAndWords: callback.deleteRelatedAppsAndWords,
            checkIfLoadingApps: callback.checkIfLoadingApps,
            changeAppLoadingStatus: callback.changeAppLoadingStatus
        };

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
        if (!this.callbacks.checkIfLoadingApps()) {
            this.callbacks.changeAppLoadingStatus(true);
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
    }

    /**
     * Creates the DOM element and a spinner, will be added to once image API responds
     */
    preRender() {
        this.domElement = $("<div>", {class: "images-container"}).append(
            $('<div>', {'class': 'spinner image-spinner'}).append(
                $('<img>', {'src': './assets/images/spinner.png'})
            ));
        $(".image-wrapper").append(this.domElement);
    }

    /**
     * Creates the DOM element and its children, adds click handlers, and appends it to the DOM
     * @param {string} imageURL - the URL of the image received from the image API
     */
    render(imageURL) {
        const imageDiv = $("<div>", {class: "image"}).append(
            $('<img>', {class: 'image-inner'}).on('load', this.onImageLoad).attr('src', imageURL)
        );
        const wordDiv = $("<div>", {class: "word"}).text(this.word).css({"border-top": "1px solid black"});
        const refreshButton = $('<div>', {'class': 'image-refresh-button'}).on('click', event => {
            event.stopPropagation();
            this.refreshImage(event);
        });
        const refreshIcon = $("<i>", {"class": "fas fa-redo"});
        const deleteButton = $('<div>', {'class': 'imgCloseButton'}).on('click', this.deleteSelf).append(
            $('<span>', {'class': 'imgCloseText'}).text('x')
        );

        refreshButton.append(refreshIcon);
        this.domElement.append(imageDiv, wordDiv, refreshButton, deleteButton);
        refreshButton.css("visibility", "hidden");
        $(this.domElement).on("click", this.handleClick);
    }

    /**
     * Calls the image API and sends the image URL to the render function
     */
    getImage() {
        this.preRender();
        $.ajax({
            url: "https://pixabay.com/api/",
            method: "get",
            data: {
                key: "11924912-d50c8a58952636b33dd8589d6",
                q: this.word,
                per_page: 50,
            },
            dataType: "jsonp",
            success: response => {
                let imageURL;
                if (response.totalHits > 0) {
                    imageURL = response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL;
                } else {
                    imageURL = "./assets/images/404.jpg"
                }
                this.render(imageURL);
                this.images = response.hits;
            },
            error: () => {
                this.render("./assets/images/404.jpg");
            },
            complete: () => {
                this.callbacks.decrementQueue();
            }
        });
    }

    /**
     * Refreshes the image of the DOM element
     */
    refreshImage(event) {
        if (this.images.length > 0) {
            $(event.currentTarget).find('i').addClass('spinn');

            const image = $(this.domElement).find(".image-inner");
            image.attr('src', this.images[Math.floor(Math.random() * this.images.length)].webformatURL);
        }
    }

    /**
     * Deletes the DOM element and calls an ImageHolder function, removing it from the image array
     */
    deleteSelf() {
        this.callbacks.deleteRelatedAppsAndWords();
        this.callbacks.deleteImageFromArray(this.word);
    }

    /**
     * Event handler that is called when images are finished loading
     * @param event
     */
    onImageLoad(event) {
        $(event.target).parent().parent().find('.spinner').addClass('hidden');
        $(event.target).parent().parent().find('i').removeClass('spinn');
    }
}

