import {ProgramFlowHandler} from './ProgramFlowHandler'
import {InitializeYargsCommands} from './initializeYargs'

let workflow: ProgramFlowHandler = new ProgramFlowHandler();
InitializeYargsCommands(workflow);

