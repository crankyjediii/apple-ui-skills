#if os(visionOS)
import SwiftUI

public struct VisionOSGalleryView: View {
    @State private var selectedIndex = 0
    @State private var isMuted = false

    public init() {}

    public var body: some View {
        NavigationSplitView {
            List(GalleryItem.samples.indices, id: \.self) { idx in
                let item = GalleryItem.samples[idx]
                Button(action: { selectedIndex = idx }) {
                    Label(item.title, systemImage: item.systemImage)
                }
            }
            .navigationTitle("Spatial UI")
        } detail: {
            VStack(spacing: 24) {
                let item = GalleryItem.samples[selectedIndex]
                Image(systemName: item.systemImage)
                    .font(.system(size: 64))
                    .foregroundStyle(.tint)
                    .padding()
                    .glassBackgroundEffect()

                Text(item.title)
                    .font(.extraLargeTitle)
                    .bold()

                Text(item.subtitle)
                    .font(.title3)
                    .foregroundStyle(.secondary)

                HStack(spacing: 20) {
                    Button("Engage", systemImage: "hand.tap.fill") { }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                        .hoverEffect(.highlight)

                    Button("Options", systemImage: "slider.horizontal.3") { }
                        .buttonStyle(.bordered)
                        .controlSize(.large)
                        .hoverEffect(.highlight)
                }
                .padding(.top, 16)
            }
            .padding(40)
            .ornament(attachmentAnchor: .scene(.bottom)) {
                HStack(spacing: 16) {
                    Button(action: { isMuted.toggle() }) {
                        Image(systemName: isMuted ? "speaker.slash.fill" : "speaker.wave.2.fill")
                    }
                    Button(action: {}) {
                        Image(systemName: "backward.fill")
                    }
                    Button(action: {}) {
                        Image(systemName: "play.fill")
                    }
                    Button(action: {}) {
                        Image(systemName: "forward.fill")
                    }
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .glassBackgroundEffect()
            }
        }
    }
}

#Preview {
    VisionOSGalleryView()
}
#endif
