import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../redux/notesSlice"; // Import the action for setting notes
import { RootState } from "../redux/store"; // Adjust the import based on your store file

interface NoteAddProps {
  setViewState: React.Dispatch<
    React.SetStateAction<"default" | "viewing" | "editing" | "adding">
  >;
}

export default function NoteAdd({ setViewState }: NoteAddProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(""); // Error state

  const dispatch = useDispatch();

  // Get the token from the Redux store
  const token = useSelector((state: RootState) => state.info.token); // Access token from infoSlice

  // Handle title change with proper typing for event
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 100) {
      setTitle(e.target.value);
    }
  };

  // Handle content change with proper typing for event
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1000) {
      setContent(e.target.value);
    }
  };

  // Handle save functionality
  const handleSave = async () => {
    if (title && content) {
      setIsSaving(true);
      setError(""); // Reset error state on save attempt

      try {
        // Call the API to save the note
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/notes/add`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token from Redux store
            },
          }
        );
     
        // If the note was successfully added, update the view state to default
        if (response.status === 201) {
          setViewState("default");

          // Fetch updated notes and dispatch them to the Redux store
          const notesResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/notes`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use token from Redux store
              },
            }
          );
      
          // Dispatch the notes to the Redux store
          dispatch(setNotes(notesResponse.data.notes));
        }
      } catch (err: unknown) {
        // Handle the error in a way that prevents the ESLint warning
        setError("Failed to save note. Please try again.");

        // Optionally log the error for debugging
        if (err instanceof Error) {
          console.error(err.message);
        }
      } finally {
        setIsSaving(false);
      }
    }
  };
  function handleDefault() {
    setViewState("default");
  }

return (
  <div className="note-add-container flex flex-col h-full space-y-4 bg-blue-100 p-6 rounded-xl shadow-md dark:bg-black">
    {/* Title input */}
    <div className="input-group">
      <div className="relative">
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter note title"
          maxLength={100}
          className="w-full p-3 pr-20 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-black dark:text-white dark:border-blue-900"
        />
        <p className="absolute right-2 bottom-2 text-sm text-blue-600 dark:text-blue-400">
          {title.length}/100
        </p>
      </div>
    </div>

    {/* Content input (grows to fill space) */}
    <div className="relative flex-grow flex flex-col">
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
        placeholder="Enter note content"
        maxLength={1000}
        className="w-full h-full p-3 pr-20 pb-8 border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-black dark:text-white dark:border-blue-900"
      />
      <p className="absolute right-2 bottom-2 text-sm text-blue-600 dark:text-blue-400">
        {content.length}/1000
      </p>
    </div>
<div className="flex gap-2">
    {/* Save button */}
    <button
          
          onClick={handleDefault}
          disabled={isSaving}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 dark:bg-red-800 dark:hover:bg-red-700"
        >
          {"Cancel"}
        </button>
        

    <button
      onClick={handleSave}
      disabled={!title || !content || isSaving}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-800 dark:hover:bg-blue-700"
    >
      {isSaving ? "Saving..." : "Save Note"}
    </button>
    </div>
    {/* Display error message if any */}
    {error && (
      <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
    )}
  </div>
);

}
