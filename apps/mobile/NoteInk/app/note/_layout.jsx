import { Stack } from "expo-router";

export default function NotePageLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[id]" options={{ title: "Note Detail" , headerShown: false }} />
      </Stack>
  );
}
