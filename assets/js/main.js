$(document).ready(initializeApp);

function initializeApp(){
    // let newWords = new RelevantWords()
    // newWords.getSynonyms('aquarium');
    let newApps = new RelatedApps({
        word:'kittens',
        displayArea:'.apps'
    });
    newApps.getRelatedApps();
}