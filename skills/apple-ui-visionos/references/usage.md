# visionOS: where, when, why, how each component

Names match the kit index in `components.md`. Rules are checked against Apple's Human Interface Guidelines (HIG) on 2026-10-29. Items marked **(unchecked)** are not verified: the HIG page returned 404 or only secondary sources were found.

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Window (glass) | The room, in front of the user | 2D content such as a document or media | Glass blends with the room; the user moves windows freely | `WindowGroup`, `.glassBackgroundEffect()` for custom panels | Custom window frames or controls; opaque backgrounds behind window chrome |
| Volume | Inside the room, 3D content | 3D content that people view from several angles | Content works from every angle | `WindowGroup` with a volumetric style **(unchecked: API)** | 2D content placed where it only reads from one angle; to pin 2D content to a 3D area, use an attachment |
| Ornament | Attached to a window's edge | Controls that people need often, in a consistent place | Predictable location close to the window | `.ornament(attachmentAnchor:)`; toolbar placement `.bottomOrnament` | Ornaments wider than their window; many ornaments that compete with the content; hiding them during normal use |
| Tab Bar | Leading side, vertical, fixed relative to the window | Sections of the app. Each tab needs a symbol and a short label | Navigation next to the content; the system reveals labels when people look | `TabView` with `Tab`; the system draws it as an ornament | Tabs for actions; long labels |
| Toolbar | Bottom ornament | A row of common actions for the window | One consistent row | `.toolbar { ToolbarItem(placement: .bottomOrnament) }` | Long toolbars |
| Navigation Bar | Top of a window | Title and back navigation | Standard flow | `NavigationStack`, `.navigationTitle`, toolbar items | Large custom headers |
| Sidebar | Within a window | Secondary navigation inside a tab | Keeps the hierarchy visible | `NavigationSplitView` with `List` | Selections in the sidebar that change the open tab |
| Button, Text (glass) | Anywhere | Trigger one action | Default glass style matches the system | `Button`; `.buttonBorderShape`, `.buttonStyle` | Buttons without hover feedback |
| Button, custom | Custom controls | A control the system does not cover | Keeps gaze and pinch feedback | `.hoverEffect(.highlight)` and `.contentShape(.hoverEffect, shape)` | Targets under 60 x 60 pt; centers closer than 60 pt apart; no 4 pt padding around buttons 60 pt or larger; small buttons in a row or stack |
| Link | Inline in text **(unchecked: HIG page 404)** | Open a URL | Standard | `Link` | Links that look like buttons **(unchecked)** |
| Drop Down Button | Forms, toolbars | A menu of choices | Compact choice | `Menu`; `Picker` with `.pickerStyle(.menu)` | Menus taller than the window |
| Context Menu | Long pinch on an item | Actions on one item; most-used items first | Fast, out of the way | `.contextMenu` | Menus taller than the window (they can cover the system controls above and below it); more than about three groups |
| Alert | Centered in front of the user | One critical decision | Gets attention | `.alert`, `.confirmationDialog` | Routine information |
| Segmented Control | In a window | A few views of the same content | Shows all options | `Picker` with `.pickerStyle(.segmented)` | Navigation between sections |
| Toggle | In a list or form | Two opposing values | Immediate state | `Toggle` | Choosing from a list (use a menu) |
| Checkbox | In a list or form | Independent choices | Visible multi-select | No system checkbox style; build with `Button` and `checkmark.square`, mark `.accessibilityAddTraits(.isToggle)` | Using a toggle where a checkbox is expected |
| Slider | Controls area | A value on a range | Continuous feedback | `Slider` | Minimum not on the leading side, maximum not on the trailing side |
| Text Field, Search Field, Secure Field | Forms, search | Enter text | System keyboard and input | `TextField`, `.searchable`, `SecureField` | Placeholder as the only label **(unchecked for visionOS)** |
| Date and time picker | Forms | Choose a date or time | Familiar control | `DatePicker` | Custom calendars **(unchecked)** |
| Page Control | Below paged content | Position in an ordered set of pages | Shows where the user is | `TabView` with `.tabViewStyle(.page)` | More than about 10 pages; hierarchical navigation (use a sidebar) |
| List, Row, Section Header | Content | Rows of text | Lists and tables suit text | `List`, `Section`, `.swipeActions` | Dense rows of long text |
| Menu, Context Menu | Anywhere | A set of actions | Compact | `Menu`, `.contextMenu` | Menus taller than the window |
| Share Sheet | Share an item | Send content to others or collaborate | System behavior and familiar sharing | `ShareLink`; the Share button in a toolbar or ornament | Duplicate system actions; a custom share UI that replaces the system one |
| SharePlay | Shared activity | Start or join a shared activity | System-managed sessions | GroupActivities (`GroupActivity`, `GroupSession`); spatial templates for stages | Pairing "SharePlay" with an adjective; UI that lets one person take control of a shared object while others wait (let people speak or gesture for a turn) |
| Progress Indicator | Work in progress | Known or unknown duration | Shows activity | `ProgressView` | Spinners for long, known work **(unchecked)** |
| Tooltip | Looking at or pointing at one element | Explain an element that is not self-explanatory | Brief help without clutter | `.help("text")` | More than 60 to 75 characters; naming the element again |
| Empty state | Empty content **(unchecked: HIG page 404)** | No items | Explain and offer next step | `ContentUnavailableView` | Blank windows |
| Background | Immersive space | Environment for an immersive experience | Context | `ImmersiveSpace` with a RealityKit environment | Backgrounds in plain windows **(unchecked)** |
| Window Controls | Window chrome | Close, resize, share status | System-drawn | Configure with `.windowResizability`, `.defaultWindowPlacement` | Drawing your own controls |

## Do not build

- Window close, resize and SharePlay status: system-drawn.
- Privacy indicator: system-drawn. Do not hide or imitate it.
- Gesture diagrams from the Gestures page: reference for design reviews, not UI to implement.

## Gotchas

- Do not place pure white or opaque dark panels behind text. Contrast changes with the live background. Use the glass material and system label colors.
- Put spacing between adjacent targets so gaze lands on one control: centers at least 60 pt apart, or a margin of at least 16 pt around each item.
- Keep content at least one meter away for comfortable reading over time.
- Avoid a repeating pattern or texture that fills the field of view; eyes can lock onto it and make elements look like different depths.
- Every custom control needs a hover state (Idle, Hover, Hover + Dwell, Pinch are the kit's states).
- Text is bolder and larger than on iPhone. Use system text styles.
- Screen sharing streams the window in the Shared Space; moving the app to a Full Space pauses the stream for other people.
