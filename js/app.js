'use strict';


function rendertemplate() {
    $.ajax('./data/page1.json').then(galleryData =>{
    galleryData.forEach(items =>{
        $('section').show();
        let newItem = new galleryItem(items);
        newItem.renderNewItem();
    });
    $('#photo-template').first().remove();
});
}
rendertemplate();
let keydowrds = [];
function galleryItem(key){
    this.title = key.title;
    this.image = key.image_url;
    this.description =key.description;
    this.keyword = key.keyword;

    if(!keydowrds.includes(this.keyword)){
        keydowrds.push(this.keyword);
    }
}

galleryItem.prototype.renderNewItem = function(){
    let keywordsList = $('option').first().clone().text(this.keyword);
    $('select').append(keywordsList);
    let sectionCopy = $('#photo-template').first().clone();
    sectionCopy.addClass(this.keyword);
    $('main').append(sectionCopy);
    sectionCopy.find('h2').text(this.title);
    sectionCopy.find('img').attr('src',this.image);
    sectionCopy.find('p').text(this.description);
}


    $('select').change(function(){
        let selectedKey = $(this).val();
        console.log(selectedKey);
        $('section').hide();
        $(`.${selectedKey}`).show();
    });