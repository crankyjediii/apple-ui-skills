import SwiftUI

public struct GalleryItem: Identifiable, Hashable, Sendable {
    public let id: UUID
    public let title: String
    public let subtitle: String
    public let systemImage: String
    public let isFavorite: Bool

    public init(id: UUID = UUID(), title: String, subtitle: String, systemImage: String, isFavorite: Bool = false) {
        self.id = id
        self.title = title
        self.subtitle = subtitle
        self.systemImage = systemImage
        self.isFavorite = isFavorite
    }

    public static let samples: [GalleryItem] = [
        GalleryItem(title: "Design System", subtitle: "Official 26-series HIG components", systemImage: "sparkles", isFavorite: true),
        GalleryItem(title: "Liquid Glass", subtitle: "Floating morphing materials", systemImage: "drop.fill", isFavorite: true),
        GalleryItem(title: "Adaptive Navigation", subtitle: "Split views and dynamic tabs", systemImage: "sidebar.left"),
        GalleryItem(title: "Accessibility", subtitle: "Dynamic Type & VoiceOver traits", systemImage: "accessibility")
    ]
}
