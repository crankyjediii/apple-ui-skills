# watchOS: where, when, why, how each component

Names match the kit index in `components.md`. Rules are checked against Apple's Human Interface Guidelines (HIG) on 2026-10-29 where noted. Items marked **(unchecked)** are not verified: the watchOS-specific pages were not reachable, or only secondary sources were found.

| Component | Where | When | Why | How (native) | Avoid |
|---|---|---|---|---|---|
| Navigation Bar (status + title) | Top of a screen | A screen in a hierarchy | Title and back in one place | `NavigationStack`, `.navigationTitle`; `.topBarLeading`, `.topBarTrailing` | Large titles with long text on small cases **(unchecked)** |
| Navigation Bar (Modal) | Top of a modal | A task that needs confirm or cancel | Clear exit | `.confirmationAction`, `.cancellationAction` | More than two controls **(unchecked)** |
| Sheet | Full-screen modal | A brief, occasional interruption of the current workflow | Keeps the interruption short | `.sheet`; keep the default material background | Sheets used to navigate app content; removing the default material (it provides context in modal views) |
| Tabs (vertical pages) | Full screen, Digital Crown scrolls between them | A few pages of related content | Crown-driven paging is native | `TabView` with `.tabViewStyle(.verticalPage)` or `.page` | Tabs for unrelated flows **(unchecked)** |
| Button, Pill (Default, Primary, Destructive) | Bottom of a screen | The main action on a screen | Full-width target is easy to tap | `Button` with `.buttonBorderShape(.capsule)`; `.tint` for Primary; `role: .destructive` | Several side-by-side pills **(unchecked)** |
| Button, Circular | Single icon action | One icon-only action | Compact | `Button` with `.buttonBorderShape(.circle)` | Circular buttons without a clear symbol **(unchecked)** |
| Button, Pay | Checkout | Apple Pay purchase | System-required look | `PayWithApplePayButton` | Custom Apple Pay buttons **(unchecked)** |
| List (Item, Carousel, Source List) | Main content | Rows of text, glanceable | Large type, scannable | `List` with `.listStyle(.carousel)` or `.elliptical`; `Section` | Long lists: show the most relevant rows and give a way to see more |
| Picker | Settings and choices | Choose one value | The crown picks values; the picker gives feedback as it turns | `Picker` (wheel by default); `.pickerStyle(.navigationLink)` for long lists | Pickers with many items on the wheel |
| Slider | Adjust a value | Volume, brightness | Crown control | `Slider`; `.digitalCrownRotation($value)` | On-screen sliders when the crown fits **(unchecked)** |
| Toggle | Settings | On or off | Immediate | `Toggle` | Toggles that need Save **(unchecked)** |
| Alert | Over the screen | A decision | Standard | `.alert` | Long text |
| Action sheet | Over the screen | A choice among actions | Standard | `.confirmationDialog` | More than four buttons, including Cancel; destructive actions not at the top with the destructive style |
| Notification (Short Look, Long Look, Banner) | Wrist | Time-sensitive updates | Glance, then decide | UserNotifications with a notification content scene (`WKUserNotificationHostingController`) | Several notifications for the same thing; sensitive content; a long title (keep it short, it is limited on the watch) |
| Progress Indicator (Status bar, Table row, Content area) | Inline by size | Work in progress | Shows activity at the right size | `ProgressView`; `Gauge` for a value | Spinners for long, known work **(unchecked)** |
| Smart Stack (Widgets) | Smart Stack | Glanceable information, relevant at the right time | Appears when useful | WidgetKit accessory families; relevance hints | Full app screens in widgets; expanding small content to fill a larger size |
| Activity Rings | Fitness and health context | Show Move, Exercise and Stand progress for one person | Recognizable and consistent | System-rendered | Using rings for other data, for more than one person, for decoration or for branding. Do not replicate them in another ring-like element |
| Scrollbar | Scroll views | Shows position and that content continues | System-drawn | Built into `List` and scroll views | Hiding it on long content **(unchecked)** |
| App Icon | Home screen | Brand identity | Recognition | Icon Composer asset in the Xcode project | Black background (lighten it so it does not blend into the display); nonessential words such as "Watch" or "Play"; primary content off-center |
| Settings app | Apple's Settings app | Settings for the app | Apps do not add settings to the system Settings app on watchOS | Put a few essential options at the bottom of the main view, or use a More menu | Expecting a Settings entry for app options |

## Do not build

- Bezel, status bar and time display: system-drawn. Product Bezels are for mock-ups only.
- Digital Crown: system input. Use `.digitalCrownRotation` rather than an on-screen substitute. Anchor navigation to the crown: lists, tabs and scroll views are vertical so the crown moves between elements. Give visual feedback for every crown interaction, and update content at a rate that lets people select values.
- Layout Grid masks: reference for sizing, not UI to draw.

## Gotchas

- Check every case size (40, 42, 44, 46, 49 mm). Text that fits at 49 mm can truncate at 40 mm.
- Keep interactions to one or two taps. Watch users glance for seconds.
- Design to the smallest size first and let the layout scale up.
- Avoid nesting scroll views with the same orientation.
