#if os(iOS)
import SwiftUI

public struct IOSGalleryView: View {
    @State private var selectedTab = 0
    @State private var notificationsEnabled = true
    @State private var syncSelection = 1
    @State private var searchText = ""
    @State private var showSheet = false
    @State private var showAlert = false

    public init() {}

    public var body: some View {
        TabView(selection: $selectedTab) {
            Tab("Home", systemImage: "house", value: 0) {
                NavigationStack {
                    homeContent
                }
            }
            Tab("Library", systemImage: "books.vertical", value: 1) {
                NavigationStack {
                    libraryContent
                }
            }
            Tab(role: .search, value: 2) {
                NavigationStack {
                    searchContent
                }
            }
        }
        .tabViewStyle(.sidebarAdaptable)
        .tabBarMinimizeBehavior(.onScrollDown)
    }

    private var homeContent: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 8) {
                    Text("iOS 26 Showcase")
                        .font(.title2)
                        .bold()
                    Text("Liquid Glass, inset grouped lists, and adaptive navigation.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding(.vertical, 4)
            }

            // Liquid Glass Controls
            Section("Liquid Glass Controls") {
                if #available(iOS 26, *) {
                    GlassEffectContainer(spacing: 12) {
                        HStack(spacing: 12) {
                            Button("Filter", systemImage: "line.3.horizontal.decrease.circle") { }
                                .buttonStyle(.glass)
                            Button("New Flow", systemImage: "plus.circle.fill") { }
                                .buttonStyle(.glassProminent)
                        }
                    }
                    .padding(.vertical, 4)
                } else {
                    HStack(spacing: 12) {
                        Button("Standard Tinted") { }
                            .buttonStyle(.bordered)
                        Button("Prominent", systemImage: "plus") { }
                            .buttonStyle(.borderedProminent)
                    }
                }
            }

            // Inset Grouped Settings
            Section("Settings & Preferences") {
                Toggle("Push Notifications", isOn: $notificationsEnabled)

                Picker("Cloud Sync Frequency", selection: $syncSelection) {
                    Text("Real-time").tag(0)
                    Text("Hourly").tag(1)
                    Text("Manual Only").tag(2)
                }
                .pickerStyle(.navigationLink)

                Button("Open Inspector Sheet") {
                    showSheet = true
                }

                Button("Confirm Critical Action", role: .destructive) {
                    showAlert = true
                }
            }

            // Swipe Actions
            Section("Item Records") {
                ForEach(GalleryItem.samples) { item in
                    HStack {
                        Label(item.title, systemImage: item.systemImage)
                        Spacer()
                        Text(item.subtitle)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                        Button(role: .destructive) { } label: {
                            Label("Delete", systemImage: "trash")
                        }
                        Button { } label: {
                            Label("Pin", systemImage: "pin")
                        }
                        .tint(.orange)
                    }
                }
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle("Featured")
        .toolbarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(action: { showSheet = true }) {
                    Image(systemName: "ellipsis.circle")
                }
            }
        }
        .sheet(isPresented: $showSheet) {
            NavigationStack {
                VStack(spacing: 16) {
                    Text("Modal Presentation Sheet")
                        .font(.headline)
                    Text("Configured with medium and large presentation detents and grabber handle.")
                        .font(.body)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                    Spacer()
                }
                .padding(24)
                .navigationTitle("Sheet Details")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Done") { showSheet = false }
                    }
                }
            }
            .presentationDetents([.medium, .large])
            .presentationDragIndicator(.visible)
        }
        .alert("Confirm Reset", isPresented: $showAlert) {
            Button("Cancel", role: .cancel) { }
            Button("Reset", role: .destructive) { }
        } message: {
            Text("Are you sure you want to reset all cached data?")
        }
    }

    private var libraryContent: some View {
        List(GalleryItem.samples) { item in
            NavigationLink(item.title) {
                VStack(spacing: 12) {
                    Image(systemName: item.systemImage)
                        .font(.system(size: 48))
                        .foregroundStyle(.tint)
                    Text(item.title)
                        .font(.title)
                        .bold()
                    Text(item.subtitle)
                        .font(.body)
                        .foregroundStyle(.secondary)
                }
                .navigationTitle(item.title)
            }
        }
        .navigationTitle("Library")
    }

    private var searchContent: some View {
        List {
            ContentUnavailableView("Search Apple UI", systemImage: "magnifyingglass", description: Text("Type a query to search components."))
        }
        .searchable(text: $searchText)
        .navigationTitle("Search")
    }
}

#Preview {
    IOSGalleryView()
}
#endif
