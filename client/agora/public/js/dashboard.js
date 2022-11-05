//this exists for to create rudimentary tests for the API on the web page
let btn = document.createElement( "button" );
btn.innerHTML = "discussion";
btn.type = "submit";
btn.onclick = function () {
    alert( "Button is clicked" );
    const options = {
        method: 'GET'
    };
    fetch( '/api/v1/auth/discussions/goal/1', options );
};
document.body.appendChild( btn );



/**
 * Expand metadata area
 */
if ( document.getElementById( "expansionArrow" ) ) {
    [ "expansionArrow", "expansionArrowUp" ].forEach( ( el ) => {
        document.getElementById( el ).addEventListener( "click", () => {
            if (
                document.getElementById( "additionalMetadata" ).style.display === "none"
            ) {
                document.getElementById( "additionalMetadata" ).style.display = "block";
                document.getElementById( "expansionArrow" ).style.display = "none";
                document.getElementById( "expansionArrowUp" ).style.display = "block";
            }
            else {
                document.getElementById( "additionalMetadata" ).style.display = "none";
                document.getElementById( "expansionArrowUp" ).style.display = "none";
                document.getElementById( "expansionArrow" ).style.display = "block";
            }
        } );
    } );
}

/**
 * When toggling resource types set the correct editor in the UI
 */
function toggleSunEditor() {
    console.log(
        "Type value is: " + document.getElementById( "resourceType" ).value
    );
    if ( document.getElementById( "resourceType" ).value == "3" ) {
        document.getElementById( "resourceEditor" ).style.display = "none";
        document.getElementById( "suneditor_resourceEditor" ).style.display = "none";
        document.getElementById( "embedded_submission_text_resource" ).style.display =
      "block";
    }
    else if ( document.getElementById( "resourceType" ).value == "2" ) {
        document.getElementById( "resourceEditor" ).style.display = "none";
        document.getElementById( "suneditor_resourceEditor" ).style.display = "none";
        document.getElementById( "embedded_submission_text_resource" ).style.display =
      "none";
    }
    else {
        document.getElementById( "resourceEditor" ).style.display = "none";
        document.getElementById( "suneditor_resourceEditor" ).style.display = "block";
        document.getElementById( "embedded_submission_text_resource" ).style.display =
      "none";
    }
}

// sun editor for resource
let resourceEditor = null;
if ( document.getElementById( "resourceEditor" ) ) {
    console.log( "initializing the sun editor" );
    // eslint-disable-next-line no-undef
    resourceEditor = SUNEDITOR.create( "resourceEditor", {
        toolbarContainer: "#toolbar_container",
        showPathLabel: false,
        width: "auto",
        height: "auto",
        minHeight: "150px",
        maxHeight: "700px",
        buttonList: [
            [ "undo", "redo", "font", "fontSize", "formatBlock" ],
            [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "removeFormat",
            ],
            [
                "fontColor",
                "hiliteColor",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                "table",
            ],
            [
                "link",
                "image",
                "video",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
            ],
        ],
        callBackSave: function ( contents, isChanged ) {
            alert( contents );
            console.log( contents );
        },
    } );

    resourceEditor.onChange = ( contents, core ) => {
        resourceEditor.save();
    };

    document.getElementById( "resourceType" ).addEventListener( "change", () => {
        toggleSunEditor();
    } );

    
    toggleSunEditor();
}

function auto_grow( element ) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
}

if (
    document.getElementsByName( "topicType" ) &&
  document.getElementsByName( "topicType" ).length > 0
) {
    if ( document.querySelector( 'input[name="topicType"]:checked' ).value == 1 ) {
    //console.log('1');
        document.getElementById( "acivity-accordion-group" ).style.display = "block";
        document.getElementById( "assessment-accordion-group" ).style.display =
      "block";
    }
    else {
    //console.log('2');
        document.getElementById( "acivity-accordion-group" ).style.display = "none";
        document.getElementById( "assessment-accordion-group" ).style.display =
      "none";
    }

    // attach the event to make them editible
    document.querySelectorAll( '[name="topicType"]' ).forEach( ( topicTypeBox ) => {
        topicTypeBox.addEventListener( "click", () => {
            console.log(
                "clicked: " +
        document.querySelector( 'input[name="topicType"]:checked' ).value
            );
            if (
                document.querySelector( 'input[name="topicType"]:checked' ).value == 1
            ) {
                //console.log('1');
                document.getElementById( "acivity-accordion-group" ).style.display =
          "block";
                document.getElementById( "assessment-accordion-group" ).style.display =
          "block";
            }
            else {
                //console.log('2');
                // make sure option were not selected by cleaning them
                if ( document.getElementById( "topicHasAssessment" ).checked ) {
                    document.getElementById( "assessment-accordion" ).click();
                }
                if ( document.getElementById( "topicHasActivity" ).checked ) {
                    document.getElementById( "activity-accordion" ).click();
                }

                document.getElementById( "acivity-accordion-group" ).style.display =
          "none";
                document.getElementById( "assessment-accordion-group" ).style.display =
          "none";
            }
        } );
    } );
}

/**
 * The following two functions show or hide the assessment and activity panels and check the hasAssessment / hasAcitvity
 * checkbox based on whether the user interacts with the accordion
 * These areas only show if the topicType = educational
 */
if ( document.getElementById( "assessment-accordion" ) ) {
    document
        .getElementById( "assessment-accordion" )
        .addEventListener( "click", () => {
            document.getElementById( "topicHasAssessment" ).checked =
        !document.getElementById( "topicHasAssessment" ).checked;
        } );
}

if ( document.getElementById( "activity-accordion" ) ) {
    document
        .getElementById( "activity-accordion" )
        .addEventListener( "click", () => {
            document.getElementById( "topicHasActivity" ).checked =
        !document.getElementById( "topicHasActivity" ).checked;
        } );
}

/**
 * When user selects an existing goal that they wish to edit this function will populate the DOM
 * using the passed goal so the form is ready for modification of the object.
 * @param {*} goal <- goal used to popluate the form
 * @param {*} goalImagePath <- base path for the image url
 */
function updateGoalModal( goal, goalImagePath ) {
    if ( document.getElementById( "create-goal-modal" ) && goal ) {
        document.getElementById( "goalId" ).value = goal.id;

        console.log( goal.visibility );
        if ( goal.visibility === 0 ) {
            document.getElementById( "goalVisibilityPrivate" ).checked = true;
            document.getElementById( "goalVisibilityShared" ).checked = false;
            document.getElementById( "goalVisibilityPublic" ).checked = false;
        }
        else if ( goal.visibility === 1 ) {
            document.getElementById( "goalVisibilityPrivate" ).checked = false;
            document.getElementById( "goalVisibilityShared" ).checked = true;
            document.getElementById( "goalVisibilityPublic" ).checked = false;
        }
        else if ( goal.visibility === 2 ) {
            document.getElementById( "goalVisibilityPrivate" ).checked = false;
            document.getElementById( "goalVisibilityShared" ).checked = false;
            document.getElementById( "goalVisibilityPublic" ).checked = true;
        }

        document.getElementById( "goalVersion" ).value = goal.goalVersion;
        document.getElementById( "goalName" ).value = goal.goalName;
        document.getElementById( "goalDescription" ).value = goal.goalDescription;

        if ( goal.goalImage ) {
            document.getElementById( "goalImageEl" ).src =
        goalImagePath + goal.goalImage;
        }
        else {
            document.getElementById( "goalImageEl" ).src = "data:,";
            document.getElementById( "formFile" ).value = "";
        }

        if ( goal.active ) {
            document.getElementById( "goalActive" ).checked = true;
        }
        else {
            document.getElementById( "goalActive" ).checked = false;
        }

        if ( goal.completable ) {
            document.getElementById( "goalCompletable" ).checked = true;
        }
        else {
            document.getElementById( "goalCompletable" ).checked = false;
        }
    }
}

/**
 * When user selects an existing topic that they wish to edit this function will populate the DOM
 * using the passed topic so the form is ready for modification of the object.
 * @param {*} topic <- topic used to popluate the form
 * @param {*} topicImagePath <- base path for the image url
 */
function updateTopicModal( topic, topicImagePath ) {
    if ( document.getElementById( "create-topic-modal" ) && topic ) {
        document.getElementById( "topicId" ).value = topic.id;

        console.log( topic.visibility );
        if ( topic.visibility === 0 ) {
            document.getElementById( "topicVisibilityPrivate" ).checked = true;
            document.getElementById( "topicVisibilityShared" ).checked = false;
            document.getElementById( "topicVisibilityPublic" ).checked = false;
        }
        else if ( topic.visibility === 1 ) {
            document.getElementById( "topicVisibilityPrivate" ).checked = false;
            document.getElementById( "topicVisibilityShared" ).checked = true;
            document.getElementById( "topicVisibilityPublic" ).checked = false;
        }
        else if ( topic.visibility === 2 ) {
            document.getElementById( "topicVisibilityPrivate" ).checked = false;
            document.getElementById( "topicVisibilityShared" ).checked = false;
            document.getElementById( "topicVisibilityPublic" ).checked = true;
        }

        document.getElementById( "topicName" ).value = topic.topicName;
        document.getElementById( "topicDescription" ).value = topic.topicDescription;

        if ( topic.topicImage ) {
            document.getElementById( "topicImage" ).src =
        topicImagePath + topic.topicImage;
        }
        else {
            document.getElementById( "topicImage" ).src = "data:,";
            document.getElementById( "formFile" ).value = "";
        }

        if ( topic.active ) {
            document.getElementById( "topicActive" ).checked = true;
        }
        else {
            document.getElementById( "topicActive" ).checked = false;
        }

        if ( topic.completable ) {
            document.getElementById( "topicCompletable" ).checked = true;
        }
        else {
            document.getElementById( "topicCompletable" ).checked = false;
        }
    }
}

function newResourceModel() {
    document.getElementById( "resourceModified" ).value = false;
    document.getElementById( "resourceId" ).value = -1;

    document.getElementById( "resourceType" ).value = 1;
    document.getElementById( "resourceVisibility" ).value = 2;

    document.getElementById( "resourceActive" ).checked = true;
    document.getElementById( "isRequired" ).checked = false;

    document.getElementById( "resourceName" ).value = "";
    document.getElementById( "resourceDescription" ).value = "";

    document.getElementById( "resourceLink" ).value = "";

    // clear the contents of the wysiwyg editor
    resourceEditor.setContents( "" );

    if ( document.querySelector( ".drop-zone__thumb" ) ) {
        document.querySelector( ".drop-zone__thumb" ).remove();

        // add the prompt back in
        let prompt = document.createElement( "span" );
        prompt.className = "drop-zone__prompt";
        prompt.innerHTML = "Drop file here or click to upload";
        document.querySelector( ".drop-zone" ).appendChild( prompt );
    }
}

/**
 * When user selects an existing resource that they wish to edit this function will populate the DOM
 * using the passed resource so the form is ready for modification of the object.
 * @param {*} resource <- resource used to popluate the form
 * @param {*} resourceImagePath <- base path for the image url
 */
function updateResourceModal( resourceId, resourceImagePath ) {
    if ( document.getElementById( "create-resource-modal" ) && resourceId ) {
    // fetch the resource
        fetch( "/api/v1/auth/resources/" + resourceId ).then( ( res ) => {
            //console.log(JSON.stringify(res));
            res.json().then( ( data ) => {
                const resource = data[0];
                console.log( "Client side resource check: " + JSON.stringify( resource ) );
                document.getElementById( "resourceId" ).value = resource.id;

                if ( resource.resourceImage ) {
                    // set the modification flag
                    document.getElementById( "resourceModified" ).value = true;

                    if ( document.querySelectorAll( ".drop-zone__input" ) ) {
                        const inputElement =
              document.querySelectorAll( ".drop-zone__input" )[0];
                        const dropZoneElement = inputElement.closest( ".drop-zone" );
                        let thumbnailElement =
              dropZoneElement.querySelector( ".drop-zone__thumb" );

                        // First time - remove the prompt
                        if ( dropZoneElement.querySelector( ".drop-zone__prompt" ) ) {
                            dropZoneElement.querySelector( ".drop-zone__prompt" ).remove();
                        }

                        // First time - there is no thumbnail element, so lets create it
                        if ( !thumbnailElement ) {
                            thumbnailElement = document.createElement( "div" );
                            thumbnailElement.classList.add( "drop-zone__thumb" );
                            dropZoneElement.appendChild( thumbnailElement );
                        }

                        thumbnailElement.dataset.label = resource.resourceImage;
                        thumbnailElement.style.backgroundImage = `url('${resourceImagePath + resource.resourceImage
                        }')`;
                    }
                }
                else {
                    // clear
                    if ( document.querySelector( ".drop-zone__thumb" ) ) {
                        document.querySelector( ".drop-zone__thumb" ).remove();

                        // add the prompt back in
                        let prompt = document.createElement( "span" );
                        prompt.className = "drop-zone__prompt";
                        prompt.innerHTML = "Drop file here or click to upload";
                        document.querySelector( ".drop-zone" ).appendChild( prompt );
                    }
                }

                document.getElementById( "resourceType" ).value = resource.resourceType;
                document.getElementById( "resourceVisibility" ).value =
          resource.visibility;

                if ( resource.active ) {
                    document.getElementById( "resourceActive" ).checked = true;
                }
                else {
                    document.getElementById( "resourceActive" ).checked = false;
                }

                if ( resource.isRequired ) {
                    document.getElementById( "isRequired" ).checked = true;
                }
                else {
                    document.getElementById( "isRequired" ).checked = false;
                }

                document.getElementById( "resourceName" ).value = resource.resourceName;
                document.getElementById( "resourceDescription" ).value =
          resource.resourceDescription;

                // add the html text to the wysiwyg editor
                resourceEditor.setContents( resource.resourceContentHtml );
                document.getElementById( "resourceLink" ).value = resource.resourceLink;

                toggleSunEditor();
            } );
        } );
    }
}

/**
 *
 */
function deleteGoal() {
    // double check the user is sure!!
    console.log( "stub to delete goal " );
}

/**
 *
 */
function addFilter() {
    console.log( "this will add a filter" );
}

/* note-gallery edit modal */
function viewModal( id, name, desc ) {
    let nameId = "card-title-" + id;
    let descId = "card-desc-" + id;
    document.getElementById( "viewModalLabel" ).textContent =
    document.getElementById( nameId ).textContent;
    document.getElementById( "note-modal-description" ).textContent =
    document.getElementById( descId ).textContent;
}

/*more options toggle*/
function toggleMoreOptionsOn( id ) {
    const dropId = id.substring( 0, 5 ) + "option-" + id.substring( 5 );

    document.getElementById( dropId ).style.visibility = "visible";
}

function toggleMoreOptionsOff( id ) {
    const dropId = id.substring( 0, 5 ) + "option-" + id.substring( 5 );

    document.getElementById( dropId ).style.visibility = "hidden";
}


const toggleGoalView = () => {
    const cards = document.getElementsByClassName( "view-check" );
    for ( let i = 0; i < cards.length; i++ ) {
        if ( ( cards[i].classList ).contains( "a-goal" ) ) {
            cards[i].classList.remove( "d-none" );
        }
        else {
            cards[i].classList.add( "d-none" );
        }
    }
};

const toggleTopicView = () => {
    const cards = document.getElementsByClassName( "view-check" );
    for ( let i = 0; i < cards.length; i++ ) {
        if ( ( cards[i].classList ).contains( "a-goal" ) ) {
            cards[i].classList.add( "d-none" );
        }
        else {
            cards[i].classList.remove( "d-none" );
        }
    }
};

const toggleAllView = () => {
    const cards = document.getElementsByClassName( "view-check" );
    for ( let i = 0; i < cards.length; i++ ) {
        cards[i].classList.remove( "d-none" );
    
    }
};

//////More Options Helpers//////

//makes sure event pointer detects the proper element
const goodElement = ( e ) => {
    if ( e.target.id ) {
        return e.target;
    }
    else {
        return e.target.parentElement;
    }
};

//returns true if e points to grid view, false if list view
const isGrid = ( e ) => {
    e = goodElement( e );
    if ( e.parentElement.parentElement.classList[4] === "grid-options" ) {
        return true;
    }
    else {
        return false;
    }
};

//return true if topic, false if goal
//e is pointer event
const isTopic = ( e ) => {
    let output = false;
    const GE = goodElement( e );
    if ( isGrid( e ) ) {
        if ( ( GE.parentElement.parentElement.id ).charAt( 0 ) === "t" ) {
            output = true;
        }
    }
    else {
        if ( ( GE.parentElement.parentElement.parentElement.id ).charAt( 0 ) === "t" ) {
            output = true;
        }
    }
    return output;
};

////returns the id of the element e is pointing to
const getId = ( e ) => {
    const GE = goodElement( e );
    let parent;
    if ( isGrid( e ) ) {
        parent = GE.parentElement.parentElement.parentElement.id; //the id of the grid element
    }
    else {
        parent = GE.parentElement.parentElement.parentElement.parentElement.id; //the id of the list element
    }
    return parent.substring( 5 ); //just the numeric id
};

////////Create a toast/////////
const createToast = ( text ) => {
    document.getElementById( 'toast-text' ).innerText = text;
    const thisToast = document.getElementById( 'liveToast' );
    // eslint-disable-next-line no-undef
    const toast = new bootstrap.Toast( thisToast );
    toast.show();
};

////////////Updating the rename modal//////////

//updating the input DOM of the rename-modal depending on the selected card
const fillNameandDescription = ( e ) => {
    let parentId = getId( e );
    let prefix;
    isTopic( e ) ? prefix = "t-" : prefix = "g-";

    let parentNameId = "card-title-" + parentId;
    let parentDescId = "card-desc-" + parentId;

    //console.log(document.getElementById(prefix + "gv-" + parentNameId).innerText)
    console.log( document.getElementById( prefix + "gv-" + parentNameId ).innerText );

    let parentName = document.getElementById( prefix + "lv-" + parentNameId ).innerText;
    let parentDesc = document.getElementById( prefix + "gv-" + parentDescId ).innerText;

    //setting the onclick event of the save button depenidng on the id of the clicked card
    document
        .getElementById( "save-name" )
        .setAttribute(
            "onclick",
            `updateSaveButton(${JSON.stringify( parentNameId )},${JSON.stringify(
                parentDescId )},${JSON.stringify( prefix )})`
        );

    //filling the input fields of the modal to the current values
    if ( parentName ) {
        document.getElementById( "note-modal-name" ).value = parentName;
    }
    if ( parentDesc ) {
        document.getElementById( "note-modal-description" ).value = parentDesc;
    }
    else {
        document.getElementById( "note-modal-description" ).value = "";
    }

    //showing the modal
    document.getElementById( "rename-modal" ).style.display = "block";
    document.getElementById( "backdrop" ).style.display = "block";
    document.getElementById( "rename-modal" ).classList.add( "show" );

    e.stopPropagation();
};

//A collection of all the rename buttons
var cards = document.querySelectorAll( "#rename-card" ).forEach( ( card ) => {
    card.addEventListener( "click", fillNameandDescription );
} );

//changing the properties of the save button of the rename-modal depending on the selected card
const updateSaveButton = ( nameId, descId, prefix ) => {
    let tempName = document.getElementById( "note-modal-name" ).value;
    if ( tempName ) {
        document.getElementById( prefix + "gv-" + nameId ).innerText = tempName;
        document.getElementById( prefix + "lv-" + nameId ).innerText = tempName;
        document.getElementById( prefix + "gv-" + descId ).innerText = document.getElementById( "note-modal-description" ).value;
        closeRenameModal();
    }
    else {
        window.alert( "All goals/topics must have a name" );
    }
};

//hides rename modal
const closeRenameModal = () => {
    document.getElementById( "rename-modal" ).style.display = "none";
    document.getElementById( "backdrop" ).style.display = "none";
    document.getElementById( "rename-modal" ).classList.remove( "show" );
};

//Triggers when the "x" on the rename-modal is clicked
const removeText = ( type ) => {
    if ( type === "name" ) {
        document.getElementById( "note-modal-name" ).value = "";
    }
    else if ( type === "desc" ) {
        document.getElementById( "note-modal-description" ).value = "";
    }
};

//////////*Updating the delete modal*/////////////

//updating the input DOM of the delete-modal depending on the selected card
const showDeleteModal = ( e ) => {
    let parentId = getId( e );
    let prefix;
    isTopic( e ) ? prefix = "t-" : prefix = "g-"; 

    let parentNameId = prefix + "lv-card-title-" + parentId;
    let parentName = document.getElementById( parentNameId ).innerText;

    //setting the text inside the delete modal to show user what they're deleting
    document.getElementById( "to-be-deleted-name" ).innerText = parentName;

    //setting the properties of the confirm button to delete the correct card
    document
        .getElementById( "confirm-delete" )
        .setAttribute( "onclick", `updateDeleteConfirmButton(${JSON.stringify( parentId )}, ${JSON.stringify( prefix )})` );

    //showing the delete modal
    document.getElementById( "delete-modal" ).style.display = "block";
    document.getElementById( "backdrop2" ).style.display = "block";
    document.getElementById( "delete-modal" ).classList.add( "show" );

    e.stopPropagation();
};

//A collection of the delete buttons
var deleteCards = document
    .querySelectorAll( "#delete-card" )
    .forEach( ( deleteCard ) => {
        deleteCard.addEventListener( "click", showDeleteModal );
    } );

//changing the properties of the confirm button of the delete-modal depending on the selected card
const updateDeleteConfirmButton = ( id, prefix ) => {
    document.getElementById( prefix + "gv-" + id ).parentElement.remove();
    document.getElementById( prefix + "lv-" + id ).remove();
    getTopics();
    exitDeleteModal();
};

//close delete modal
function exitDeleteModal() {
    document.getElementById( "delete-modal" ).style.display = "none";
    document.getElementById( "backdrop2" ).style.display = "none";
    document.getElementById( "delete-modal" ).classList.remove( "show" );
}

//////onclick handling for topic rerouting//////////

const topicReroute = ( id, newTab, prefix ) => {
    let usedPrefix;
    if ( prefix ) {
        usedPrefix = prefix;
    }
    else {
        usedPrefix = id.substring( 0, 2 );
    }

    const title = document.getElementById( usedPrefix + "lv-card-title-" + id );
    const description = document.getElementById( usedPrefix + "gv-card-desc-" + id );

    //pass the title and description to backend
    if ( newTab ) {
        window.open( "http://localhost:4200/note", "_blank" );
    }
    else {
        location.href = '/note';
    }
};

///////////////Open in new tab button///////////////

const openInNewTab = ( e ) => {
    let parentId = getId( e );
    let prefix;
    isTopic( e ) ? prefix = "t-" : prefix = "g-";

    topicReroute( parentId, true, prefix );

    e.stopPropagation();
};

//A collection of the new tab buttons
var newTabCards = document
    .querySelectorAll( "#new-tab-card" )
    .forEach( ( newTabCard ) => {
        newTabCard.addEventListener( "click", openInNewTab );
    } );

//////////////////Copy to clipboard//////////////////

const copyLink = ( e ) => {
    let parentId = getId( e );

    navigator.clipboard.writeText( "http://localhost:4200/note" );

    createToast( "Copied Link!" );

    e.stopPropagation();
};

/**
 * This function was caught by ESLint as a duplicate function.
 * I am not sure why it is here, but I am leaving it here for now.
 * I do not see any calls to this function anywhere in the code. 
 *
var newTabCards = document
    .querySelectorAll( "#copy-link-card" )
    .forEach( ( copyLinkCard ) => {
        copyLinkCard.addEventListener( "click", copyLink );
    } );
*/
////////*Handling Duplicate*/////////////

//handles cloning a card then updating it's id and properties
const duplicateGoal = ( e ) => {
    let parentId = getId( e );
    let prefix;
    isTopic( e ) ? prefix = "t-" : prefix = "g-";

    let gridParent = document.getElementById( prefix + "gv-" + parentId ).parentElement;
    let listParent = document.getElementById( prefix + "lv-" + parentId );

    //creating separate, autonomous element that's a clone of the original
    let gridClone = gridParent.cloneNode( true );
    let listClone = listParent.cloneNode( true );

    //getting the next id to use
    let newId = checkForNextId();

    //changing the ids in the cloned element
    gridClone = replaceIds( gridClone, newId, true, prefix );
    listClone = replaceIds( listClone, newId, false, prefix );

    //calculating new id then setting the elements ids to the new one

    //updating the more options of the grid clone
    gridClone.childNodes[1].childNodes[1].childNodes[3].childNodes[1].addEventListener(
        "click",
        showDeleteModal
    ); //delete
    gridClone.childNodes[1].childNodes[1].childNodes[3].childNodes[3].addEventListener(
        "click",
        duplicateGoal
    ); //duplicate
    gridClone.childNodes[1].childNodes[1].childNodes[3].childNodes[5].addEventListener(
        "click",
        copyLink
    ); //open in new tab
    gridClone.childNodes[1].childNodes[1].childNodes[3].childNodes[7].addEventListener(
        "click",
        openInNewTab
    ); //open in new tab
    gridClone.childNodes[1].childNodes[1].childNodes[3].childNodes[9].addEventListener(
        "click",
        fillNameandDescription
    ); //rename

    ///////////////////////
    //updating the more options of the list clone

    listClone.childNodes[7].childNodes[3].childNodes[1].childNodes[1].addEventListener(
        "click",
        showDeleteModal
    );
    listClone.childNodes[7].childNodes[3].childNodes[1].childNodes[3].addEventListener(
        "click",
        duplicateGoal
    );
    listClone.childNodes[7].childNodes[3].childNodes[1].childNodes[5].addEventListener(
        "click",
        copyLink
    );
    listClone.childNodes[7].childNodes[3].childNodes[1].childNodes[7].addEventListener(
        "click",
        openInNewTab
    );
    listClone.childNodes[7].childNodes[3].childNodes[1].childNodes[9].addEventListener(
        "click",
        fillNameandDescription
    );


    //makes the ellipsis of the clone hidden on initialization
    gridClone.childNodes[1].childNodes[1].style.visibility = "hidden";

    //adding the new clone to the grid container
    document.getElementById( "gallery-row" ).appendChild( gridClone );

    //document.getElementById("gallery-row").insertBefore(gridClone,document.getElementById("gallery-row").childNodes[2])

    //adding the new clone to the list container
    document.getElementById( "list-column" ).appendChild( listClone );

    getTopics();

    createToast( "Duplicated " + gridParent.childNodes[1].childNodes[3].childNodes[1].innerText );

    e.stopPropagation();
};

//A collection of the duplicate buttons
var duplicateCards = document
    .querySelectorAll( "#duplicate-card" )
    .forEach( ( duplicateCard ) => {
        duplicateCard.addEventListener( "click", duplicateGoal );
    } );

//Calculating the id of a new card
const checkForNextId = () => {
    var ids = [];
    document.querySelectorAll( ".countable" ).forEach( ( obj ) => {
        let temp = obj.id.split( "-" ).pop();
        ids.push( temp );
    } );
    ids.sort();

    const len = ids.length;
    var done = false;
    var iterator = 1;
    var output = 0;
    if ( ids[0] > 0 ) {
        output = 0;
        done = true;
    }
    else if ( len === 1 ) {
        output = ++ids[0];
        done = true;
    }
    else {
        while ( !done && len > iterator ) {
            if ( ids[iterator] - ids[iterator - 1] > 1 ) {
                done = true;
                output = ++ids[iterator - 1];
            }
            else {
                iterator++;
            }
        }
    }
    if ( !done ) {
        output = ++ids[len - 1];
    }
    return output;
};

//handles updating an element's various ids
const replaceIds = ( element, newId, grid, prefix ) => {
    if ( grid ) {   //if element is in grid view
        element.childNodes[1].id = prefix + "gv-" + newId; //main id

        element.childNodes[1].childNodes[1].id = prefix + "gv-option-" + newId; //option id
    
        element.childNodes[1].childNodes[3].childNodes[1].id = prefix + "gv-card-title-" + newId; //card title id
    
        element.childNodes[1].childNodes[3].childNodes[3].id = prefix + "gv-card-desc-" + newId; //card description id
    }
    else {  //if element is in list view
        element.id = prefix + "lv-" + newId; //main id

        element.childNodes[1].id = prefix + "lv-card-title-" + newId;  //card title id

        element.childNodes[5].id = prefix + "lv-option-" + newId;  //option id
    }
    return element;
};

////////search functions////////////

//contains all topic/goal cards
var topicArr = [];

//dynamically updates depending on search input
var removedTopics = [];

//this needs to be called whenever the topics are added or removed
const getTopics = () => {
    topicArr = document.querySelectorAll( '.query-countable' );
};

window.onload = getTopics;

//what changes the DOM and modifies removed topics depending on search
//newVal is the input value
//arr is the topicArray
const queryTopics = ( newVal, arr ) => {
    //console.log(topicArr)
    let elemName, idToRemove, badListElement, badGridElement, addedElements, prefix, idPlusPrefix;
    const len = arr.length;
    newVal = newVal.toLowerCase();
    console.log( newVal );
    for ( let i = 0; i < len; i++ ) {
        elemName = arr[i].childNodes[1].childNodes[3].childNodes[1].innerText.toLowerCase();  //name of arr[i] element to be tested
    
        idToRemove = ( arr[i].childNodes[1].id ).substr( 5 ); //id of the element being checked

        prefix = ( arr[i].childNodes[1].id ).substring( 0, 2 );  //indicates whether is goal or topic

        idPlusPrefix = prefix + idToRemove;   //concatination

        if ( !elemName.includes( newVal ) ) {   //checking query
  
            if ( !hasElement( idPlusPrefix, removedTopics ) ) {  //has this element not yet already been removed?

                badListElement = document.getElementById( prefix + "lv-" + idToRemove ); //element in list view to be removed

                badGridElement = document.getElementById( prefix + "gv-" + idToRemove ).parentNode;   //element in grid view to be removed

                removedTopics.push( { gridElement: badGridElement, listElement: badListElement, id: idPlusPrefix } );   //add element to removedTopics
                badGridElement.remove();
                badListElement.remove();
            }
        }
        else if ( hasElement( idPlusPrefix, removedTopics ) ) {  //does the query name exist in removedTopics?

            addedElements = getElement( idPlusPrefix, removedTopics );
            document.getElementById( "gallery-row" ).appendChild( addedElements.gridEl ); //adding the grid element back to the DOM
            document.getElementById( "list-column" ).appendChild( addedElements.listEl ); //adding the list element back to the DOM
            removedTopics = removeElement( idPlusPrefix, removedTopics );  //remove element from removedTopics
        }
    }
};

//checks if removedTopics contains a certain id
const hasElement = ( id, removed ) => {
    console.log( id );
    console.log( removed );
    let done = false, index = 0;
    const removedLength = removed.length;
    while ( !done && index < removedLength ) {
        if ( removed[index].id === id ) {
            done = true;
        }
        index++;
    }
    return done;
};

//returns an element from removedTopics depending on id
const getElement = ( id, removed ) => {
    let done = false, index = 0, output = null;
    const removedLength = removed.length;
    while ( !done && index < removedLength ) {
        if ( removed[index].id === id ) {
            output = {gridEl: removed[index].gridElement, listEl: removed[index].listElement};
            done = true;
        }
        index++;
    }
    return output;
};

//Removes an element from removedTopics then returns the updated array
const removeElement = ( id, removed ) => {
    let done = false, index = 0;
    const removedLength = removed.length;
    while ( !done && index < removedLength ) {
        if ( removed[index].id === id ) {
            done = true;
            removed.splice( index, 1 );
        }
        index++;
    }
    return removed;
};

//////View Toggle////////////

const toggleGrid = () => {
    if( document.getElementById( "list-container" ) ) {
        document.getElementById( "list-container" ).style.display = "none";
    }
    if( document.getElementById( "main-container" ) ) {
        document.getElementById( "main-container" ).appendChild( document.getElementById( "grid-container" ) );
    }
    if( document.getElementById( "grid-container" ) ) {
        document.getElementById( "grid-container" ).style.display = "block";
    }
    
  
};

const toggleList = () => {
    document.getElementById( "grid-container" ).style.display = "none";
    document.getElementById( "main-container" ).appendChild( document.getElementById( "list-container" ) );
    document.getElementById( "list-container" ).style.display = "block";
};

window.onload( toggleGrid() );