/**
 * Agora - Close the loop
 * © 2021-2023 Brian Gormanly
 * BSD 3-Clause License
 * see included LICENSE or https://opensource.org/licenses/BSD-3-Clause 
 */

/**
 * Main entry point for the Agora Editor
 */



// get utility functions from modules
import { getWorkspaceUuid } from "./util/editorUtil.js";

// get the state manager
import { initializeWorkspace, setActiveTopicAndResources, debug, addNewTopic, saveActiveTopic, getCurrentActiveTopic, getCurrentWorkspace, saveTextResource } from "./state/stateManager.js";

// get the data models
import { resourceModel } from "./controllers/clientResourceController.js";

// get DOM manipulation functions from modules
import { updateWorkspaceDom, createTopicEditorGui } from "./editorManager.js";
import { saveWorkspace } from "./controllers/clientWorkspaceController.js";





/**
 * window onLoad starts retreval for page render
 */
window.addEventListener( "load", async () => {
    ( debug ) ? console.log( "window load event: start" ) : null;

    // initialize the workspace
    await initializeWorkspace( await getWorkspaceUuid() );

    // retrieve the resources for the active topic, add them to the current state
    if( getCurrentWorkspace().topics && getCurrentWorkspace().topics.length > 0 ) {
        await setActiveTopicAndResources( getCurrentWorkspace().topics[0].topicId );
    }
    else {
        await setActiveTopicAndResources();
    }
    

    //update the workspace information in the GUI
    updateWorkspaceDom();
    
    // render the topics for the workspace
    if( getCurrentWorkspace().topics && getCurrentWorkspace().topics.length > 0 ) {
        createTopicEditorGui();
    }


    /**
     * EVENT:: Event listener for adding a new topic
     */
    const openBtn = document.getElementById( "new-element" );
    if( openBtn ) {
        openBtn.addEventListener( "click", async () => {
            ( debug ) ? console.log( "New Topic: start" ) : null;
            
            let tname = prompt( "Enter a name for your new Topic" );
            //console.log( 'Took input from prompt' );

            await addNewTopic( tname );

            // render the topics for the workspace
            await createTopicEditorGui();

            
            ( debug ) ? console.log( "New topic: complete" ) : null;
        } );
    }

    /**
     * EVENT:: Event listener for saving workspace data
     */
    const workspaceTitle = document.getElementById( "workspace-title" );
    workspaceTitle.addEventListener( "change", async () => {
        ( debug ) ? console.log( "Workspace Title Change: start" ) : null;
        getCurrentWorkspace().workspaceName = workspaceTitle.value;
        await saveWorkspace( getCurrentWorkspace() );
        ( debug ) ? console.log( "Workspace Title Change: complete" ) : null;
    } );

    const workspaceDescription = document.getElementById( "workspace-desc" );
    workspaceDescription.addEventListener( "change", async () => {
        ( debug ) ? console.log( "Workspace Description Change: start" ) : null;
        getCurrentWorkspace().workspaceDescription = workspaceDescription.value;
        await saveWorkspace( getCurrentWorkspace() );
        ( debug ) ? console.log( "Workspace Description Change: complete" ) : null;
    } );


    ( debug ) ? console.log( "window load event: complete" ) : null;
} );



function textEditorUpdateEvent( resourceId, content ) {
    ( debug ) ? console.log( "textEditorUpdate() : Start" ) : null;

    // get the resource from the current state
    let resource = getCurrentActiveTopic().resources.find( resource => resource.resourceId === resourceId );

    saveTextResource( resource, content );

    ( debug ) ? console.log( "textEditorUpdate() : Complete" ) : null;
}


export { textEditorUpdateEvent };


