'use strict';
    $.ajax('./data/page1.json').then(galleryData =>{
    galleryData.forEach(items =>{
        let newItem = new galleryItem(items);
        newItem.renderNewItem();
    });
    editiedKeywords();
    $('#photo-template').first().remove();
});


let keydowrds = [];
function galleryItem(key){
    this.title = key.title;
    this.image = key.image_url;
    this.description = key.description;
    this.keyword = key.keyword;
    this.horns = key.horns;   
    
        if(!keydowrds.includes(this.keyword)){
            keydowrds.push(this.keyword);
    
}
}

function keywordOption(){
    for( let i = 0 ; i<keydowrds.length ; i++){
         let keywordsList = $('option').first().clone().text(keydowrds[i]);
         keywordsList.attr('value',keydowrds[i])
         $('select').append(keywordsList);

    }

   
}

function editiedKeywords(){
    for ( let i = 0 ; i<keydowrds.length; i++){
        let options = $('option').first().clone().text(keydowrds[i]);
        $('select').append(options);
        // options.attr('value',keydowrds[i]);
    }
    console.log(keydowrds);

}


galleryItem.prototype.renderNewItem = function(){
    let sectionCopy = $('#photo-template').first().clone();
    sectionCopy.addClass(this.keyword);
    $('main').append(sectionCopy);
    sectionCopy.addClass(this.keyword);
    // sectionCopy.css('visibility','visible');
    sectionCopy.find('h2').text(this.title);
    sectionCopy.find('img').attr('src',this.image);
    sectionCopy.find('p').text(this.description);
}


