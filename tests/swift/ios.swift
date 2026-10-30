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

// MARK: apple-ui-motion snippets (keep in sync with skills/apple-ui-motion/references)
struct MotionSprings: View {
    @State private var expanded = false
    @State private var liked = false
    @State private var offset = CGSize.zero
    @Namespace private var ns
    var body: some View {
        VStack {
            Button("Toggle") { withAnimation(.snappy) { expanded.toggle() } }
            Rectangle().frame(height: expanded ? 200 : 100)
                .animation(.smooth(duration: 0.4), value: expanded)
            Image(systemName: "heart")
                .symbolEffect(.bounce, value: liked)
                .symbolEffect(.pulse, isActive: expanded)
                .symbolEffect(.variableColor.iterative.reversing, options: .repeating, isActive: expanded)
                .contentTransition(.symbolEffect(.replace))
            Image(systemName: liked ? "heart.fill" : "heart")
                .contentTransition(.symbolEffect(.replace.downUp.byLayer))
            Image(systemName: "bell").symbolEffect(.wiggle, value: liked).symbolEffect(.scale.up, isActive: liked)
            Image(systemName: "wifi").symbolEffect(.bounce.up.byLayer, options: .speed(2), value: liked)
            if expanded { Text("Hi").matchedGeometryEffect(id: "t", in: ns).transition(.opacity.combined(with: .scale(scale: 0.96))) }
            Spacer().frame(height: 0)
                .animation(Animation.spring(duration: 0.5, bounce: 0.3), value: expanded)
                .animation(.interactiveSpring, value: offset)
                .animation(.bouncy, value: liked)
                .animation(.spring(response: 0.35, dampingFraction: 0.8), value: liked)
        }
    }
}
struct MotionPhases: View {
    var body: some View {
        Image(systemName: "star.fill")
            .phaseAnimator([false, true]) { content, big in
                content.scaleEffect(big ? 1.2 : 1)
            } animation: { _ in .bouncy }
    }
}
struct MotionFrames: View {
    struct V { var scale = 1.0; var y = 0.0 }
    @State private var tick = 0
    var body: some View {
        Image(systemName: "bolt.fill")
            .keyframeAnimator(initialValue: V(), trigger: tick) { c, v in
                c.scaleEffect(v.scale).offset(y: v.y)
            } keyframes: { _ in
                KeyframeTrack(\.scale) { SpringKeyframe(1.3, duration: 0.2, spring: .bouncy); SpringKeyframe(1, spring: .smooth) }
                KeyframeTrack(\.y) { LinearKeyframe(-12, duration: 0.15); SpringKeyframe(0, spring: .snappy) }
            }
    }
}
struct MotionTransitions: View {
    @Namespace private var ns
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var sheet = false
    @State private var detent = PresentationDetent.medium
    let items = ["a", "b"]
    var body: some View {
        NavigationStack {
            List(items, id: \.self) { item in
                NavigationLink(value: item) { Text(item) }
                    .matchedTransitionSource(id: item, in: ns)
            }
            .navigationDestination(for: String.self) { item in
                Text(item).navigationTransition(.zoom(sourceID: item, in: ns))
            }
            .sheet(isPresented: $sheet) {
                Text("Sheet")
                    .presentationDetents([.height(220), .medium, .large], selection: $detent)
                    .presentationDragIndicator(.visible)
                    .presentationBackgroundInteraction(.enabled(upThrough: .medium))
            }
            .animation(reduceMotion ? .easeInOut(duration: 0.2) : .smooth, value: sheet)
        }
    }
}
struct MotionScroll: View {
    var body: some View {
        ScrollView {
            ForEach(0..<5) { _ in
                Rectangle().frame(height: 120)
                    .scrollTransition(.animated(.snappy)) { c, phase in
                        c.opacity(phase.isIdentity ? 1 : 0.4).scaleEffect(phase.isIdentity ? 1 : 0.95)
                    }
            }
        }
    }
}
struct MotionSpringValue: View {
    // Spring value types let you read the physical constants behind a preset.
    var body: some View {
        let s = Spring(duration: 0.5, bounce: 0.3)
        let _ = (s.response, s.dampingRatio, s.stiffness, s.mass)
        Text("x").transaction { t in
            t.animation = t.disablesAnimations ? nil : .snappy
        }
    }
}
struct MotionReduced: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    var body: some View {
        Text("x").offset(y: on ? 0 : 40).opacity(on ? 1 : 0)
            .animation(reduceMotion ? .easeInOut(duration: 0.2) : .snappy, value: on)
        Image(systemName: "wifi")
            .symbolEffect(.variableColor.iterative, options: .repeating, isActive: on && !reduceMotion)
    }
}

/// Where a flick would come to rest (WWDC18 "Designing Fluid Interfaces"); velocity in pt/s, rate per ms.
func project(velocity: CGFloat, decelerationRate: CGFloat = 0.998) -> CGFloat {
    (velocity / 1000) * decelerationRate / (1 - decelerationRate)
}
struct MotionDragRelease: View {
    @State private var y: CGFloat = 0
    @State private var dismissed = false
    private let travel: CGFloat = 300
    var body: some View {
        RoundedRectangle(cornerRadius: 24).frame(height: 400)
            .offset(y: y)
            .gesture(
                DragGesture()
                    .onChanged { y = max(0, $0.translation.height) }   // 1:1 tracking, no animation
                    .onEnded { value in
                        let rest = y + project(velocity: value.velocity.height)
                        let target: CGFloat = rest > travel / 2 ? travel : 0
                        // Normalise: fraction of the remaining distance covered per second.
                        let distance = target - y
                        let v = abs(distance) < 1 ? 0 : value.velocity.height / distance
                        withAnimation(.interpolatingSpring(.smooth, initialVelocity: v)) {
                            y = target
                            dismissed = target == travel
                        }
                    }
            )
    }
}
struct MotionShake: View {
    @State private var failures = 0
    var body: some View {
        TextField("Code", text: .constant(""))
            .keyframeAnimator(initialValue: 0.0, trigger: failures) { c, x in c.offset(x: x) } keyframes: { _ in
                KeyframeTrack {
                    LinearKeyframe(-8, duration: 0.05); LinearKeyframe(8, duration: 0.08)
                    LinearKeyframe(-5, duration: 0.08); SpringKeyframe(0, duration: 0.2, spring: .snappy)
                }
            }
            .sensoryFeedback(.error, trigger: failures)
    }
}
struct MotionHero: View {
    @Namespace private var hero          // one namespace per hero relationship, owned by the common parent
    @State private var open = false
    var body: some View {
        ZStack {
            if open {
                RoundedRectangle(cornerRadius: 28).matchedGeometryEffect(id: "card", in: hero).frame(height: 400)
            } else {
                RoundedRectangle(cornerRadius: 12).matchedGeometryEffect(id: "card", in: hero).frame(width: 80, height: 80)
            }
        }
        .onTapGesture { withAnimation(.smooth) { open.toggle() } }
    }
}
@available(iOS 26, *)
struct MotionGlassMorph: View {
    @Namespace private var ns
    @State private var expanded = false
    var body: some View {
        GlassEffectContainer(spacing: 16) {
            HStack {
                Button("A") { withAnimation(.bouncy) { expanded.toggle() } }.glassEffectID("a", in: ns)
                if expanded { Button("B") { }.glassEffectID("b", in: ns) }
            }
            .buttonStyle(.glass)
        }
    }
}

@available(iOS 26, *)
struct MotionSymbolMatrix: View {
    @State var on = false
    var body: some View {
        VStack {
            Image(systemName: "checkmark.circle").symbolEffect(.drawOn, isActive: on)
            Image(systemName: "checkmark.circle").symbolEffect(.drawOff, isActive: on)
            Image(systemName: on ? "pause.fill" : "play.fill").contentTransition(.symbolEffect(.replace.magic(fallback: .replace)))
            Image(systemName: "wifi").symbolEffect(.breathe, isActive: on)
            Image(systemName: "gear").symbolEffect(.rotate.byLayer, options: .repeat(2), value: on)
            Image(systemName: "wifi").symbolEffect(.appear, isActive: !on).symbolEffect(.disappear, isActive: on)
            Image(systemName: "star").symbolEffect(.bounce.down, value: on).symbolEffect(.bounce, options: .repeat(2).speed(1.5), value: on)
            Image(systemName: "wifi").symbolEffect(.variableColor.cumulative.dimInactiveLayers, isActive: on)
            Image(systemName: "wifi").symbolEffect(.pulse.wholeSymbol, isActive: on)
            Image(systemName: "wifi").symbolEffect(.scale.down.byLayer, isActive: on)
            Image(systemName: "wifi").symbolEffect(.bounce, options: .nonRepeating, value: on)
            Image(systemName: "bell").symbolEffect(.wiggle.clockwise, value: on)
            Image(systemName: "wifi").transition(.symbolEffect(.appear))
            Image(systemName: "wifi").symbolEffect(.variableColor.iterative.hideInactiveLayers.reversing, options: .repeating.speed(2), isActive: on)
            Image(systemName: "wifi").symbolEffectsRemoved()
            Image(systemName: "mic").symbolEffect(.pulse, options: .repeat(.continuous), isActive: on)
        }
    }
}

extension View {
    /// Zoom transition, or the plain push when Reduce Motion is on (the two types differ, so branch).
    @ViewBuilder func zoomTransition<ID: Hashable>(from id: ID, in ns: Namespace.ID, reduced: Bool) -> some View {
        if reduced { self } else { navigationTransition(.zoom(sourceID: id, in: ns)) }
    }
}
struct MotionReducedZoom: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Namespace var ns
    @State private var show = false
    var body: some View {
        VStack {
            if show { Text("x").transition(reduceMotion ? .opacity : .move(edge: .bottom).combined(with: .opacity)) }
            Text("y").zoomTransition(from: "a", in: ns, reduced: reduceMotion)
        }
    }
}
