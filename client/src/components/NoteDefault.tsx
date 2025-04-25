export default function NoteDefault() {
    return (
      <div className="flex justify-center items-center h-full bg-blue-100 dark:bg-blue-900 p-6 border-2 border-blue-300 dark:border-blue-600">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
            Welcome back! Ready to view or add your notes?
          </h1>
          <p className="text-blue-600 dark:text-blue-400 mb-6">
            Whether you want to revisit your existing notes or create something new, you can do it all here.
          </p>
          <p className="text-blue-500 dark:text-blue-300">
            If you have notes, just click on them to view or edit. Otherwise, press the "Add Note" button to get started.
          </p>
        </div>
      </div>
    );
  }
  