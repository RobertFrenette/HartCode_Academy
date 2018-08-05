/*
 * Script for index.html
 * required by inventory.js
 */

// Force Strict Mode
"use strict";

/*
 * Item Constructor function
 * 
 * @param itemName  - Name of Item
 * @param itemDesc  - Description of Item
 * @param itemValue - Replacement cost of Item
 * @param itemPic   - image filename
 */
function Item(itemName, itemDesc, itemValue, itemPic) {
    // Properties
    this.itemName  = itemName;
    this.itemDesc  = itemDesc;
    this.itemValue = itemValue;
    this.itemPic   = itemPic;

    // Behaviors - getters
    this.getItemName = () => {
        return this.itemName;
    };
    this.getItemDesc = () => {
        return this.itemDesc;
    };
    this.getItemValue = () => {
        return this.itemValue;
    };
    this.getItemPic = () => {
        return this.itemPic;
    };

    // Behaviors - setters
    this.setItemName = (newItemName) => {
        this.itemName = newItemName;
    };
    this.setItemDesc = (newItemDesc) => {
        this.itemDesc = newItemDesc;
    };
    this.setItemValue = (newItemValue) => {
        this.itemValue = newItemValue;
    };
    this.setItemPic = (newItemPic) => {
        this.itemPic = newItemPic;
    };
}

/*
 * function to add an Item
 * 
 * @param inventory - Collection of Items in Inventory
 * @param itemName  - Name of Item
 * @param itemDesc  - Item Desc
 * @param itemValue - Item Value
 * @param itemPic   - filename of Item pic
 * 
 * @return inventory - Updated Inventory
 */
function addItem(inventory, itemName, itemDesc, itemValue, itemPic) {
    // Get Inventory type
    var type = $('#inventoryType').html().toLowerCase();

    $.each(inventory, (key, items) => {
        // Key == home, auto, business
        if (key === type) {
            var newItem = new Item(itemName, itemDesc, itemValue, itemPic);
            inventory[type][inventory[type].length] = newItem;
        }
    });

    $('#addItemResetBtn').click();
    return inventory;
}

/*
 * function to update an Item (edit)
 * 
 * @param inventory - Collection of Items in Inventory
 * @param itemName  - Name of Item
 * @param itemDesc  - Item Desc
 * @param itemValue - Item Value
 * @param itemPic   - filename of Item pic
 * 
 * @return inventory - Updated Inventory
 */
function updateItem(inventory, itemName, itemDesc, itemValue, itemPic) {
    // Get Inventory type
    var type = $('#inventoryType').html().toLowerCase();

    $.each(inventory, (key, items) => {
        // Key == home, auto, business
        if (key === type) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.itemName === itemName) {
                    // Update the Item
                    var newItem = new Item(itemName, itemDesc, itemValue, itemPic);
                    inventory[type][i] = newItem;
                }
            }
        }
    });

    $('#closeModalBtn').click();

    return inventory;
}

/*
 * function to display edit Item Modal
 * 
 * @param type - Home, Auto, Business
 * @param item - Item to edit
 */
function editItem(type, item) {
    // Populate Modal / Form Fields with current Item data
    $('#editItemName').html(item.getItemName());
    $('#editItemImg').attr('src', `img/inventory/${type.toLowerCase()}/${item.getItemName().toLowerCase()}.png`);
    $('#editItemImg').attr('alt', item.getItemName());
    $('#itemName').val(item.getItemName());
    $('#itemDesc').val(item.getItemDesc());
    $('#itemValue').val(item.getItemValue());
    $('#itemPic').val(item.getItemPic());

    $('#editModel').show();
}

/*
 * function to delete an Item
 * 
 * @param inventory - Collection of Items in Inventory
 * @param type - Home, Auto, Business
 * 
 * @return inventory - Updated Inventory
 */
function deleteItem(inventory, type, item) {
    if (confirm(`Click "Ok" to delete ${item.getItemName()} or click "Cancel" to return.`)) {
        var filteredItems = [];
        $.each(inventory, (key, items) => {
            // Key == home, auto, business
            if (key === type.toLowerCase()) {
                filteredItems = items.filter((currentItem) => currentItem.itemName !== item.getItemName());
            }
        });

        // Update Item Inventory in Array for type
        inventory[type.toLowerCase()] = filteredItems;
    }

    return inventory;
}
