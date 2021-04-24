import {ProgramFlowHandler} from './ProgramFlowHandler'
import {Note} from './Note'
import {NoteCollection} from './NoteCollection'

import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as fs from 'fs';

export function InitializeYargsCommands(workflow: ProgramFlowHandler): void {
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
          title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
          },
          body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
          },
          user: {
            describe: 'Uer who owns the note',
            demandOption: true,
            type: 'string',
          },
          color: {
            describe: 'Note color',
            demandOption: false,
            type: 'string',
          },
        },
        handler(argv) {
          //Comprueba que los argumentos requeridos sean del tipo correcto
            if (typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.user === 'string') {
                try {
                    let noteToAdd: Note;
                    //Retira caracteres especiales del titulo para evitar problemas con el sistema de ficheros, y genera el nombre del fichero en formato json
                    let filename: string = argv.title.replace(/[&\/\\#,+()$~%.'":*?<>{}!¡¿]/g, '') + '.json';
                    //Genera la ruta de la nota, usando su usuario y su nombre de fichero
                    let noteRoute: string = `notes/${argv.user}/${filename}`;
                    //Comprueba si se ha pasado el parámetro no requerido "color". Si no es así, se establece el blanco por defecto
                    if(typeof argv.color === 'string') noteToAdd = new Note(argv.title, argv.body, argv.user, argv.color, noteRoute);
                    else noteToAdd = new Note(argv.title, argv.body, argv.user, "white", noteRoute);
                    //Añade la nota desde el gestor del flujo de trabajo
                    workflow.addNote(noteToAdd);
                    console.log(chalk.green("Note Added Successfully!"));
                } catch(err) {
                   console.error(chalk.red("Something went wrong. It was not possible to add the new note."));
                }
            }
            
        },
      }).parse();
}