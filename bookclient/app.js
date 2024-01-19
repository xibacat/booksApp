'use strict';

const fetch = require('node-fetch');
// const recurso = "http://127.0.0.1:8080";
const recurso = "https://eu-west-2.aws.data.mongodb-api.com/app/application-0-xugxs/endpoint";
//const fetch = require('electron-fetch').default;
//Get all the books:
//TODO
fetch(recurso + '/books')
    .then(res => res.json())
    .then(json => inicio(json));

var notif = document.getElementById("message");
var titext = document.getElementById("title-text");
var autext = document.getElementById("author-text");
var imgtext = document.getElementById("img-text");
var submitbut = document.getElementById("submit-btt");

//To know if we are updating
var updateFlag = false;

const inicio = (books => {
    let cadenaDOM = "";
    books.forEach(book => {
        cadenaDOM +=
            `<div>
                <x-box vertical class="card">
                    <img src="${book.img}" height="170" width="108" >
                    <x-label><strong>${book.title}</strong></x-label>
                    <x-label>${book.author}</x-label>
                    <x-contextmenu>
                        <x-menu>
                            <x-menuitem class="del-item" name="${book.title}">
                                <x-label>Delete</x-label>
                            </x-menuitem>

                            <x-menuitem class="upd-item" name="${book.title}">
                                <x-label>Update</x-label>
                            </x-menuitem>
                        </x-menu>
                    </x-contextmenu>
                </x-box>
            </div>`;
    });
    document.getElementById("wrapper").innerHTML = cadenaDOM;

    // Add eventlisteners to Delete and Update context menu options
    document.querySelectorAll(".del-item").forEach(elem => {
        elem.addEventListener('click', function (event) {
            showNotification("Deleting " + elem.getAttribute("name"));
        })
    })

    document.querySelectorAll(".upd-item").forEach(elem => {
        elem.addEventListener('click', function (event) {
            //TODO
            // Set current values of selected book in text inputs
            // Change Submit button to Update button
            changeButton();

            showNotification("Let's update " + elem.getAttribute("name"));
        })
    })

    submitbut.addEventListener("click", function (event) {
        event.preventDefault();
        if (updateFlag) {
            //TODO
            // PUT request here, using input text values to build JSON
            showNotification("Updating Data... " + titext.value);
            // Change Submit button text
            changeButton();
        } else {
            //TODO
            // Post request here, using input text values to build JSON
            showNotification("Posting Data... " + titext.value)
        }
    })
});


function changeButton() {
    if (updateFlag) {
        submitbut.innerText = "Submit";
        submitbut.classList.add("btn-primary");
        submitbut.classList.remove("btn-positive");
        updateFlag = false;
    }
    else {
        submitbut.innerText = "Update";
        submitbut.classList.remove("btn-primary");
        submitbut.classList.add("btn-positive");
        updateFlag = true;
    }
}

function showNotification(text) {
    notif.innerHTML = text;
    notif.setAttribute("opened", true);
}

