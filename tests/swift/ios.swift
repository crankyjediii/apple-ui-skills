import SwiftUI
struct LibraryView: View { var body: some View { Text("L") } }
struct SearchView: View { var body: some View { Text("S") } }
struct Tabs: View {
    @State private var showSheet = false
    @State private var showPop = false
    var body: some View {
        TabView {
            Tab("Home", systemImage: "house") { NavigationStack { HomeView() } }
            Tab("Library", systemImage: "books.vertical") { NavigationStack { LibraryView() } }
            Tab(role: .search) { NavigationStack { SearchView() } }
        }
        .tabBarMinimizeBehavior(.onScrollDown)
        .tabViewStyle(.sidebarAdaptable)
    }
}
struct Glass: View {
    @State private var showSheet = false
    @State private var showPop = false
    @State private var text = ""
    var body: some View {
        NavigationStack {
            ScrollView {
                GlassEffectContainer(spacing: 12) {
                    HStack(spacing: 12) {
                        Button("Edit", systemImage: "pencil") { }.buttonStyle(.glass)
                        Button("Share", systemImage: "square.and.arrow.up") { }.buttonStyle(.glassProminent)
                    }
                }
                Text("Now playing").padding().glassEffect(.regular.interactive(), in: .capsule)
                Button("Go") {}.buttonStyle(.borderedProminent).controlSize(.large)
                Button("Del", role: .destructive) {}.buttonStyle(.bordered)
                ContentUnavailableView("None", systemImage: "tray")
            }
            .scrollEdgeEffectStyle(.soft, for: .top)
            .navigationTitle("Title")
            .toolbarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) { Button("A") {} }
                ToolbarItem(placement: .topBarTrailing) { Button("B") {} }
                ToolbarItemGroup(placement: .bottomBar) { Button("C") {} }
                DefaultToolbarItem(kind: .search, placement: .bottomBar)
            }
            .searchable(text: $text)
            .sheet(isPresented: $showSheet) { Text("x").presentationDetents([.medium, .large]).presentationDragIndicator(.visible) }
            .popover(isPresented: $showPop) { Text("p").presentationCompactAdaptation(.popover) }
            .alert("t", isPresented: $showSheet) { Button("OK") {} } message: { Text("m") }
            .confirmationDialog("t", isPresented: $showPop) { Button("OK") {} }
            .statusBarHidden(false)
        }
    }
}
struct Controls: View {
    @State var on = false; @State var v = 0.5; @State var d = Date(); @State var sel = 0; @State var c = Color.red
    var body: some View {
        Form {
            Toggle("t", isOn: $on)
            Slider(value: $v); Stepper("s", value: $sel)
            DatePicker("d", selection: $d).datePickerStyle(.compact)
            DatePicker("d", selection: $d).datePickerStyle(.graphical)
            Picker("p", selection: $sel) { Text("a").tag(0); Text("b").tag(1) }.pickerStyle(.segmented)
            Picker("p", selection: $sel) { Text("a").tag(0) }.pickerStyle(.menu)
            ColorPicker("c", selection: $c)
            ShareLink(item: "x")
            ProgressView(value: 0.3); ProgressView()
            SecureField("s", text: .constant("")).textContentType(.password).submitLabel(.done)
            TextField("t", text: .constant("")).keyboardType(.emailAddress)
        }
        .listStyle(.insetGrouped)
    }
}
