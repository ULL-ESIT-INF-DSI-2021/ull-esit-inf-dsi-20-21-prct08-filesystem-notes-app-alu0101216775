import "mocha";
import {expect} from 'chai';
import {ProgramFlowHandler} from '../src/ProgramFlowHandler'
import {Note} from '../src/Note'

describe('Tests', () => {
    it('Test', () => {
        expect(0).to.be.eql(0);
    });
});

describe('Note tests', () => {
    it('Note initializes properly', () => {
        let note: Note = new Note("Blue note", "I am blue", "Miguel", "Blue", "../notes/miguel/BlueNote.json");
        expect(note.title).to.be.eql("Blue note");
    });
    it('Note setTitle works properly', () => {
        let note: Note = new Note("Blue note", "I am blue", "Miguel", "Blue", "../notes/miguel/BlueNote.json");
        note.setTitle("Red note");
        expect(note.title).to.be.eql("Red note");
    });
});