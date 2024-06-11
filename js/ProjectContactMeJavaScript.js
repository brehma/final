// JavaScript source code
"use strict";

/* ***********************************************************************************************************************************
 * ***********************************************************************************************************************************
 * *******************************************  FORM VALIDATION CODE FOR CONTACT ME PAGE  ********************************************
 * ***********************************************************************************************************************************
 * ***********************************************************************************************************************************
 */

// global variables:

// since some can only have alpha and some only numbers, set up match variables
// via regular expressions:  ^ means find char NOT between the brackts. i means ignore case.
let lettersOnly = /[^A-Z]/i;
let NumsOnly = /[^0-9]/;
let emailChars = ["@", "."];  // these chars are required by email
let PhoneFormat = /[^0-9-]/;



//-----------------------------------------------------------
// ValidateForm:  validates input fields 
//-------------------------------------------------------------------
function ValidateForm() {

    // Set up variables for all the form items we will validate.
    let bFirstName = false;
    let bLastName = false;
    let bEmail = false;
    let bSubject = false;
    let bComment = false;


    // created another function to validate based on inputs:  
    // arguments are: id of form input item, Standard text form of input item to print in error messages,
    // id of that items associated error item, max char, 
    // Not allowed chartype, required char types, required, is this an array value from a selection input...

    bFirstName = GenericFormValidator('FirstName', 'First Name', 'FirstNameError', 20, lettersOnly, null, true, false);
    bLastName = GenericFormValidator('LastName', 'Last Name', 'LastNameError', 50, lettersOnly, null, true, false);
    bEmail = GenericFormValidator('Email', 'Email', 'EmailError', 100, null, emailChars, true, false);
    bSubject = GenericFormValidator('SubjectInput', 'Subject', 'SubjectError', 50, null, null, true, false);
    bComment = GenericFormValidator('CommentsInput', 'Comments', 'CommentError', 200, null, null, true, false);

    console.log("bfirst: " + bFirstName + " bLast: " + bLastName + " bEmail: " + bEmail + " bSubject: " + bSubject + " bComment: " + bComment);

    // Make sure you return all the boolean variables that are checking each field
    return (bFirstName && bLastName && bEmail && bSubject && bComment);

}// end ValidateForm function


//---------------------------------------------------------------------------------
// GenericFormValidator:  called by ValidateForm
//
// Takes a number of input parameters to be able to validate input forms for 
// if they are required, max length and character types allowed.  
// Provides generic error message based on item id.
// Arguments in order:
// itemID: The html page id of the input or select element in question

// ----------------------------------------------------------------------------------
function GenericFormValidator(itemID, itemText, itemErrorID, MaxLength, NotAllowedCharType, ReqCharTypes, bRequired, bArray) {

    // set up error message element variable for the first name:
    let errMsgEl = document.getElementById(itemErrorID);
    let formItem = document.getElementById(itemID);
    let errorMessage = "";
    let minLength = 0;
    let bValidateOK = true;

    console.log("required char types length: " + ReqCharTypes);
    console.log("Not allowed types: " + NotAllowedCharType);
    console.log("match return: " + formItem.value.match(NotAllowedCharType));
    // do the check:
    // if this is an array from a select, then just need to make sure it's not null or the "start" value
    if (bArray) {
        if (formItem.options[formItem.selectedIndex].value === null || formItem.options[formItem.selectedIndex].value === "000") {
            // user has not selected anything.
            bValidateOK = false;
            errorMessage = "Oops! The " + itemText + " is required.";
        }
    }// end if an array value item
    else {
        // not an array value item.

        // first determine if there should be a min length > 0.  IE Required.
        if (bRequired) {
            minLength = 1;
        }

        // check min length first.
        if (formItem.value.length < minLength) {
            // length is too small or none existant.
            bValidateOK = false;
            errorMessage = "Oops! The " + itemText + " is required.";
        }
        else if (MaxLength !== null && formItem.value.length > MaxLength) {
            // Length too long!
            bValidateOK = false;
            errorMessage = "Oops! The " + itemText + " has a maximum length of " + MaxLength + " characters.";
        }
        else if (formItem.value.length >= minLength &&
            MaxLength !== null &&
            formItem.value.length < MaxLength) {
            // ok on length, check for char type
            if (formItem.value.match(NotAllowedCharType) !== null) {
                // they put something other than what was allowed in.
                bValidateOK = false;

                switch (NotAllowedCharType) {

                    case lettersOnly:
                        errorMessage = "Oops! The " + itemText + " can only be alphabetic characters.";
                        break;

                    case NumsOnly:
                        errorMessage = "Oops! The " + itemText + " can only be numeric characters.";
                        break;

                    default:
                        errorMessage = "Oops! The " + itemText + " can't use the type of characters you put in.";
                }// end switch chartype

            }// end if chartype doesn't match


            if (ReqCharTypes !== null && bValidateOK === true) {
                // Ok to this point.  Check if all required types are included.
                // go through list and check if all there.
                let bAllThere = true;
                let i = 0;
                for (i = 0; i < ReqCharTypes.length; i++) {

                    if (formItem.value.includes(ReqCharTypes[i]) !== true) {
                        // alas, it doesn't have the required char.
                        bAllThere = false;
                    }

                }// end for

                if (!bAllThere) {
                    // need error message for not having the all the required charactors
                    bValidateOK = false;
                    errorMessage = "Oops! The " + itemText + " doesn't look right.  Maybe you don't have everything you need?";
                }

            } // end required char check

        }// end if length ok. 

    }// end else this is not an array value


    // if check failed, enable the error message element and print out the error message right under the failing item.
    if (!bValidateOK) {
        //errMsgEl.setAttribute("visibility", "visible");
        errMsgEl.innerHTML = errorMessage;
        console.log("validate fail. ErrmsgE1 is:");
        console.log(errMsgEl);
    }
    else {
        // all good. clear error message
        //errMsgEl.setAttribute("visibility", "hidden");
        errMsgEl.innerHTML = "";
    }

    // return the results of the check
    return bValidateOK;

}// end GenericFormValidator

/* ***********************************************************************************************************************************
 * *******************************************  END FORM VALIDATION CODE  ************************************************************
 * ***********************************************************************************************************************************
 */