---
description: Check your setup and configure the Apple UI kit skills for your project
argument-hint: [platform] [swiftui|nextjs|react-native|flutter]
---

Run the setup check using the `apple-ui-setup` skill: $ARGUMENTS

1. Load `apple-ui-setup` and `apple-ui-core`.
2. Inspect the current workspace to detect the stack (Xcode project or Package.swift means SwiftUI; package.json with next means Next.js; package.json with react-native means React Native; pubspec.yaml means Flutter).
3. Run `node scripts/doctor.mjs` to check local Xcode/Swift SDKs and toolchain readiness if bash/terminal access is available.
4. Walk through the target platform and stack, confirm which skills apply, and suggest 3 ready-to-run prompts tailored to the project.
