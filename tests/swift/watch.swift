import SwiftUI
struct W: View {
    let items = [Item(name: "a", symbol: "b")]
    @State var v = 1.0; @State var sel = 0
    var body: some View {
        NavigationStack {
            List(items) { item in NavigationLink(item.name, value: item) }
                .listStyle(.carousel)
                .toolbar { ToolbarItem(placement: .bottomBar) { Button("Add") { } } }
        }
        TabView { Text("1"); Text("2") }.tabViewStyle(.verticalPage)
        Button("Pill") {}.buttonBorderShape(.capsule).tint(.blue)
        Button("Circle") {}.buttonBorderShape(.circle)
        Text("x").digitalCrownRotation($v)
        Picker("p", selection: $sel) { Text("a").tag(0) }.pickerStyle(.navigationLink)
        Gauge(value: 0.5) { Text("g") }
        Toggle("t", isOn: .constant(true))
    }
}
