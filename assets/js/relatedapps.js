/**
 * Class representing apps related to a specific word
 */
class RelatedApps{
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
        this.data = {
            trackName: null,
            artWork: null,
            link: null
        };
        this.apps = [];
        this.marker = 3;
        this.getRelatedApps = this.getRelatedApps.bind(this);
        this.gotRelatedApps = this.gotRelatedApps.bind(this);
        this.scrollBackwards = this.scrollBackwards.bind(this);
        this.scrollForward = this.scrollForward.bind(this);
    }

    /**
     * makes an API call to search for related apps relating to a word passed in
     * @param {string} word - a string that will be pumped into the itunes app store search
     */
    getRelatedApps(word) {
        var ajaxOptions = {
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
        this.displayAreas.appArea.empty();
        this.displayAreas.titleArea.empty();

        if (response.resultCount > 0){
            this.apps = response.results;
            $('.app-instructions').remove();

            for (let appIndex = 0; appIndex < 3; appIndex++) {
                this.data.trackName = this.apps[appIndex].trackName;
                this.data.artWork = this.apps[appIndex].artworkUrl512;
                this.data.link = this.apps[appIndex].trackViewUrl;
                this.displayAreas.appArea.append(this.render());
            }
            if (this.apps.length > 3){
                $('.scroll').show();
            } else {
                $('.scroll').hide();
            }

        } else {
            this.displayAreas.appContainer.append(
                $('<div>',{
                    text:'NO APPS FOUND',
                    class:'app-instructions'
                })
            );
        }

        this.marker = 3;
    }
    /**
     * see more apps to the right of the 3 displayed if there are any
     */
    scrollForward() {
        let counter = 0;

        if (this.marker < this.apps.length) {
            $('.apps').empty();
            $('.names').empty();
            for (let appIndex = this.marker; (appIndex < this.apps.length && appIndex < this.marker + 3); appIndex++) {
                this.data.trackName = this.apps[appIndex].trackName;
                this.data.artWork = this.apps[appIndex].artworkUrl512;
                this.data.link = this.apps[appIndex].trackViewUrl;
                this.displayAreas.appArea.append(this.render());
                counter++;
            }
            this.marker = this.marker + counter;
        }
    }
    /**
     * see more apps to the left of the 3 displayed if there are any
     */
    scrollBackwards() {
        let counter = 0;

        if (this.marker > 3) {
            $('.apps').empty();
            $('.names').empty();
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
    }

    /**
     * creates dom elements(container,title,anchortag,image) grabs data from constructor to display on the DOM
     * @returns a DOM element that has not been appended to the DOM
     */
    render() {
        const container = $('<div>',{
            'class':'app'
        });
        const anchorTag = $('<a>',{
            'href':this.data.link,
            'target':'_blank'
        });
        const image = $('<img>',{
            'src':this.data.artWork
        });
        const title = $('<div>',{
            'text':this.data.trackName,
            'class':'app-title'
        })
        anchorTag.append(image);
        container.append(title,anchorTag);

        return container;
    }
}