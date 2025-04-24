// src/redux/slices/notesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  _id:string
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = notesSlice.actions;
export default notesSlice.reducer;
