# Screen patterns: where, when, why, how

Use this to pick components by the job a screen does. Component details live in each platform's `references/usage.md`.

Checked against Apple's Human Interface Guidelines (HIG) on 2026-10-29. Items marked **(unchecked)** are not verified: the HIG page returned 404 or only secondary sources were found.

| Pattern | Where it appears | When to use | Why (HIG intent) | How (native) | Avoid |
|---|---|---|---|---|---|
| Top-level sections | Bottom tab bar (iPhone), sidebar (iPad, Mac) | Peer areas the user switches between often. Use the fewest tabs that fit the hierarchy | Keeps the tab bar visible, so people know where they are | `TabView` with `Tab`; `NavigationSplitView` on wide layouts | Tabs for actions; overflow ("More") tabs; hiding tab buttons when content is empty |
| Drill-down | Navigation stack | The user goes from a list to one item and back | Hierarchy matches a stack; back is predictable | `NavigationStack` with `NavigationLink` or `navigationDestination` | Pushing a peer section onto the stack |
| List and detail | Sidebar + content, or push navigation | Browsing many items that each have detail | Users compare items without losing their place | `NavigationSplitView` (wide) and `NavigationStack` (compact) in one adaptive view | Two separate layouts per device size |
| Settings | Options in the screen they affect; app settings in the App menu (Mac) or a Settings screen | Task-specific options (show/hide, reorder, filter) belong where they apply. Only app-wide options go to settings | Options are discoverable where they matter | `List` with `.insetGrouped`; `Toggle`, `Picker`, `NavigationLink` rows | Settings buttons in a Mac window toolbar; a customizable toolbar in the settings window; custom settings in the watchOS Settings app (use the main view or a More menu) |
| Search | Top of a list, or a bottom toolbar search on iOS | Users look for items among many | Search is always reachable | `.searchable(text:)`; `Tab(role: .search)` for a separate search tab | A custom field that ignores the system field; waiting for Return when results can update as people type |
| Form and data entry | Sheet or pushed screen | Several fields that the user fills in and submits | One task, one commit point | `Form`, `TextField` with `textContentType` and `keyboardType`, `DatePicker` | Auto-saving half-finished forms with no cancel **(unchecked)** |
| Modal task | Sheet with Cancel and Done or Save | A brief, occasional task that belongs to the current context | Users can leave without changing anything | `.sheet` with `presentationDetents`; `.fullScreenCover` for a required or immersive task | Showing Cancel, Done and Back together; using a sheet to navigate app content |
| Confirm a destructive action | Confirmation dialog (action sheet) or alert | Irreversible or high-impact actions | Consequences are shown before they happen | `.confirmationDialog` for a choice of actions; `.alert` for one critical decision | Alerts for common, undoable deletes; alerts for information only |
| Choose one value | Segmented control (a few views of the same content), pop-up button (flat list of exclusive options), picker (medium-to-long lists) | Pick one value | Segmented shows all options at once; pop-up saves space | `Picker` with `.segmented`, `.menu`, or `.wheel` / `.navigationLink` | Segmented control for navigation between unrelated screens; pop-up for commands (use a pull-down) |
| Commands from a button | Pull-down button in a toolbar or view | Commands directly related to the button's action | Keeps the menu tied to its target | `Menu` (iOS, macOS); `NSPopUpButton` with `pullsDown` | All of a view's actions in one pull-down; fewer than about three items |
| Filter or sort | Toolbar button that opens a menu, or a segmented control above a list | Narrow or reorder a list | Filters sit near the content they change | `Menu` in a toolbar; `Picker` with `.segmented` | A filter hidden inside Settings |
| Onboarding | Paged screens with a page control | Short intro that the user swipes through | Page control shows position in an ordered set | `TabView` with `.tabViewStyle(.page)` | Long onboarding with no way to skip **(unchecked: length)** |
| Empty state | Inside an empty list or view **(unchecked: HIG page 404)** | No content yet, or search found nothing | Explain why it is empty and offer the next step | `ContentUnavailableView` with a button when there is an action | A blank screen **(unchecked)** |
| Loading and progress | Inline near the content it affects | Work takes time | Show that work is happening; show how much is left when known | `ProgressView` (`value:` when known) | Switching between spinner and bar for the same task; blocking the screen for background work |
| Quick item actions | Swipe on a row, or context menu on long press | Secondary actions on one item | Keeps the main path clean | `.swipeActions` (destructive last **(unchecked: order)**); `.contextMenu` | The only way to reach an action; more than about three groups in a context menu |
| Share | Share button in a toolbar | Let people send or collaborate on content | The system share sheet is familiar and handles file types | `ShareLink`; the system share sheet; the Collaboration button next to Share | Duplicate versions of system actions such as Print; a custom title that does not say what the action does |
| Help | Inline tip, popover tip, or tooltip (Mac, visionOS) | Teach a feature that is easy to describe in one to three steps | Help appears where people need it and can be dismissed | TipKit for tips; `.help("text")` for tooltips | Tips for features that need more than three actions; hover tooltips on iPhone or iPad (`.help` does not show there) |
| Glanceable status | Home Screen or Lock Screen widget, watch complication | The user checks one fact without opening the app | Information without a launch | WidgetKit `Widget`, `ControlWidget` | A full app screen shrunk into a widget |
| Notify the user | Notification | Time-sensitive updates the user can read later | User chooses when to read | UserNotifications | Several notifications for the same thing; sensitive content; errors (use an alert) |
| Authentication | System sheet or inline field | Sign in or unlock sensitive content | Users trust the system prompt | `LocalAuthentication` (`LAContext`); password AutoFill through `textContentType` | A custom password screen that bypasses AutoFill **(unchecked)** |

## Rules that apply across patterns

- Build one adaptive view. Use size classes and `NavigationSplitView` instead of two layouts per device.
- Let the system draw chrome. Use standard containers before custom views. Do not build custom window frames or controls.
- Use semantic colors and Dynamic Type through text styles. Never fix sizes or hex values in native code.
- Liquid Glass belongs in the controls layer, not in content. Limit glass to the most important functional elements.
- Make each pattern work with VoiceOver: every control has a label, and focus order follows the visual order.
