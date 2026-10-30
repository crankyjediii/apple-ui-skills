import SwiftUI
struct V: View {
    @State var on = false
    var body: some View {
        HomeView()
            .ornament(attachmentAnchor: .scene(.bottom)) {
                HStack { Button("Play", systemImage: "play.fill") { } }.padding().glassBackgroundEffect()
            }
            .toolbar { ToolbarItem(placement: .bottomOrnament) { Button("x") {} } }
            .tabViewStyle(.page)
    }
}
struct VB: View {
    var body: some View {
        Button("c") {}
            .hoverEffect(.highlight)
            .contentShape(.hoverEffect, RoundedRectangle(cornerRadius: 12))
    }
}
