

if(document.getElementsByName( 'topicType' ) ) {

    if (document.querySelector('input[name="topicType"]:checked').value == 1 ) {
        console.log('1');
        document.getElementById( 'acivity-accordion-group' ).style.display = 'block';
        document.getElementById( 'assessment-accordion-group' ).style.display = 'block';
    }
    else {
        console.log('2');
        document.getElementById( 'acivity-accordion-group' ).style.display = 'none';
        document.getElementById( 'assessment-accordion-group' ).style.display = 'none';
    }

    // attach the event to make them editible 
    document.querySelectorAll('[name="topicType"]').forEach( ( topicTypeBox ) => {
        topicTypeBox.addEventListener( 'click', ( ) => { 
            console.log("clicked: " + document.querySelector('input[name="topicType"]:checked').value);
            if (document.querySelector('input[name="topicType"]:checked').value == 1 ) {
                console.log('1');
                document.getElementById( 'acivity-accordion-group' ).style.display = 'block';
                document.getElementById( 'assessment-accordion-group' ).style.display = 'block';
            }
            else {
                console.log('2');
                // make sure option were not selected by cleaning them
                if( document.getElementById('topicHasAssessment').checked ) {
                    document.getElementById('assessment-accordion').click();
                } 
                if( document.getElementById('topicHasActivity').checked ) {
                    document.getElementById('activity-accordion').click();
                }

                document.getElementById( 'acivity-accordion-group' ).style.display = 'none';
                document.getElementById( 'assessment-accordion-group' ).style.display = 'none';
                
            }
        } );
    } );

}

/**
 * The following two functions show or hide the assessment and activity panels and check the hasAssessment / hasAcitvity
 * checkbox based on whether the user interacts with the accordion
 * These areas only show if the topicType = educational 
 */
if(document.getElementById('assessment-accordion')) {
    document.getElementById('assessment-accordion').addEventListener( 'click', () => { 
        document.getElementById('topicHasAssessment').checked = !document.getElementById('topicHasAssessment').checked;
    } );
}

if(document.getElementById('activity-accordion')) {
    document.getElementById('activity-accordion').addEventListener( 'click', () => { 
        document.getElementById('topicHasActivity').checked = !document.getElementById('topicHasActivity').checked;
    } );
}



/**
 * When user selects an existing goal that they wish to edit this function will populate the DOM
 * using the passed goal so the form is ready for modification of the object.
 * @param {*} goal <- goal used to popluate the form
 * @param {*} goalImagePath <- base path for the image url
 */
function updateGoalModal( goal, goalImagePath ) {
    if(document.getElementById( 'create-goal-modal' ) && goal ) {

        document.getElementById( 'goalId' ).value = goal.id;

        console.log( goal.visibility );
        if( goal.visibility === 0 ) {
            document.getElementById( 'goalVisibilityPrivate' ).checked = true;
            document.getElementById( 'goalVisibilityShared' ).checked = false;
            document.getElementById( 'goalVisibilityPublic' ).checked = false;
        }
        else if( goal.visibility === 1 ) {
            document.getElementById( 'goalVisibilityPrivate' ).checked = false;
            document.getElementById( 'goalVisibilityShared' ).checked = true;
            document.getElementById( 'goalVisibilityPublic' ).checked = false;
        }
        else if( goal.visibility === 2 ) {
            document.getElementById( 'goalVisibilityPrivate' ).checked = false;
            document.getElementById( 'goalVisibilityShared' ).checked = false;
            document.getElementById( 'goalVisibilityPublic' ).checked = true;
        }

        document.getElementById( 'goalVersion' ).value = goal.goalVersion;
        document.getElementById( 'goalName' ).value = goal.goalName;
        document.getElementById( 'goalDescription' ).value = goal.goalDescription;

        if( goal.goalImage ) {
            document.getElementById( 'goalImage' ).src = goalImagePath + goal.goalImage;
        }
        else {
            document.getElementById( 'goalImage' ).src = "data:,";
            document.getElementById( 'formFile' ).value = "";
        }
        

        if( goal.active ) {
            document.getElementById( 'goalActive' ).checked = true;
        }
        else {
            document.getElementById( 'goalActive' ).checked = false;
        }
        
        if( goal.completable ) {
            document.getElementById( 'goalCompletable' ).checked = true;
        }
        else {
            document.getElementById( 'goalCompletable' ).checked = false;
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
    if(document.getElementById( 'create-topic-modal' ) && topic ) {

        document.getElementById( 'topicId' ).value = topic.id;

        console.log( topic.visibility );
        if( topic.visibility === 0 ) {
            document.getElementById( 'topicVisibilityPrivate' ).checked = true;
            document.getElementById( 'topicVisibilityShared' ).checked = false;
            document.getElementById( 'topicVisibilityPublic' ).checked = false;
        }
        else if( topic.visibility === 1 ) {
            document.getElementById( 'topicVisibilityPrivate' ).checked = false;
            document.getElementById( 'topicVisibilityShared' ).checked = true;
            document.getElementById( 'topicVisibilityPublic' ).checked = false;
        }
        else if( topic.visibility === 2 ) {
            document.getElementById( 'topicVisibilityPrivate' ).checked = false;
            document.getElementById( 'topicVisibilityShared' ).checked = false;
            document.getElementById( 'topicVisibilityPublic' ).checked = true;
        }

        document.getElementById( 'topicName' ).value = topic.topicName;
        document.getElementById( 'topicDescription' ).value = topic.topicDescription;

        if( topic.topicImage ) {
            document.getElementById( 'topicImage' ).src = topicImagePath + topic.topicImage;
        }
        else {
            document.getElementById( 'topicImage' ).src = "data:,";
            document.getElementById( 'formFile' ).value = "";
        }
        

        if( topic.active ) {
            document.getElementById( 'topicActive' ).checked = true;
        }
        else {
            document.getElementById( 'topicActive' ).checked = false;
        }
        
        if( topic.completable ) {
            document.getElementById( 'topicCompletable' ).checked = true;
        }
        else {
            document.getElementById( 'topicCompletable' ).checked = false;
        }
    }
}

/**
 * 
 */
function deleteGoal() {
    // double check the user is sure!!
    console.log( "stub to delete goal ");
}

/**
 * 
 */
function addFilter() {
    console.log( "this will add a filter" );
}