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

**Folder**:
A directory in the simulated file system, browsed with the file explorer App.
_Avoid_: Directory (in user-facing language)

**Desktop shortcut**:
An icon on the desktop that opens an App or a Folder.
_Avoid_: Icon, shortcut (when the kind is ambiguous)

**Taskbar shortcut**:
An icon on the taskbar for a pinned or running App.
_Avoid_: Icon, shortcut (when the kind is ambiguous)

**Selection**:
The Desktop shortcuts currently highlighted, which open together.

**Sign-in**:
The click on the welcome screen that lets a visitor onto the Desktop; remembered for a week.
_Avoid_: Login, auth
