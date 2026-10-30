# macOS: where, when, why, how each component

Names match the kit index in `components.md`. Rules are checked against Apple's Human Interface Guidelines (HIG) on 2026-10-29. Items marked **(unchecked)** are not verified: the HIG page returned 404 or only secondary sources were found.

## Windows and chrome

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Window | Desktop | The main workspace for a document or task | The unit users arrange and switch between | `WindowGroup`, `Window`; `.windowResizability`; `NSWindow` | Opening a new window by default. Offer it as an option (context menu or File menu) instead |
| Utility Panel | Floats above a window | Inspector-style tools that stay visible while editing | Keeps tools available without a modal block | `NSPanel`; `Window` with a utility style | Modal panels for ordinary tools |
| Toolbar and Titlebar | Titlebar, Liquid Glass | Frequent actions and view controls for the window | Actions near the title; the system handles glass | `.toolbar { ToolbarItemGroup }`, `ControlGroup` for button groups, `.toolbarRole`; `NSToolbar` | More than about three item groups; overcrowding (define which items move to overflow as the window narrows) |
| Toolbar Search | Trailing end of the toolbar | Find within the window | Always visible | `.searchable` | A custom field that ignores the system field |
| Sidebar | Leading column | Top-level sections of the app | Persistent navigation for a document or library | `NavigationSplitView` with `List` and `.listStyle(.sidebar)` | Deep hierarchies in one flat list (use disclosure controls; one disclosure button per view) |
| Menu Bar | Top of the screen | Every command the app has | Users look here first for commands | `.commands { CommandMenu }`; `MenuBarExtra` for a status item | Commands that exist only as buttons |
| Dock | Bottom of the screen | App presence, badges, progress | System surface | `NSApp.dockTile` | Drawing your own dock icon |
| Settings window | Opened from the App menu | App-wide preferences | Users expect the App menu entry | `Settings { }` scene | A Settings button in the window toolbar; a customizable toolbar (use a fixed one that shows the active area) |

## Presentation

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Sheet | Attached to a window | A task tied to the current window | Stays with its parent; dismissable | `.sheet(isPresented:)` | Sheets that block unrelated windows; an unreasonable default size (choose a size that fits the content; allow resizing when people need a clearer view) |
| Popover | Anchored to a control | A small amount of functionality for a few related tasks | The arrow shows the link | `.popover(isPresented:arrowEdge:)` | Long forms; covering the element that revealed it |
| Alert | Over the window | One critical decision or an error | Gets attention | `.alert`, `.confirmationDialog`; `NSAlert` | Information-only messages; confirmations for common undoable actions |
| Open and save dialogs | System panel **(unchecked: HIG page 404)** | Choose a file location | System behavior and sandboxing | `.fileImporter`, `.fileExporter`; `NSOpenPanel`, `NSSavePanel` | Custom file pickers **(unchecked)** |
| Tooltip (help tag) | Pointer hover over one control | Explain what an icon-only control does | Labels without visual clutter | `.help("text")` | Naming the control again; more than 60 to 75 characters; a required message that appears only on hover; a tooltip for a whole task (describe only the control) |
| Context menu | Right-click or control-click | Actions on a selected item | Fast access where the user is working | `.contextMenu` | The only route to an action; more than about three groups; frequently used items far from where the press starts |

## Input and selection

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Push Button, Default / Preferred | Dialog and sheet footers | The main action that Return triggers | One clear default | `Button` with `.keyboardShortcut(.defaultAction)` and `.buttonStyle(.borderedProminent)`; `NSButton` `keyEquivalent = "\r"` | Two default buttons in one dialog |
| Push Button, Bordered (Neutral) | Toolbars, forms | Other actions | Quiet and standard | `.buttonStyle(.bordered)` | Recoloring for effect |
| Push Button, Bordered Colored | Feature actions | A branded action | Tint signals purpose | `.buttonStyle(.borderedProminent)` with `.tint(color)` | Many colored buttons in one area |
| Push Button, Bordered Destructive | Delete and remove actions | Irreversible or risky actions | Red warns the user | `Button(role: .destructive)` with `.bordered` | Destructive actions as the default button |
| Push Button, Borderless | Inline or table actions | Low-emphasis actions | Does not compete with content | `.buttonStyle(.borderless)` | Hit targets that are too small **(unchecked: macOS size)** |
| Checkbox | Forms, lists | Several independent on or off choices | One control per option | `Toggle` with `.toggleStyle(.checkbox)` | Checkboxes for one exclusive choice |
| Radio Button | Forms | One choice from a few, all visible | Shows all options | `Picker` with `.pickerStyle(.radioGroup)` | More than about five options (use a pop-up button) |
| Switch | Settings | Two opposing values that take effect right away | Matches System Settings | `Toggle` with `.toggleStyle(.switch)` | A list of choices (use a pop-up button) |
| Pop-Up Button | Forms, toolbars | One value from a flat list of mutually exclusive options | Compact selection; a useful default is shown | `Picker` with `.pickerStyle(.menu)`; `NSPopUpButton` | Commands (use a pull-down button) |
| Pulldown Button | Toolbars, views | Commands directly related to the button | Keeps the menu tied to its target | `Menu`; `NSPopUpButton` with `pullsDown = true` | All of a view's actions in one pull-down; fewer than about three items |
| Segmented Control | Toolbar or above content | Views of the same content, about five to seven segments in a wide interface | Shows all options | `Picker` with `.pickerStyle(.segmented)` | Navigation between sections; more segments than that. The kit allows up to eight; HIG advises fewer |
| Slider | Settings, tools | A value on a range | Continuous feedback | `Slider`; `NSSlider` for circular **(unchecked: circular)** | Minimum not on the leading side, maximum not on the trailing side |
| Stepper | Forms | Integer change | Precise small changes | `Stepper` | Large value changes without a field to enter the value |
| Text Field | Forms | A small amount of information | Standard field | `TextField` | Placeholder as the only label |
| Search Field | Toolbar or list header | Find items | Standard search | `.searchable`; `NSSearchField` | Waiting for Return when results can update as people type; a placeholder that does not say what is searched |
| Color Well | Inspectors, settings | Choose a color | System color picker, which people can reuse across apps | `ColorPicker` | A custom color UI when the system picker works |
| Image Well | Forms | Drop, copy or paste an image | Editable image view with drag and drop | `.dropDestination`; `NSImageView` with `isEditable` | Clearing a required image without restoring the default image; hiding standard copy and paste commands |
| Combo Box | Forms with suggestions | Type a custom value or pick from likely choices | Combines typing and choosing; custom values are not added to the list | `NSComboBox` through `NSViewRepresentable` (no SwiftUI equivalent) | Default value that is empty when a list default would help; list items wider than the field (they truncate) |

## Content and status

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Table | Main content for lists of records | Sortable, multi-column data; text rows | Rows suit text that is easy to scan | `Table` with `TableColumn`; `.alternatingRowBackgrounds()` | Large images or varied row sizes (use a collection); long text per row |
| List (Sidebar style) | Sidebar | Navigation | Native sidebar behavior | `List` with `.listStyle(.sidebar)` | Plain lists for navigation |
| Box (Group Box) | Forms and inspectors | Group related controls | Visual separation of a group | `GroupBox` | Boxes that fill most of the window; nested boxes (use padding and alignment for subgroups); a title that ends in punctuation (use a colon only in a settings pane) |
| Form | Settings and forms **(unchecked: HIG page 404)** | Labeled controls | Mac label alignment | `Form` with `.formStyle(.grouped)` | Custom label layouts **(unchecked)** |
| Progress indicator | Work in progress | Background work, or where space is limited: spinner. Known progress: bar | Spinners are small and unobtrusive | `ProgressView` | A label on a spinner (usually unneeded); switching between spinner and bar for one task |
| Notification | Notification Center | Time-sensitive updates | User chooses when to read | UserNotifications | Several notifications for the same thing; errors (use an alert) |

## Do not build

- Traffic-light window controls and the Menu Bar: system-drawn.
- Desktop wallpaper, Menu Bar template and the Dock: system surfaces. Mock-ups only.
- Pointer shapes: system cursors. Use `NSCursor` only for a custom canvas tool **(unchecked)**.

## Gotchas

- Use sidebars and toolbars for app-level navigation. Tab views are for closely related panes, and panes must be self-contained.
- Use `.controlSize` and `.tint` for variants; do not recolor controls to fake them.
- Inactive windows turn accent fills neutral automatically. Do not hand-draw that state.
- Keyboard shortcuts: Command as the main modifier, Shift as a secondary modifier for a related command, Option sparingly, and avoid Control (the system uses it).
- Avoid nesting scroll views with the same orientation.
