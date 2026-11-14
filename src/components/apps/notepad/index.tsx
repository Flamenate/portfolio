export function Notepad() {
  return (
    <div
      className="h-full w-full overflow-auto bg-(--white) p-2 outline-none select-text dark:bg-background dark:text-(--white)"
      contentEditable
    >
      <p>Write to your heart's content... none of it will be saved.</p>
    </div>
  )
}
