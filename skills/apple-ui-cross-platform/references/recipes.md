# Cross-platform recipes

Tested recipes for React Native / Expo and Flutter (Cupertino) that implement Apple 26-series HIG principles using native-rendered or platform-adaptive controls.

---

## 1. React Native / Expo

### Inset Grouped List (Settings pattern)

Uses iOS semantic platform colors so light/dark mode and high contrast adapt automatically.

```tsx
import React from 'react';
import { View, Text, StyleSheet, Platform, PlatformColor, Pressable } from 'react-native';

interface RowProps {
  label: string;
  value?: string;
  isLast?: boolean;
  onPress?: () => void;
}

export function InsetGroupedSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionContainer}>
      {title && <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>}
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export function InsetGroupedRow({ label, value, isLast, onPress }: RowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <Text style={styles.rowLabel}>{label}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      {!isLast && <View style={styles.separator} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { marginHorizontal: 16, marginVertical: 12 },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '400',
    color: Platform.OS === 'ios' ? PlatformColor('secondaryLabel') : '#666',
    marginBottom: 6,
    marginLeft: 16,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: Platform.OS === 'ios' ? PlatformColor('secondarySystemGroupedBackground') : '#fff',
    borderRadius: 14,
    overflow: 'hidden',
  },
  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowPressed: {
    backgroundColor: Platform.OS === 'ios' ? PlatformColor('systemFill') : '#f0f0f0',
  },
  rowLabel: {
    fontSize: 17,
    color: Platform.OS === 'ios' ? PlatformColor('label') : '#000',
  },
  rowValue: {
    fontSize: 17,
    color: Platform.OS === 'ios' ? PlatformColor('secondaryLabel') : '#8e8e93',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Platform.OS === 'ios' ? PlatformColor('separator') : '#e0e0e0',
  },
});
```

### Apple-style Buttons (Prominent, Tinted, Destructive)

```tsx
import React from 'react';
import { Pressable, Text, StyleSheet, Platform, PlatformColor } from 'react-native';

type ButtonVariant = 'prominent' | 'tinted' | 'plain' | 'destructive';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress: () => void;
  disabled?: boolean;
}

export function AppleButton({ title, variant = 'prominent', onPress, disabled }: ButtonProps) {
  const isIos = Platform.OS === 'ios';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'prominent' && styles.prominent,
        variant === 'tinted' && styles.tinted,
        variant === 'destructive' && styles.destructive,
        variant === 'plain' && styles.plain,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === 'prominent' && styles.textWhite,
          variant === 'destructive' && styles.textWhite,
          variant === 'tinted' && (isIos ? { color: PlatformColor('systemBlue') } : { color: '#007aff' }),
          variant === 'plain' && (isIos ? { color: PlatformColor('systemBlue') } : { color: '#007aff' }),
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  prominent: {
    backgroundColor: Platform.OS === 'ios' ? PlatformColor('systemBlue') : '#007aff',
  },
  tinted: {
    backgroundColor: Platform.OS === 'ios' ? PlatformColor('systemFill') : '#e5f1ff',
  },
  destructive: {
    backgroundColor: Platform.OS === 'ios' ? PlatformColor('systemRed') : '#ff3b30',
  },
  plain: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.38,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  textWhite: {
    color: '#ffffff',
  },
});
```

### Action Sheet Confirmation (Destructive pattern)

```tsx
import { ActionSheetIOS, Platform, Alert } from 'react-native';

export function confirmDestructiveAction(onDelete: () => void) {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Delete Item',
        message: 'This action cannot be undone.',
        options: ['Delete', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) onDelete();
      }
    );
  } else {
    Alert.alert('Delete Item', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  }
}
```

### Liquid Glass Surface Fallback (`expo-blur`)

```tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export function GlassContainer({ children }: { children: React.ReactNode }) {
  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={80} tint="systemChromeMaterial" style={styles.glass}>
        {children}
      </BlurView>
    );
  }
  // Android fallback (opaque card)
  return <View style={styles.fallback}>{children}</View>;
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  fallback: {
    borderRadius: 20,
    backgroundColor: '#f2f2f7',
    padding: 16,
    elevation: 3,
  },
});
```

---

## 2. Flutter (Cupertino)

### Inset Grouped Section

```dart
import 'package:flutter/cupertino.dart';

Widget buildSettingsSection(BuildContext context) {
  return CupertinoListSection.insetGrouped(
    header: const Text('ACCOUNT SETTINGS'),
    children: [
      CupertinoListTile(
        title: const Text('Profile'),
        leading: const Icon(CupertinoIcons.person),
        trailing: const CupertinoListTileChevron(),
        onTap: () {},
      ),
      CupertinoListTile(
        title: const Text('Sync with iCloud'),
        leading: const Icon(CupertinoIcons.cloud),
        trailing: CupertinoSwitch(
          value: true,
          onChanged: (bool value) {},
        ),
      ),
    ],
  );
}
```

### Action Sheet Modal Confirmation

```dart
import 'package:flutter/cupertino.dart';

void showActionConfirmation(BuildContext context) {
  showCupertinoModalPopup<void>(
    context: context,
    builder: (BuildContext context) => CupertinoActionSheet(
      title: const Text('Delete Resource'),
      message: const Text('Are you sure you want to delete this resource?'),
      actions: <CupertinoActionSheetAction>[
        CupertinoActionSheetAction(
          isDestructiveAction: true,
          onPressed: () {
            Navigator.pop(context);
            // Execute delete
          },
          child: const Text('Delete'),
        ),
      ],
      cancelButton: CupertinoActionSheetAction(
        isDefaultAction: true,
        onPressed: () => Navigator.pop(context),
        child: const Text('Cancel'),
      ),
    ),
  );
}
```
