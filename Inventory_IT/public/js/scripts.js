/*
 * Script for index.html
 * requires item.js
 */

// Force Strict Mode
"use strict";

// Execute only when document is ready (DOM loaded)
$(document).ready(() => {
    // Array to hold Items in Inventory
    var inventory = {};
    // Promise
    getInventoryData().then((data) => {
        inventory = data;
    });
    
    // Bind Click Event Handlers
    $('#rootLink').click((e) => {
        e.preventDefault();
        $('#mainInventory').hide();
        $('#mainSplash').show();
    });    

    // Home
    $('#homeLogo').click(() => {
        getInventory(inventory, 'Home');
    });
    $('#homeBtn').click((e) => {
        e.preventDefault();
        getInventory(inventory, 'Home');
    });

    // Auto
    $('#autoLogo').click(() => {
        getInventory(inventory, 'Auto');        
    });
    $('#autoBtn').click((e) => {
        e.preventDefault();
        getInventory(inventory, 'Auto');        
    });

    // Business
    $('#businessLogo').click(() => {
        getInventory(inventory, 'Business');
    });
    $('#businessBtn').click((e) => {
        e.preventDefault();
        getInventory(inventory, 'Business');
    });

    // Add Form Submit
    $('#addForm').submit((e) => {
        e.preventDefault();
        inventory = addItem(inventory, $('#addItemName').val(), $('#addItemDesc').val(), $('#addItemValue').val(), $('#addItemPic').val());
        var btn = `#${$('#inventoryType').html().toLowerCase()}Btn`;
        $(btn).click();
    });

    // Edit Form Submit
    $('#editForm').submit((e) => {
        e.preventDefault();

        if ($('#itemName').val() === '' || $('#itemDesc').val() === '' || $('#itemValue').val() === '' || $('#itemPic').val() === '') {
            alert('Please complete all fields.');
        } else {
            inventory = updateItem(inventory, $('#itemName').val(), $('#itemDesc').val(), $('#itemValue').val(), $('#itemPic').val());
            var btn = `#${$('#inventoryType').html().toLowerCase()}Btn`;
            $(btn).click();
        }
    });

    // Modal
    $('#saveModalBtn').click(() => {
        $('#editForm').submit();
    });
});
