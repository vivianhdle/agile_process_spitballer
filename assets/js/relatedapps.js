/**
 * Class representing apps related to a specific word
 */
class RelatedApps{
    /**
     * Makes storage for dom elements and app data
     * @param {object} options - displayArea 
     */
    constructor(options){
        this.displayAreas = {
            appArea: $(options.appArea),
            titleArea: $(options.titleArea),
            appContainer:$(options.appContainer)
        }
        this.domElements = [];
        this.data = {
            trackName:null,
            artWork:null,
            link:null
        }
        //====================================================
        //BINDING
        this.getRelatedApps = this.getRelatedApps.bind(this)
        this.gotRelatedApps = this.gotRelatedApps.bind(this)
        //====================================================
    }
    /**
     * makes an API call to search for related apps relating to a word passed in
     * @param {string} word - a string that will be pumped into the itunes app store search
     */
    getRelatedApps(word){
        var ajaxOptions = {
            url:"https://itunes.apple.com/search?",
            method:"post",
            dataType:"json",
            data:{
                term: word,
                entity:'software',
                limit: 3,
                media:'software'
            },
            success:this.gotRelatedApps
        }
        $.ajax(ajaxOptions)
    }
    /**
     * success function, gets all the related apps and saves them in the contructor for future use
     * @param {object} response 
     */
    gotRelatedApps(response){
        this.displayAreas.appArea.empty();
        this.displayAreas.titleArea.empty();
        if (response.resultCount>0){
            $('.app-instructions').remove();
            for (let appIndex in response.results){
            this.data.trackName = response.results[appIndex].trackName;
            this.data.artWork = response.results[appIndex].artworkUrl512;
            this.data.link = response.results[appIndex].trackViewUrl;
            this.displayAreas.appArea.append(this.render());
            }
        } else {
            this.displayAreas.appContainer.append(
                $('<div>',{
                    text:'NO APPS FOUND',
                    class:'app-instructions'
                    })
                );
        }
        
    }
    /**
     * creates dom elements(container,title,anchortag,image) grabs data from constructor to display on the DOM
     * @returns a DOM element that has not been appended to the DOM
     */
    render(){
        const container = $('<div>',{
            'class':'app'
        })
        const title = $('<div>',{
            class:'app-title',
            'text':this.data.trackName
        })
        const anchorTag = $('<a>',{
            'href':this.data.link,
            'target':'_blank'
        })
        const image = $('<img>',{
            'src':this.data.artWork
        })
        $('.names').append(title);
        anchorTag.append(image);
        container.append(anchorTag);
        return container
    }
}