'use strict';
let allArray = [];
let keydowrds = [];
function galleryItem(key) {
    this.title = key.title;
    this.image = key.image_url;
    this.description = key.description;
    this.keyword = key.keyword;
    this.horns = key.horns;
    allArray.push(this);

    if (!keydowrds.includes(this.keyword)) {
        keydowrds.push(this.keyword);

    }
}

$.ajax('./data/page1.json').then(galleryData => {
    galleryData.forEach(items => {
        let newItem = new galleryItem(items);
        newItem.renderNewItem();
    });
    $('body > #photo-template').hide();
    keywordOption();
});

$('#page1').click(function () {
    $('main').html('');
    keydowrds = [];
    $('option').not(':eq(0)').remove();
    $('section').show();
    $.ajax('./data/page1.json').then(galleryData => {
        galleryData.forEach(items => {
            let newItem = new galleryItem(items);
            newItem.renderNewItem();
        });
        keywordOption();
        $('body > #photo-template').hide();
    });
});

function keywordOption() {
    for (let i = 0; i < keydowrds.length; i++) {
        let keywordsList = $('option').first().clone().text(keydowrds[i]);
        keywordsList.attr('value', keydowrds[i])
        $('select').append(keywordsList);

    }

   
}

galleryItem.prototype.renderNewItem = function () {
    let sectionCopy = $('#photo-template').first().clone();
    sectionCopy.addClass(this.keyword);
    $('main').append(sectionCopy);
    sectionCopy.addClass(this.keyword);
    sectionCopy.find('h2').text(this.title);
    sectionCopy.find('img').attr('src', this.image);
    sectionCopy.find('p').text(this.description);
}



$('select').change(function () {
    let selectedKey = $(this).val();
    console.log(selectedKey);
    $('section').hide();
    $(`.${selectedKey}`).show();
});

$('#page2').click(function () {
    $('main').html('');
    keydowrds = [];
    $('option').not(':eq(0)').remove();
    $('section').show();
    $.ajax('./data/page2.json').then(data => {
        console.log(data);
        data.forEach(objItem => {
            let newObj = new galleryItem(objItem);
            newObj.renderNewObj();
        })
        keywordOption();
        $('body > #photo-template').hide();
        console.log(keydowrds);
    })
});
galleryItem.prototype.renderNewObj = function () {
    let mustacheTemp = $('#galleryTemplate').html();
    let renderTem = Mustache.render(mustacheTemp, this);
    console.log(this);
    console.log(mustacheTemp);
    $('main').append(renderTem);
}

$('#sort-title').click(handleSubmit);

function handleSubmit() {
    allArray.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
    $('section').hide();
    const mainPage = document.querySelector('main');
    for (let i = 0; i < allArray.length; i++) {
        const parentElement = document.createElement('section');
        mainPage.appendChild(parentElement);
        const titleElement = document.createElement('h2');
        parentElement.appendChild(titleElement);
        titleElement.textContent = `${allArray[i].title}`;
        const imgElement = document.createElement('img');
        parentElement.appendChild(imgElement);
        imgElement.setAttribute('src', `${allArray[i].image}`);
        const descriptionElement = document.createElement('p');
        parentElement.appendChild(descriptionElement);
        descriptionElement.textContent = `${allArray[i].description}`;
    }
}

$('#sort-horns').click(handleSubmit);

function handleSubmit() {
    allArray.sort((a, b) => {
        return a.horns-b.horns;
    });
    $('section').hide();
    const mainPage = document.querySelector('main');
    for (let i = 0; i < allArray.length; i++) {
        const parentElement = document.createElement('section');
        mainPage.appendChild(parentElement);
        const titleElement = document.createElement('h2');
        parentElement.appendChild(titleElement);
        titleElement.textContent = `${allArray[i].title}`;
        const imgElement = document.createElement('img');
        parentElement.appendChild(imgElement);
        imgElement.setAttribute('src', `${allArray[i].image}`);
        const descriptionElement = document.createElement('p');
        parentElement.appendChild(descriptionElement);
        descriptionElement.textContent = `${allArray[i].description}`;
        const hornsElement = document.createElement('p');
        parentElement.appendChild(hornsElement);
        hornsElement.textContent = `${allArray[i].horns}`;
    }
}

