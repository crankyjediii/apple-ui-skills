# Prompts to try

Copy, paste, and replace the parts in `<angle brackets>`. You do not need to name a skill; the agent picks them from your wording.

## First time

> Set up the Apple UI kit skills for me. I'm building <an iPhone app / a Mac app / a Vision Pro app / a Watch app> in <SwiftUI / Next.js / Figma>.

## Design in Figma

> Using the Apple iOS kit, design a 3-step onboarding flow for <my app>. Use real kit components, light and dark.

> Add a settings screen to my design in <figma url>, built from the macOS kit.

## Turn a kit component or your design into code

> Implement the Buttons page from the macOS kit in SwiftUI: <figma url with node-id>.

> Here is my Figma screen: <figma url>. It uses Apple kit components plus my own cards. Build it in SwiftUI and keep my custom cards as reusable views.

> Recreate the iOS tab bar and toolbar from <figma url> in Next.js. Say which parts are approximations.

## Understand the kit

> Which kit component should I use for an inline date picker on iPad, and what's the SwiftUI equivalent?

> List every variant of the macOS Push Button and which SwiftUI modifiers produce them.

## Review

> Audit this SwiftUI view against the Apple kits: <path>.

> Does this page feel native on iOS? Check <path or url> and list fixes by severity.

## Other stacks

> Give my React Native screen an iOS look using native controls where possible: <path>.

> Port the iOS segmented control and navigation bar to Flutter Cupertino widgets.

## Tips

- Paste a Figma link that includes `node-id=` to point the agent at an exact component.
- Name the platform ("iPhone", "Mac", "Vision Pro", "Watch"); the agent loads the matching kit.
- Ask "what did you approximate?" at the end of any build.
