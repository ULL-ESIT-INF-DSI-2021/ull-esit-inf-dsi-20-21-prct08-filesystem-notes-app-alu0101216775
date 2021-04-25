import {Note} from './Note'
import * as chalk from 'chalk';

export class NoteCollection {
    notes: Note[];

    constructor() {
        this.notes = [];
    }
    public readNotesAndInitialize() {

    }

    public addNote(note: Note) {
        this.notes.push(note);
    }

    public modifyNote(note: string) {
        
    }

    public deleteNote(note: string) {
        
    }

    public listNotes(user: string) {
        let usernotes: Note[] = this.notes.filter(note => note.user === user);
        usernotes.forEach(note => {
            console.log(chalk.keyword(note.color)(note.title));
            console.log(chalk.green("Note exist Successfully!"));
        })
    }

    public readNote(note: string) {

    }
}