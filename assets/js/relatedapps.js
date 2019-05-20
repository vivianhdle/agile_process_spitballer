/**
 * Class representing apps related to a specific word
 */
class RelatedApps {
    /**
     * Makes storage for dom elements and app data
     * @param {object} options - displayArea
     */
    constructor(options) {
        this.displayAreas = {
            appArea: $(options.appArea),
            titleArea: $(options.titleArea),
            appContainer: $(options.appContainer)
        };

        this.callbacks = {
            changeAppLoadingStatus: options.callbacks.changeAppLoadingStatus
        };

        this.data = {
            trackName: null,
            artWork: null,
            link: null
        };

        this.word = null;
        this.apps = [];
        this.marker = 3;

        this.getRelatedApps = this.getRelatedApps.bind(this);
        this.gotRelatedApps = this.gotRelatedApps.bind(this);
        this.scrollBackwards = this.scrollBackwards.bind(this);
        this.scrollForward = this.scrollForward.bind(this);
        this.removeRelatedApps = this.removeRelatedApps.bind(this);
    }

    /**
     * makes an API call to search for related apps relating to a word passed in
     * @param {string} word - a string that will be pumped into the itunes app store search
     */
    getRelatedApps(word) {
        this.word = word;
        this.removeRelatedApps(word);
        $('.apps-spinner').removeClass('hidden');
        $('.arrow').hide();
        $('.app-instructions').remove();

        const ajaxOptions = {
            url: "https://itunes.apple.com/search?",
            method: "post",
            dataType: "json",
            data: {
                term: word,
                entity: 'software',
                limit: 21,
                media: 'software'
            },
            success: this.gotRelatedApps
        };
        $.ajax(ajaxOptions);
    }

    /**
     * success function, gets all the related apps and saves them in the contructor for future use
     * @param {object} response
     */
    gotRelatedApps(response) {
        $('.apps-spinner').addClass('hidden');

        if (response.resultCount > 0) {
            this.apps = response.results;

            for (let appIndex = 0; appIndex < 3 && appIndex < this.apps.length; appIndex++) {
                this.data.trackName = this.apps[appIndex].trackName;
                this.data.artWork = this.apps[appIndex].artworkUrl100;
                this.data.link = this.apps[appIndex].trackViewUrl;
                this.displayAreas.appArea.append(this.render());
            }

            if (this.apps.length > 3) {
                $('.arrow').show();
            } else {
                $('.arrow').hide();
            }

        } else {
            $('.arrow').hide();
            this.displayAreas.appContainer.append(
                $('<div>', {
                    text: 'NO APPS FOUND',
                    class: 'app-instructions'
                })
            );
        }
        this.callbacks.changeAppLoadingStatus(false);
        this.marker = 3;
        this.checkScrolls();
    }

    /**
     * see more apps to the right of the 3 displayed if there are any
     */
    scrollForward() {
        let counter = 0;

        if (this.marker < this.apps.length) {
            this.clearAppContainer();
            for (let appIndex = this.marker; (appIndex < this.apps.length && appIndex < this.marker + 3); appIndex++) {
                this.data.trackName = this.apps[appIndex].trackName;
                this.data.artWork = this.apps[appIndex].artworkUrl512;
                this.data.link = this.apps[appIndex].trackViewUrl;
                this.displayAreas.appArea.append(this.render());
                counter++;
            }
            this.marker = this.marker + counter;
        }
        this.checkScrolls();
    }

    /**
     * see more apps to the left of the 3 displayed if there are any
     */
    scrollBackwards() {
        let counter = 0;

        if (this.marker > 3) {
            this.clearAppContainer();
            const oldAppIndex = this.marker - 6 < 0 ? 0 : this.marker - 6;
            let appIndex = oldAppIndex;
            for (appIndex; appIndex < oldAppIndex + 3; appIndex++) {
                this.data.trackName = this.apps[appIndex].trackName;
                this.data.artWork = this.apps[appIndex].artworkUrl512;
                this.data.link = this.apps[appIndex].trackViewUrl;
                this.displayAreas.appArea.append(this.render());
                counter++;
            }
            this.marker = oldAppIndex + counter;
        }
        this.checkScrolls();
    }

    /**
     * empties out the app container
     */
    clearAppContainer() {
        $('.apps').empty();
    }

    /**
     * resets values in constructor and clears the DOM elements for related apps
     */
    removeRelatedApps(word) {
        if (word === this.word) {
            this.data = {
                trackName: null,
                artWork: null,
                link: null
            };
            this.apps = [];
            this.marker = 3;
            $("#scroll-left, #scroll-right").hide();
            this.clearAppContainer();
        }

    }

    /**
     * activates and deactivates the relevant app buttons
     */
    checkScrolls() {
        if (this.marker === 3 && this.apps.length > 3) {
            $('#scroll-left').css({
                'pointer-events': 'none',
                'background-color': 'gray'
            });
            $('#scroll-right').css({
                'pointer-events': 'auto',
                'background-color': 'rgb(80, 124, 168)'
            })
        } else if (this.marker === this.apps.length) {
            $('#scroll-right').css({
                'pointer-events': 'none',
                'background-color': 'gray'
            });
            $('#scroll-left').css({
                'pointer-events': 'auto',
                'background-color': 'rgb(80, 124, 168)'
            })
        } else {
            $('#scroll-left, #scroll-right').css({
                'pointer-events': 'auto',
                'background-color': 'rgb(80, 124, 168)'
            })
        }
    }

    /**
     * creates dom elements(container,title,anchortag,image) grabs data from constructor to display on the DOM
     * @returns a DOM element that has not been appended to the DOM
     */
    render() {
        $("#scroll-left, #scroll-right").show();
        const container = $('<div>', {
            'class': 'app'
        });
        const anchorTag = $('<a>', {
            'href': this.data.link,
            'target': '_blank'
        });
        const image = $('<img>', {
            'src': this.data.artWork
        });
        const title = $('<div>', {
            'text': this.data.trackName,
            'class': 'app-title'
        });
        anchorTag.append(image);
        container.append(title, anchorTag);

        return container;
    }
}