'use strict';

//const fetch = require('node-fetch');
//import fetch from 'node-fetch'
// const recurso = "http://127.0.0.1:8080";
const URL = "https://eu-west-2.aws.data.mongodb-api.com/app/application-0-xugxs/endpoint/books";

var notif = document.getElementById("message");
var titext = document.getElementById("title-text");
var autext = document.getElementById("author-text");
var imgtext = document.getElementById("img-text");
var submitbut = document.getElementById("submit-btt");
//Get all the books:
//TODO
fetch(URL)
    .then(res => res.json())
    .then(json => inicio(json));



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
                                <x-icon href="#delete"></x-icon>
                                <x-label>Delete</x-label>
                            </x-menuitem>

                            <x-menuitem class="upd-item" name="${book.title}">
                                <x-icon href="#edit"></x-icon>
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
        var data = {
            title: titext.value,
            author: autext.value,
            img: imgtext.value
        };
        //fetch uses a request object
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        var request = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.     
            // mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit       
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        };

        if (updateFlag) {
            //TODO
            // PUT request here, using input text values to build JSON


            // Change Submit button text
            changeButton();
        } else {
            //TODO
            // Post request here, using input text values to build JSON
            fetch(URL, request)
                .then(res => {
                    showNotification("Updating Data... " + titext.value);
                    console.log("POST result: " + res)
                    //TODO : shown books must be refreshed
                })
                .catch(err => {
                    showNotification("ERROR Updating Data... ")
                    console.log("POST error: " + err)
                });
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

