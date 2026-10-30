#!/usr/bin/env bash
# Type-check the Swift snippets in tests/swift against the 26 SDKs (needs Xcode 26).
# Each platform file is compiled together with common.swift. Missing SDKs are skipped, not failed.
set -u
cd "$(dirname "$0")/../tests/swift"
MC="${TMPDIR:-/tmp}/apple-ui-skills-modcache"
mkdir -p "$MC"

check() { # name sdk target file
  local sdkpath
  sdkpath="$(xcrun --sdk "$2" --show-sdk-path 2>/dev/null)" || { echo "skip  $1 (SDK $2 not installed)"; return 0; }
  if xcrun swiftc -typecheck -module-cache-path "$MC" -sdk "$sdkpath" -target "$3" common.swift "$4" 2>&1; then
    echo "ok    $1"
  else
    echo "FAIL  $1"; return 1
  fi
}

rc=0
check iOS      iphonesimulator arm64-apple-ios26.0-simulator    ios.swift    || rc=1
check macOS    macosx          arm64-apple-macos26.0            macos.swift  || rc=1
check visionOS xrsimulator     arm64-apple-xros26.0-simulator   vision.swift || rc=1
check watchOS  watchsimulator  arm64-apple-watchos26.0-simulator watch.swift || rc=1
exit $rc
