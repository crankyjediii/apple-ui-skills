#if os(macOS)
import SwiftUI

public struct MacOSGalleryView: View {
    @State private var selectedItem: GalleryItem? = GalleryItem.samples.first
    @State private var toggleState = true
    @State private var switchState = false
    @State private var radioSelection = 0
    @State private var menuSelection = 0
    @State private var sliderValue = 0.65
    @State private var searchText = ""
    @State private var showSheet = false
    @State private var showInspector = true

    public init() {}

    public var body: some View {
        NavigationSplitView {
            List(GalleryItem.samples, selection: $selectedItem) { item in
                NavigationLink(value: item) {
                    Label(item.title, systemImage: item.systemImage)
                }
            }
            .listStyle(.sidebar)
            .navigationTitle("macOS 26 Kit")
        } detail: {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Header card
                    VStack(alignment: .leading, spacing: 8) {
                        Text(selectedItem?.title ?? "Overview")
                            .font(.title)
                            .bold()
                        Text(selectedItem?.subtitle ?? "macOS 26 native components following Apple Human Interface Guidelines.")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.bottom, 8)

                    // Push Buttons
                    GroupBox("Push Buttons (macOS 26)") {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack(spacing: 12) {
                                Button("Default Action") { }
                                    .buttonStyle(.borderedProminent)
                                    .keyboardShortcut(.defaultAction)

                                Button("Bordered") { }
                                    .buttonStyle(.bordered)

                                Button("Tinted Accent") { }
                                    .buttonStyle(.bordered)
                                    .tint(.blue)

                                Button("Destructive", role: .destructive) { }
                                    .buttonStyle(.bordered)

                                Button("Borderless") { }
                                    .buttonStyle(.borderless)
                            }

                            HStack(spacing: 12) {
                                Button("Small", systemImage: "sparkle") { }
                                    .buttonStyle(.bordered)
                                    .controlSize(.small)

                                Button("Regular", systemImage: "sparkle") { }
                                    .buttonStyle(.bordered)
                                    .controlSize(.regular)

                                Button("Large", systemImage: "sparkle") { }
                                    .buttonStyle(.bordered)
                                    .controlSize(.large)
                            }
                        }
                        .padding(8)
                    }

                    // Form & Selection Controls
                    GroupBox("Form & Selection Controls") {
                        Form {
                            Toggle("Checkbox option", isOn: $toggleState)
                                .toggleStyle(.checkbox)

                            Toggle("Settings switch", isOn: $switchState)
                                .toggleStyle(.switch)

                            Picker("Radio selection", selection: $radioSelection) {
                                Text("Option A").tag(0)
                                Text("Option B").tag(1)
                                Text("Option C").tag(2)
                            }
                            .pickerStyle(.radioGroup)

                            Picker("Pop-up menu", selection: $menuSelection) {
                                Text("Default").tag(0)
                                Text("High Priority").tag(1)
                                Text("Archived").tag(2)
                            }
                            .pickerStyle(.menu)

                            Slider(value: $sliderValue) {
                                Text("Threshold")
                            }
                        }
                        .formStyle(.grouped)
                        .padding(8)
                    }

                    // Liquid Glass Container
                    GroupBox("Liquid Glass Chrome") {
                        HStack(spacing: 16) {
                            if #available(macOS 26, *) {
                                Text("Interactive Glass Capsule")
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                                    .glassEffect(.regular.interactive(), in: .capsule)
                            } else {
                                Text("Standard Material Fallback")
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                                    .background(.regularMaterial, in: .capsule)
                            }

                            Button("Inspect Sheet") {
                                showSheet = true
                            }
                            .buttonStyle(.bordered)
                        }
                        .padding(8)
                    }
                }
                .padding(24)
            }
            .searchable(text: $searchText)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button("New Item", systemImage: "plus") { }
                }
                ToolbarItem {
                    ControlGroup {
                        Button(action: {}) { Image(systemName: "square.grid.2x2") }
                        Button(action: {}) { Image(systemName: "list.bullet") }
                    }
                }
                ToolbarItem(placement: .automatic) {
                    Button(action: { showInspector.toggle() }) {
                        Image(systemName: "sidebar.trailing")
                    }
                    .help("Toggle Inspector Panel")
                }
            }
            .inspector(isPresented: $showInspector) {
                VStack(alignment: .leading, spacing: 16) {
                    Text("Inspector Panel")
                        .font(.headline)
                    Text("macOS 26 Inspector for detailed metadata and contextual properties.")
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    Divider()

                    LabeledContent("Component", value: selectedItem?.title ?? "Button")
                    LabeledContent("Platform", value: "macOS 26")
                    LabeledContent("Material", value: "Liquid Glass")
                    LabeledContent("Access", value: "Standard")

                    Spacer()
                }
                .padding(16)
                .frame(minWidth: 220)
            }
            .sheet(isPresented: $showSheet) {
                VStack(spacing: 16) {
                    Text("Modal Sheet Attached to Window")
                        .font(.headline)
                    Text("Mac sheets attach to the window frame and maintain dismissability.")
                        .font(.body)
                        .foregroundStyle(.secondary)
                    Button("Dismiss") { showSheet = false }
                        .buttonStyle(.borderedProminent)
                        .keyboardShortcut(.defaultAction)
                }
                .padding(32)
                .frame(minWidth: 380, minHeight: 180)
            }
        }
    }
}

#Preview {
    MacOSGalleryView()
        .frame(minWidth: 780, minHeight: 520)
}
#endif
