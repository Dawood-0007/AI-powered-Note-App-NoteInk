import { Stack } from "expo-router";
import { ThemeProvider } from "@/colors/theme-provider";
import "@/App.css"

export default function RootLayout() {

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="add/index" options={{ title: "Add" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    </ThemeProvider>
  );
}
