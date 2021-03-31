'use strict';


let keydowrds = [];
function galleryItem(key){
    this.title = key.title;
    this.image = key.image_url;
    this.description =key.description;
    this.keyword = key.keyword;
    this.horns = key.horns;   
    
        if(!keydowrds.includes(this.keyword)){
            keydowrds.push(this.keyword);
    
}
}

$.ajax('./data/page1.json').then(galleryData =>{
    galleryData.forEach(items =>{
    let newItem = new galleryItem(items);
    newItem.renderNewItem();
    });
    $('body > #photo-template').hide();
    keywordOption();
});

$('#page1').click(function(){
    console.log()
    $('main').html('');
    $('section').show();
    $.ajax('./data/page1.json').then(galleryData =>{
    galleryData.forEach(items =>{
    let newItem = new galleryItem(items);
    newItem.renderNewItem();
    });
    keywordOption();
    $('body > #photo-template').hide();
});
});

function keywordOption(){
    for( let i = 0 ; i<keydowrds.length ; i++){
         let keywordsList = $('option').first().clone().text(keydowrds[i]);
         keywordsList.attr('value',keydowrds[i])
         $('select').append(keywordsList);

    }
}


galleryItem.prototype.renderNewItem = function(){
    let sectionCopy = $('#photo-template').first().clone();
    $('main').append(sectionCopy);
    sectionCopy.addClass(this.keyword);
    // sectionCopy.css('visibility','visible');
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

    // $('select').change(function(){
    //     let selectedKey = $(this).val();
    //     console.log(selectedKey);
    //     $('article').hide();
    //     $(`.${selectedKey}`).show();
    // });

$('#page2').click(function(){
    $('main').html('');
    $('section').show();
    $.ajax('./data/page2.json').then(data => {
        console.log(data);
        data.forEach(objItem => {
            let newObj = new galleryItem(objItem);
            newObj.renderNewObj();
        })
        $('body > #photo-template').hide();
        console.log(keydowrds);
    })
});
galleryItem.prototype.renderNewObj = function(){
    let mustacheTemp = $('#galleryTemplate').html();
    let renderTem = Mustache.render(mustacheTemp,this);
    console.log(this);
    console.log(mustacheTemp);
    $('main').append(renderTem); 
    // $('#mustache-template').addClass(this.keyword);
}

