/*
 * Script for index.html
 * required by scripts.js
 * requires item.js
 */

// Force Strict Mode
"use strict";

/*
 * function to load items in Inventory from JSON file
 * 
 * @return data - items in Inventory
 */
function getInventoryData() {
    return $.getJSON("data/inventory.json",function(data) {
        return data;
    });
}

/*
 * function to get Items in Inventory for type (home, auto, business)
 * 
 * @param inventory - Array of Item Objects
 * @param type - Type of Inventory (home, auto, business) to manage
 */
function getInventory(inventory, type) {
    $('#mainSplash').hide();
    $('#imgPath').html(`img/inventory/${type.toLowerCase()}`);
    $('#inventoryItemsList').html('');

    // Loop through Inventory to get Items for type
    var itemCount = 0;
    $.each(inventory, (key, items) => {
        // Key == home, auto, business
        if (key === type.toLowerCase()) {
            $.each(items, (index, item) => {
                var newItem = new Item(item.itemName, item.itemDesc, item.itemValue, item.itemPic);
                $('#inventoryItemsList')
                .append(
                    $('<div>')
                        .attr('class', 'card')
                        .append(
                            $('<div>')
                                .attr('class', 'card-body')
                                .append(
                                    $('<img>')
                                    .attr('class', 'card-img-top')
                                    .attr('src', `img/inventory/${type.toLowerCase()}/${newItem.getItemName().toLowerCase()}.png`)
                                    .attr('alt', newItem.getItemName())
                                )        
                                .append(
                                    $('<span>')
                                        .attr('class', 'card-text')
                                        .html(newItem.getItemName())
                                )
                                .append('<br>')
                                .append(
                                    $('<span>')
                                        .attr('class', 'card-text')
                                        .html(newItem.getItemDesc())
                                )
                                .append('<br>')
                                .append(
                                    $('<span>')
                                        .attr('class', 'card-text')
                                        .html(`&#x24;${newItem.getItemValue()}`)
                                )
                                .append(
                                    $('<div>')
                                    .attr('class', 'float-right')
                                    .append(
                                        $('<a>')
                                            .attr('href', '#')
                                            .attr('class', 'btn btn-info item-action')
                                            .attr('data-toggle', 'modal')
                                            .attr('data-target', '#editModel')
                                            .html('<i class="fas fa-pencil-alt"></i> Edit')
                                            .click(() => {
                                                editItem(type, newItem);
                                                var btn = `#${type.toLowerCase()}Btn`;
                                                $(btn).click();
                                            })
                                    )
                                    .append(
                                        $('<span>')
                                            .html(' ')
                                    )
                                    .append(
                                        $('<a>')
                                            .attr('href', '#')
                                            .attr('class', 'btn btn-danger item-action')
                                            .html('<i class="fas fa-trash-alt"></i> Delete')
                                            .click(() => {
                                                inventory = deleteItem(inventory, type, newItem);
                                                var btn = `#${type.toLowerCase()}Btn`;
                                                $(btn).click();
                                            })
                                    )
                                )
                        )
                );
                itemCount++;
            });
        }
    });

    // Update HTML Elements for display
    $('#itemCount').html(itemCount);
    $('#inventoryType').html(type);
    $('#inventoryType').attr('class', `display-3 inventoryType${type}`);
    $('#inventoryTypeLogo').attr('src', `img/${type}.png`);
    $('#inventoryTypeLogo').attr('alt', `${type} Inventory`);

    $('#mainInventory').show();
}
