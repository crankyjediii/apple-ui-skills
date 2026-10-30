# iOS and iPadOS: where, when, why, how each component

Names match the kit index in `components.md`. Rules are checked against Apple's Human Interface Guidelines (HIG) on 2026-10-29. Items marked **(unchecked)** are not verified: the HIG page returned 404 or only secondary sources were found.

## Navigation and chrome

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Tab Bar | Bottom, floats in iOS 26 and can minimize on scroll | Sections of the app. Use the fewest tabs that fit the hierarchy | Navigation, not actions. Stays visible so people know where they are | `TabView`, `Tab`; `Tab(role: .search)` for a separate search tab; `.tabBarMinimizeBehavior(.onScrollDown)` | Tabs for actions; overflow ("More") tab; hiding or disabling tab buttons when a section is empty (explain the empty state instead) |
| Toolbar, top | Top of a screen, in the navigation bar | Title and actions for the current screen | Keeps actions near the title | `.navigationTitle`, `.toolbarTitleDisplayMode(.large / .inline)`, `ToolbarItem(placement: .topBarTrailing)` | More than about three item groups; overcrowding (define what moves to overflow as width shrinks) |
| Toolbar, bottom | Bottom bar above the tab bar or in a sheet | Frequent actions on the current content, or search | Thumb reach | `ToolbarItemGroup(placement: .bottomBar)`; `DefaultToolbarItem(kind: .search, placement: .bottomBar)` | Actions that belong in the top bar |
| Sidebar | iPad, and Mac-style layouts | Top-level navigation on a wide screen | Sections stay visible while viewing content | `NavigationSplitView`; `.listStyle(.sidebar)` | Deep hierarchies in one flat list (use disclosure controls; one disclosure button per view) |
| Scroll edge effect | Where content meets the top or bottom bar **(unchecked: API names)** | Content scrolls under glass chrome | Separates content from controls | `.scrollEdgeEffectStyle(.soft / .hard, for: .top)` | Hard-coded dividers |

## Presentation

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Sheet | Slides up over the current screen | A brief, occasional task that can be dismissed | Users keep their context and can leave | `.sheet` with `.presentationDetents([.medium, .large])` | Showing Cancel, Done and Back together; sheets used to navigate app content |
| Full Screen sheet | Covers everything | A required or immersive task | No context needed | `.fullScreenCover` | Casual detail views |
| Inspector | iPad side panel **(unchecked: HIG page 404)** | Editing properties of the selected item | Stays visible next to the content | `.inspector` | Inspector on iPhone **(unchecked)** |
| Popover | Anchored to a control, iPad only | A small amount of functionality for a few related tasks | Arrow shows the link to the control | `.popover(isPresented:attachmentAnchor:arrowEdge:)`; `.presentationCompactAdaptation(.popover)` keeps it on iPhone | Large popovers; popovers that cover the element that revealed them |
| Alert | Centered over the screen | One critical decision or an error | Gets attention | `.alert(_:isPresented:actions:message:)` | Information-only messages; confirmations for common undoable actions |
| Action sheet | Bottom of screen (iPhone), anchored (iPad) | A choice among several actions, related to the current context | Groups the options | `.confirmationDialog` | A simple yes or no; destructive buttons not at the top with the destructive style |
| Context menu | Long press on an item | Secondary actions for one item | Fast without cluttering the screen | `.contextMenu`; `role: .destructive` | The only route to a key action; more than about three groups; frequently used items far from where the press starts |
| Menu (pull-down) | From a button in a toolbar | Commands related to the button | One entry point for commands | `Menu`; nested `Menu` for submenus | Long menus (split them); submenus deeper than one level or longer than about five items |
| Edit menu | Text selection | Cut, copy, paste, format text | System behavior | Add custom commands with `UIEditMenuInteraction` **(unchecked: API)** | Commands that do not apply to the selection (remove or dim them); custom commands listed away from the related system commands; controls that duplicate edit menu items |
| Share sheet (activity view) | Opened from the Share button | Send content or run an action on it | People expect the system Share button | `ShareLink`; app-specific actions through extensions | A duplicate of a system action such as Print; a custom action title that is not specific; a modal view on top of a share extension |

## Input and selection

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Button | Anywhere | Trigger one action | Clear affordance; hit region at least 44 x 44 pt | `Button` with `.buttonStyle(.borderedProminent)` for the preferred choice, `.bordered` for others, `.borderless` for tertiary | Buttons of different sizes side by side to show preference. Use style, not size, to mark the preferred choice |
| Button, Liquid Glass | Floating over content | Controls over media or a map | Glass keeps content visible | `.buttonStyle(.glass)` or `.glassProminent`; `.tint` only for the primary action | Glass stacked on glass; glass in the content layer |
| Segmented control | Above content | A few views of the same content (about five or fewer on iPhone) | All options visible at once | `Picker` with `.pickerStyle(.segmented)` | Navigation between unrelated screens; too many segments |
| Pop-up button | Inside a form | One value from a flat list of mutually exclusive options | Saves space; a useful default is shown | `Picker` with `.pickerStyle(.menu)` | Commands (use a pull-down); two-option choices (use segmented) |
| Pull-down button | Toolbar or view | Commands related to the button's target | Keeps the menu tied to its target | `Menu` | Every action in a view inside one pull-down; fewer than about three items |
| Toggle | In a list or form | Two opposing values that take effect right away | Clear on or off state; not color alone | `Toggle` | A list of choices (use pop-up) |
| Slider | In a list or control area | A value on a range (volume, brightness) | Continuous feedback | `Slider` | Minimum not on the leading side, maximum not on the trailing side |
| Stepper | In a list | Small changes to a value | Quick increments; shows which value changes | `Stepper` | Large value changes without a text field to enter the value |
| Date and time picker | Form or sheet | Choose a date or time; minute intervals can be coarser (quarter-hour) | Familiar control | `DatePicker` with `.datePickerStyle(.compact)` (in forms) or `.graphical`; `.wheel` for dense pickers | Custom calendars **(unchecked)** |
| Picker | Forms and sheets | A medium-to-long list of items; values in a predictable order | Scroll quickly through many values | `Picker`, `.pickerStyle(.wheel)` / `.navigationLink` | Short lists (use a pull-down) |
| Color picker | Form or sheet **(unchecked: HIG page 404)** | Choose a color | System picker handles accessibility | `ColorPicker` | Custom color wheels **(unchecked)** |
| Text field | Forms, search | A small amount of information (name, email) | Autofill and keyboards help | `TextField`, `SecureField`; `.textContentType`, `.keyboardType`, `.submitLabel` | Placeholder as the only label; large amounts of text (use a text view); unevenly spaced fields in one stack |
| Keyboard | Whenever a text field is focused | Text entry; hardware keyboard navigation in text fields, text views and sidebars | System keyboard | Configure with the modifiers above; keyboard shortcuts with Command as the main modifier | Keyboard navigation for buttons, segmented controls and switches; Control as a shortcut modifier; reusing a standard shortcut (Command-Z) for an unrelated command |
| Page control | Below paged content, centered | Position in an ordered set of pages | Shows where the user is | `TabView` with `.tabViewStyle(.page)` | More than about 10 dots; hierarchical or non-sequential navigation (use a sidebar) |
| Face ID | Sign in or unlock **(unchecked: HIG page 404)** | Protect sensitive data | System trust | `LAContext.evaluatePolicy` with a fallback to the passcode | A custom biometric screen; starting authentication without a user action (per a forum quote of the HIG, unchecked) |

## Content and status

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| List (inset grouped) | Settings, structured content | Rows of text that are easy to scan | Lists and tables suit text | `List`, `Section`, `.listStyle(.insetGrouped)` | Dense rows of long text (keep item text short); collections for varied sizes or many images |
| Collection | Images, grids, varied item sizes | Content that is not mainly text | Standard row or grid layouts are expected | `UICollectionView` / `LazyVGrid` **(unchecked: API)** | Custom layouts that draw attention to themselves; collections for text |
| Row with swipe actions | List rows | Quick actions on one item | Fast for repeat tasks | `.swipeActions`; destructive action last **(unchecked: order)** | Swipe as the only action |
| Section header and footer | Above and below a section | Name a group, explain it | Context for a group | `Section("Title") { } footer: { }` | Long paragraphs in headers |
| Index bar | Long alphabetical lists | Jump to a letter | Fast scanning | UIKit table index; SwiftUI sections with `.listStyle` **(unchecked)** | Index on short lists |
| Progress bar and indicator | Inline or over content | Work in progress | Shows activity | `ProgressView(value:)` (known), `ProgressView()` (unknown) | Switching between spinner and bar for one task; blocking the screen for background work |
| Empty state | Empty list or view **(unchecked: HIG page 404)** | No content, or search had no results | Says why and what to do next | `ContentUnavailableView` | A blank screen **(unchecked)** |
| Notification | Lock Screen and banners | Time-sensitive updates | User chooses when to read | UserNotifications; rich content through a notification content extension | Several notifications for the same thing; sensitive or private content; errors (use an alert) |
| Widget | Home Screen, Lock Screen | Glanceable information | Value without opening the app | WidgetKit `Widget`, `StaticConfiguration`; families `.systemSmall` to `.systemExtraLarge`; `.accessoryCircular`, `.accessoryRectangular`, `.accessoryInline` | Offering a size only to stretch its small content; crowded edges (use the standard 16 pt margin, or 11 pt for tight groupings); an app screen in a widget |
| Control (Control Center) | Control Center, Lock Screen | One quick action or toggle | One tap to act | `ControlWidget` | Multi-step flows |
| Search field | Top of a list or in a bottom bar | Find items among many | Always reachable | `.searchable`; scope bar and tokens for filtering | Waiting for Return when results can update as people type; a placeholder that does not say what is searched |
| Tip | Inline or popover, near the feature | Teach a simple feature in one to three steps | Help appears where people need it | TipKit (`Tip`, popover or inline tip) | Tips for complex features; promotional content; tips for people who already used the feature; more than one tip every 24 hours |
| App Icon | Home Screen | Brand identity | Recognition | Icon Composer asset with Default, Dark and Clear variants | Nonessential words such as "Watch", "Play" or "New"; primary content off-center (corners and masks crop it) |

## Do not build

- Home Screen, Lock Screen and Control Center: system surfaces. Use them for mock-ups only. Build the app surfaces they link to.
- Status bar and Dock on iPad: system-drawn. Hide the status bar only when the screen needs it (`.statusBarHidden`).
- Device bezels from the Product Bezels page: presentation only.

## Gotchas

- The kit's Light and Dark modes are properties of the screenshot. In code, use semantic colors and let the system switch.
- Liquid Glass belongs to the controls layer, not content. A glass control over content is correct; glass behind glass is not.
- iPad and iPhone share one adaptive view. Use size classes and `NavigationSplitView` instead of two codebases.
- Tab bars and sidebars can be adaptable on iPad: a fixed tab bar near the top, or a button that converts it to a sidebar.
- Avoid nesting scroll views with the same orientation. A horizontal scroll view inside a vertical one is fine.
