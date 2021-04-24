import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as fs from 'fs';

import {Note} from './Note'
import {NoteCollection} from './NoteCollection'

export class ProgramFlowHandler {
    notes: NoteCollection;

    constructor() {
        this.notes = new NoteCollection();
        this.notes.readNotesAndInitialize();
    }

    /**
     * Añade una nota si no existe.
     * 1. Comprueba que exista el directorio del usuario. Si no es así, lo crea.
     * 2. Almacena la nota como JSON en el fichero correspondiente
     * 3. Guarda la nota en la lista de notas en memoria.
     * @param note 
     */
    addNote(note: Note) {
        try {
            this.checkUserDirectory(note.user);
            fs.writeFile(note.route, this.noteToJSON(note), () => {
                console.log('tmp.json has just been created');
              });
              this.notes.addNote(note);
        } catch {
            console.error(chalk.red("Something went wrong. It was not possible to write the new note."));
        }
    }

    /**
     * Modifica una nota, si existe.
     * @param note 
     */
    modifyNote(note: string) {
        this.notes.modifyNote(note);
    }

    /**
     * Elimina una nota, si existe.
     * @param note 
     */
    deleteNote(note: string) {
        this.notes.deleteNote(note);
    }

    /**
     * Muestra todas las notas
     */
    listNotes() {
        this.notes.listNotes();
    }

    /**
     * Lee una nota, si existe.
     * @param note 
     */
    readNote(note: string) {
        this.notes.readNote(note);
    }

    /**
     * Convierte una nota a formato JSON
     * @param note 
     */
    noteToJSON(note: Note): string {
        return JSON.stringify(note);
    }

    /**
     * Convierte una nota en JSON a objeto de la clase Note
     * @param jsonnote 
     */
    JSONtoNote(jsonnote: string): Note {
        return JSON.parse(jsonnote);
    }

    /**
     * Comprueba si existe un directorio para dicho usuario. Si no es así, lo crea para poder almacenar la nota con writeFile
     * @param username Nombre del usuario que escribio la nota
     */
    checkUserDirectory(username: string) {
        let userDir: string = `notes/${username}`;
        if (!fs.existsSync(userDir)){
            fs.mkdirSync(userDir);
        }
    }
}
