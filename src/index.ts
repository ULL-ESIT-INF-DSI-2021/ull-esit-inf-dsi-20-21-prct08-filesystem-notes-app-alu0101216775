import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as fs from 'fs';

import {Note} from './Note'
import {ProgramFlowHandler} from './ProgramFlowHandler'
import {InitializeYargsCommands} from './initializeYargs'

let workflow: ProgramFlowHandler = new ProgramFlowHandler();
InitializeYargsCommands(workflow);

