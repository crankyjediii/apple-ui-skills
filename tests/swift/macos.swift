import SwiftUI
struct Mac: View {
    @State var selection: UUID?
    @State var on = false; @State var sel = 0; @State var v = 0.5; @State var c = Color.red; @State var show = false
    let items = [Item(name: "a", symbol: "star")]
    var body: some View {
        NavigationSplitView {
            List(selection: $selection) { ForEach(items) { Label($0.name, systemImage: $0.symbol).tag($0.id) } }
                .listStyle(.sidebar)
        } detail: { HomeView() }
        .toolbar {
            ToolbarItem(placement: .primaryAction) { Button("Add", systemImage: "plus") { } }
            ToolbarItem { ControlGroup { Button("a"){}; Button("b"){} } }
        }
        .popover(isPresented: $show, arrowEdge: .bottom) { Text("p") }
        .fileImporter(isPresented: $show, allowedContentTypes: [.data]) { _ in }
        .inspector(isPresented: $show) { Text("i") }
        .help("tip")
    }
}
struct MacControls: View {
    @State var on = false; @State var sel = 0; @State var c = Color.red
    var body: some View {
        Form {
            Toggle("c", isOn: $on).toggleStyle(.checkbox)
            Toggle("s", isOn: $on).toggleStyle(.switch)
            Picker("r", selection: $sel) { Text("a").tag(0); Text("b").tag(1) }.pickerStyle(.radioGroup)
            Picker("m", selection: $sel) { Text("a").tag(0) }.pickerStyle(.menu)
            Menu("Pull") { Button("x") {} }
            ColorPicker("c", selection: $c)
            Button("Default") {}.keyboardShortcut(.defaultAction).buttonStyle(.borderedProminent)
            Button("Tinted") {}.buttonStyle(.bordered).tint(.green).controlSize(.small)
            Button("Plain") {}.buttonStyle(.borderless)
            GroupBox("g") { Text("x") }
            DisclosureGroup("d") { Text("x") }
            Text("g").glassEffect()
        }
        .formStyle(.grouped)
    }
}
struct Rows: View {
    var body: some View {
        Table([Item(name: "a", symbol: "b")]) { TableColumn("Name", value: \.name) }
            .alternatingRowBackgrounds()
    }
}
@main struct MacApp: App {
    var body: some Scene {
        WindowGroup { Mac() }.windowResizability(.contentSize).windowToolbarStyle(.unified)
        MenuBarExtra("x", systemImage: "star") { Text("m") }
        .commands { CommandMenu("M") { Button("c") {} } }
    }
}
