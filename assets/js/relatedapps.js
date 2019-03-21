/**
 * Class representing apps related to a specific word
 */
class RelatedApps{
    /**
     * Makes storage for dom elements and app data
     * @param {object} options - displayArea 
     */
    constructor(options){
        this.displayArea = $(options.displayArea);
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
        $(".apps").empty();
        $(".names").empty();
        for (let appIndex in response.results){
            this.data.trackName = response.results[appIndex].trackName;
            this.data.artWork = response.results[appIndex].artworkUrl512;
            this.data.link = response.results[appIndex].trackViewUrl;
            this.displayArea.append(this.render());
        }
    }
    /**
     * creates dom elements(container,title,anchortag,image) grabs data from constructor to display on the DOM
     * @returns a DOM element that has not been appended to the DOM
     */
    render(){
        var container = $('<div>',{
            'class':'app'
        })
        var title = $('<div>',{
            class:'app-title',
            'text':this.data.trackName
        })
        var anchorTag = $('<a>',{
            'href':this.data.link,
            'target':'_blank'
        })
        var image = $('<img>',{
            'src':this.data.artWork
        })
        $('.names').append(title);
        anchorTag.append(image);
        container.append(anchorTag);
        return container
    }
}