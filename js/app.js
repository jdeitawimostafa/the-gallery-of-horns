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

    if(!keydowrds.includes(this.keyword)){
        keydowrds.push(this.keyword)
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

// another way to prevent repeation
// function options(array){
//     let preventRepeat = [... new Set(array)];  console.log(preventRepeat);
//     preventRepeat.forEach(    element =>{
//         $('select').append(`<option value="${element}">${element}</option>`);
//       }  );
//   }


