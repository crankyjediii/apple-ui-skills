// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "AppleUIGallery",
    platforms: [
        .macOS(.v14),
        .iOS(.v17),
        .visionOS(.v1),
        .watchOS(.v10)
    ],
    products: [
        .library(name: "AppleUIGallery", targets: ["AppleUIGallery"])
    ],
    targets: [
        .target(
            name: "AppleUIGallery",
            path: "Sources/AppleUIGallery"
        )
    ]
)
