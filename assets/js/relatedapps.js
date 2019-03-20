class RelatedApps{
    constructor(options){
        this.displayArea = $(options.displayArea);
        this.domElements = [];
        this.data = {
            trackName:null,
            artWork:null,
            link:null
        }
        //=======================================
        //BINDING
        this.getRelatedApps = this.getRelatedApps.bind(this)
        this.gotRelatedApps = this.gotRelatedApps.bind(this)
        //=======================================
    }
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
    gotRelatedApps(response){
        console.log(response.results);
        $(".apps").empty();
        $(".names").empty();
        for (let appIndex in response.results){
            this.data.trackName = response.results[appIndex].trackName;
            this.data.artWork = response.results[appIndex].artworkUrl512;
            this.data.link = response.results[appIndex].trackViewUrl;
            this.displayArea.append(this.render());
        }
    }
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