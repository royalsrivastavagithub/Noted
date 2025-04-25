import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { clearUserInfo } from "@/redux/infoSlice";
import { useState } from "react";
import NoteDefault from "@/components/NoteDefault";
import NoteViewer from "@/components/NoteViewer";
import { Note } from "@/redux/notesSlice"; // adjust import based on your Note type location
import { setNotes } from "@/redux/notesSlice";
import axios from "axios";
import NoteAdd from "./NoteAdd";
import NoteEdit from "./NoteEdit";

type NoteViewState = "default" | "viewing" | "editing" | "adding";

export function AppSidebar() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const username = useSelector((state: RootState) => state.info.username);
  const [viewState, setViewState] = useState<NoteViewState>("default");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const token = useSelector((state: RootState) => state.info.token);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserInfo());
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setActiveNoteId(note._id); //
    setViewState("viewing");
  };
  //edit
  const handleEdit = (note: Note) => {
    console.log("function handleedit");
    console.log(note);
    setSelectedNote(note); // So NoteEdit can receive it (if needed)
    setViewState("editing"); // <- This is what you forgot
    setTimeout(() => {
      console.log("Current viewState after editing:", viewState);
    }, 100);
  };
  //delete
  function handleDelete(note: Note) {
    const deleteNote = async () => {
      try {
        console.log("Note to delete:", note);
        console.log("Note ID:", note._id);

        // Delete the note
        const res = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/notes/delete/${note._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          throw new Error("Failed to delete the note");
        }

        // Fetch updated notes
        const notesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setNotes(notesResponse.data.notes));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
      setViewState("default");
    };

    deleteNote();
  }
  function handleNoteAdd() {
    setViewState("adding");
  }
  return (
    <>
      <div>
        <Sidebar className="lg:flex lg:w-64 lg:h-screen fixed">
          <SidebarHeader>
            <div className="p-4 gap-4 flex items-center justify-between">
              <div className="rounded-xs text-white font-bold bg-blue-600 p-2 flex-1 flex items-center justify-center">
                NOTED
              </div>
              <ModeToggle />
            </div>

            <div className="bg-blue-600 dark:bg-blue-800 rounded-xs p-2 flex items-center justify-between">
              <div className="rounded-xs text-white dark:text-white font-bold flex-1 flex items-center justify-center">
                {username}
              </div>
              <div className="rounded-xs text-white font-bold pr-2">
                <Button
                  className="bg-red-500 hover:bg-red-400"
                  onClick={handleLogout}
                  variant="default"
                >
                  {/* logout icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            <hr className="bg-gray-500" />
            <div>
              <Button
                className="flex-1 w-full 
             p-5 rounded-xs"
                onClick={handleNoteAdd}
              >
                Add Note
              </Button>
            </div>
            <hr className="bg-gray-500" />
            <div
              id="notes"
              className="overflow-y-scroll h-screen pr-2 space-y-2"
            >
              {notes.map((note) => (
                <div
                  key={note._id}
                  className={`flex rounded-md pr-4 mb-2 
        ${
          activeNoteId === note._id
            ? "bg-blue-600 text-white" // Active note style
            : "bg-blue-300 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-800"
        }`}
                >
                  <button
                    onClick={() => handleNoteClick(note)}
                    className="flex truncate w-full text-left p-3"
                  >
                    <div className="truncate">{note.title}</div>
                    <div className="ml-auto hover:bg-gray-800">
                      {/* Conditionally render DropdownMenu only when the note is active */}
                      {activeNoteId === note._id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(note);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(note);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>

          <SidebarFooter />
        </Sidebar>

        <SidebarTrigger className="w-[25px] h-[25px] bg-blue-600 hover:bg-blue-300" />
      </div>

      <div id="note_content" className="screen-h w-screen">
        {
          {
            default: <NoteDefault />,
            viewing: <NoteViewer note={selectedNote} />,
            editing: <NoteEdit note={selectedNote !} setViewState={setViewState} />
            ,
            adding: <NoteAdd setViewState={setViewState} />,
          }[viewState]
        }
      </div>
    </>
  );
}
