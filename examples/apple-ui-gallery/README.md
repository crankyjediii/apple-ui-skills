# Apple UI Gallery (Swift Package)

A ready-to-run Swift Package showcasing Apple's official 26-series UI kit components and HIG patterns across iOS, macOS, visionOS, and watchOS.

## How to use

### In Xcode
1. Open this folder in Xcode:
   ```bash
   xed examples/apple-ui-gallery
   ```
2. Open any of the view files in `Sources/AppleUIGallery/`:
   - `IOSGalleryView.swift`: iOS 26 dynamic tab bar, inset grouped list, and Liquid Glass buttons.
   - `MacOSGalleryView.swift`: macOS unified toolbar, split-view sidebar, and push buttons.
   - `VisionOSGalleryView.swift`: visionOS glass panels, bottom ornament controls, and spatial hover effects.
   - `WatchOSGalleryView.swift`: watchOS carousel list, capsule action buttons, and Digital Crown rotation.
3. Activate the **Xcode Canvas** (`⌥⌘↩` or Editor → Canvas) to view interactive live `#Preview`s.

### In Terminal
```bash
cd examples/apple-ui-gallery
swift build
```
