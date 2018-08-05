/*
 * Script for index.html
 * Requires contact.js
 */
 
// Force Strict Mode
"use strict";
 
/*
 * Function to validate User Input and return vaildity
 *
 * @param firstName    - Input element with User-entered First Name
 * @param lastName     - Input element with User-entered Last Name
 * @param emailAddress - Input element with User-entered Email Address
 * @param msg          - HTML element to display error message if required
 *
 * @return valid       - true if all input is vaild, false if input is missing
 */
function validateInput(firstName, lastName, emailAddress, msg) {
  var valid = false;
 
  // Valdiate input and set error msg if required
  if (firstName.val() === '') {
    msg.html('Please enter a First Name.');
    firstName.focus();
  } else if (lastName.val() === '') {
    msg.html('Please enter a Last Name.');
    lastName.focus();
  } else if (emailAddress.val() === '') {
    msg.html('Please enter an Email Address.');
    emailAddress.focus();
  } else {
    // All input is valid
    valid = true;
  }
 
  return valid;
}
 
/*
 * Function to show/hide (toggle) Buttons
 * Doesn't apply to all Buttons on page, so apply individually
 */
function toggleButtons() {
    $('#submitBtn').toggle();
    $('#resetBtn').toggle();
    $('#editBtn').toggle();
    $('#cancelBtn').toggle();
}
 
// Execute only when document is ready (DOM loaded)
$(document).ready(() => {
  // Array to hold Contact Objects (Objects)
  var contacts = [];
 
  // Vars to hold HTML Elements
  var contactForm  = $('#contactForm');
  var firstName    = $('#firstName');
  var lastName     = $('#lastName');
  var emailAddress = $('#emailAddress');
  var msg          = $('#msg');
  var submitBtn    = $('#submitBtn');
  var resetBtn     = $('#resetBtn');
  var editBtn      = $('#editBtn');
  var cancelBtn    = $('#cancelBtn');
 
  // <UL> element to hold dynamically created <LI> elements
  var contactsList = $('#contactsList');
 
  // Var to hold Contact to delete when editing
  var contactToDelete = '';
 
  // Submit Button Click Event
  submitBtn.click(() => {
    // Check for valid input
    if (validateInput(firstName, lastName, emailAddress, msg)) {
      // Create new Contact and push to Array
      // The Contact() Constructor function is in contact.js
      contacts.push(new Contact(firstName.val(), lastName.val(), emailAddress.val()));
     
      // Display Contacts on page
      // displayContacts() function is in contact.js
      displayContacts(contacts, contactsList, contactsList);
     
      // Clear error message
      msg.html('&nbsp;');
 
      // Click reset button to reset form
      resetBtn.click();
    }
  });
 
  // Reset Button Click Event
  resetBtn.click(() => {
    // Clear input fields
    firstName.val('');
    lastName.val('');
    emailAddress.val('');
 
    // Clear error msg
    msg.html('&nbsp;');
 
    // Position cursor
    firstName.focus();
  });
 
 // Edit Button Click Event
  editBtn.click(() => {
    // Delete existing Contact
    // deleteContact() function is in contact.js
    contacts = deleteContact(contactToDelete, contacts, contactsList);
    contactToDelete = '';
 
    // Save new Contact
    submitBtn.click();
 
    cancelBtn.click();
  });
 
  // Cancel Button Click Event
  cancelBtn.click(() => {
    toggleButtons();
    resetBtn.click();
  });
 
  // Bind Click Event Handler to dynamically created Edit Buttons
  $(document).on('click', '.btn-info', function() {
    // Filter out selected Contact to edit
    var filteredContact = contacts.filter((contact) => {
        contactToDelete = this.value;
        return contact.getEmailAddress() == this.value;
    });
 
    // Populate Form with Contact data - first (only) Element in filteredContact Array
    firstName.val(filteredContact[0].firstName);
    lastName.val(filteredContact[0].lastName);
    emailAddress.val(filteredContact[0].emailAddress);
 
    toggleButtons();
    firstName.focus();
  });
 
  // Bind Click Event Handler to dynamically created Delete Buttons
  $(document).on('click', '.btn-danger', function() {
    // deleteContact() function is in contact.js
    contacts = deleteContact(this.value, contacts, contactsList);
  });
});
