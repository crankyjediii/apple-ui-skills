import SwiftUI
struct Item: Identifiable, Hashable { let id = UUID(); let name: String; let symbol: String }
struct HomeView: View { var body: some View { Text("Home") } }
