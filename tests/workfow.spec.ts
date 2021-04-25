import "mocha";
import * as sinon from "sinon"
import * as chalk from 'chalk';
import {expect} from 'chai';
import {ProgramFlowHandler} from '../src/ProgramFlowHandler'
import {Note} from '../src/Note'

import * as fs from 'fs';

let workflow: ProgramFlowHandler = new ProgramFlowHandler();
let note2: Note = new Note("Note2", "Note2 body", "adrianglez", "blue", "./notes/adrianglez/note2.json");
let note3: Note = new Note("Note3", "Note3 body", "adrianglez", "red", "./notes/adrianglez/note3.json");

describe("addNote()", function() {
    it("should add notes", function(done) {
        this.timeout(500);
        let note: Note = new Note("Blue note", "I am blue", "Miguel", "Blue", "./notes/Miguel/BlueNote.json");
        workflow.addNote(note);
        workflow.addNote(note2);
        workflow.addNote(note3);
        setTimeout(function() {
            expect(fs.existsSync(note.getRoute())).to.be.equal(true);
            done();
        }, 450);
    });
});

describe("deleteNote()", function() {
    it("should remove notes", function(done) {
        this.timeout(1000);
        let note: Note = new Note("Blue note", "I am blue", "Miguel", "Blue", "./notes/Miguel/BlueNote.json");
        workflow.deleteNote(note.getRoute());
        setTimeout(function() {
            expect(fs.existsSync(note.getRoute())).to.be.equal(false);
            done();
        }, 500);
    });
});

describe("modifyNote() color", function() {
    it("should modify notes, Note should be green", function(done) {
        this.timeout(1500);
        let spy = sinon.spy(console, 'log');
        workflow.modifyNote(note3.getRoute(), "", "", "green");
        setTimeout(function() {
            expect(spy.calledWith(chalk.green("Color changed"))).to.be.equal(true);
            spy.restore();
            done();
        }, 1300);
    });
});

describe("modifyNote() title", function() {
    it("should modify notes, title should change and old route disapear", function(done) {
        this.timeout(1500);
        workflow.modifyNote(note3.getRoute(), "note4", "", "");
        let newROute: string = `notes/${note3.getUser()}/note4.json`;
        setTimeout(function() {
            expect(fs.existsSync(note3.getRoute())).to.be.equal(false);
            expect(fs.existsSync(newROute)).to.be.equal(true);
            done();
        }, 1300);
    });
});

describe("listNote()", function() {
    it("should not show any console.error", function(done) {
        let spy = sinon.spy(console, 'error');
        workflow.listNotes(note2.getUser());
        setTimeout(function() {
            expect(spy.calledWith(chalk.red("This user does not have any note created.")) && spy.calledWith(chalk.red("There was an error reading this user files."))).to.be.false;
            spy.restore();
            done();
        }, 500);
    });
});

describe("readNote()", function() {
    it("should not show any console.error", function(done) {
        let spy = sinon.spy(console, 'error');
        workflow.readNote(note2.getRoute());
        setTimeout(function() {
            expect(spy.calledWith(chalk.red("Something went wrong. It was not possible to remove the note.")) && spy.calledWith(chalk.red("This note does not exist. Try another title or create that note."))).to.be.false;
            spy.restore();
            done();
        }, 500);
    });
});

describe("checkIfFileExist()", () => {
    it("should check if notes exist", () => {
        expect(workflow.checkIfFileExist(note2.getRoute())).to.be.equal(true);
    });
});

describe("JSON tests", () => {
    it("Note to JSON works", () => {
        expect(workflow.noteToJSON(note2)).to.be.equal('{"title":"Note2","route":"./notes/adrianglez/note2.json","body":"Note2 body","color":"blue","user":"adrianglez"}');
    });
    it("JSON to Note works", () => {
        let aux: string = workflow.noteToJSON(note2);
        expect(workflow.JSONtoNote(aux)).to.be.eql(note2);
    });
})