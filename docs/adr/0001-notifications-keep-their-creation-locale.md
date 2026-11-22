# Notifications keep the Locale they were created in

A notification toast renders its text once, in the Locale active when it was raised (`createLocale(useThemeStore.getState().locale)` in `src/lib/toast.tsx`). Switching the Locale while a toast is on screen does not re-render it. This is deliberate: a notification is a record of something that already happened, so it keeps the wording it was announced with, much like a real OS notification.

## Considered options

- **Reactive toast** (render a React element that subscribes to the Locale): rejected; the visible notification would change language under the reader.
