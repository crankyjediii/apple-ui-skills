#if os(watchOS)
import SwiftUI

public struct WatchOSGalleryView: View {
    @State private var crownValue = 1.0

    public init() {}

    public var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Activity Pace")
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                        Text(String(format: "%.1f x", crownValue))
                            .font(.title2)
                            .bold()
                            .foregroundStyle(.green)
                    }
                    .padding(.vertical, 4)
                }

                Section("Workouts") {
                    ForEach(GalleryItem.samples) { item in
                        NavigationLink(destination: Text(item.title)) {
                            Label(item.title, systemImage: item.systemImage)
                        }
                    }
                }
            }
            .listStyle(.carousel)
            .navigationTitle("Apple Watch")
            .toolbar {
                ToolbarItem(placement: .bottomBar) {
                    Button(action: {}) {
                        Text("Start Workout")
                            .bold()
                    }
                    .buttonStyle(.borderedProminent)
                    .buttonBorderShape(.capsule)
                    .tint(.green)
                }
            }
            .focusable()
            .digitalCrownRotation($crownValue, from: 0.5, through: 3.0, by: 0.1, sensitivity: .medium)
        }
    }
}

#Preview {
    WatchOSGalleryView()
}
#endif
