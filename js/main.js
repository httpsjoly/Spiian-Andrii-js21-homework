const notesContainer = document.getElementById('notes-container');
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');

function storageAvailable() {
    try {
        const storage = window.localStorage;
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

function getNotes() {
    const notes = localStorage.getItem('notes');
    if (notes) {
        return JSON.parse(notes);
    }
    return [];
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    notesContainer.innerHTML = '';

    const notes = getNotes();
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        const noteText = document.createElement('span');
        noteText.textContent = note;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editNote(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });

        noteElement.classList.add('note');
        noteElement.appendChild(noteText);
        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);
        notesContainer.appendChild(noteElement);
    });
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        const notes = getNotes();
        notes.push(noteText);
        saveNotes(notes);
        noteInput.value = '';
        displayNotes();
    }
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    displayNotes();
}

function editNote(index) {
    const notes = getNotes();
    const updatedNoteText = prompt('Enter the new entry text:', notes[index]);
    if (updatedNoteText !== null) {
        notes[index] = updatedNoteText.trim();
        saveNotes(notes);
        displayNotes();
    }
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNote();
});

if (storageAvailable()) {
    displayNotes();
} else {
    alert('LocalStorage is not supported by your browser &#1F61F');
}