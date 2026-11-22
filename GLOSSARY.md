# Desktop

A simulated desktop operating system that presents the portfolio: Apps open in Windows on a desktop, launched from shortcuts, the taskbar, the start menu, or the terminal.

## Language

**App**:
An installed application on the desktop, identified by its label.
_Avoid_: Application, program

**Window**:
An App's single on-screen instance; each App has at most one Window.
_Avoid_: Instance, app (when the on-screen instance is meant)

**Window state**:
Where a Window currently stands: closed, minimized, open, or maximized.
_Avoid_: App state

**Focused Window**:
The one visible Window that receives input and sits above the others.
_Avoid_: Active app

**Window lifecycle**:
The rules that move a Window between Window states and decide which Window is focused.

**Compact mode**:
The layout for viewports 896px (56rem) wide or narrower: every Window renders maximized without changing its Window state, and the taskbar's shortcuts scroll. Decided by width only.
_Avoid_: Mobile mode, mobile view

**Touch input**:
A gesture started by a finger: a tap opens Desktop shortcuts and Files, nothing drags, and no context menu opens. Decided per gesture by pointer type, independent of Compact mode.
_Avoid_: Mobile, touch device

**Folder**:
A directory in the simulated file system, browsed with the file explorer App.
_Avoid_: Directory (in user-facing language)

**File**:
A document in a Folder, opened by the App registered for its extension.

**Desktop shortcut**:
An icon on the desktop that opens an App, a Folder, or a File.
_Avoid_: Icon, shortcut (when the kind is ambiguous)

**Taskbar shortcut**:
An icon on the taskbar for a pinned or running App.
_Avoid_: Icon, shortcut (when the kind is ambiguous)

**Selection**:
The Desktop shortcuts currently highlighted, which open together.

**Sign-in**:
The click on the welcome screen that lets a visitor onto the Desktop; remembered for a week.
_Avoid_: Login, auth

**Start menu**:
The taskbar panel that introduces Haythem at a glance and launches Apps, files, and power actions.

**Lock**:
Going back to the welcome screen while keeping the Sign-in and every Window as it was.

**Restart**:
Closing every Window and forgetting the Sign-in, so the welcome screen greets a first visit again.
_Avoid_: Sign out, reboot

**Locale**:
The language the Desktop speaks, chosen from the theme menu or the terminal; it decides every translated text and date format.
_Avoid_: Language, i18n
