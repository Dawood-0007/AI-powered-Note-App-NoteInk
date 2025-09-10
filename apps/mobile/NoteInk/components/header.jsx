import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useTheme } from '@/colors/theme-provider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { router } from 'expo-router';

const Header = ({shown, page, id}) => {
    const { colors, toggleTheme, theme } = useTheme();

    const styles = StylingComponents(colors);

    const handleBackPress = () => {
      if (page === "add" || page === "note") {
        router.push("/");
      } else if (page === "edit")  {
        router.push(`/note/${id}`)
      }
    }

  return (
   <View style={styles.noteHeader}>
    { shown ? <Pressable onPress={handleBackPress}>
      <Text style={ { color: colors.text, fontSize: 35, position: "relative", top: -10} }>←</Text>
    </Pressable> : "" }
        <Text style={styles.noteHeaderText}>
          <MaterialCommunityIcons name="lightbulb-on" size={24} color={colors.text} />Notes</Text>
        <Pressable onPress={toggleTheme}>
          <Ionicons name={theme === "dark" ? "sunny-outline" : "moon-outline"} style={{ cursor: "pointer", marginLeft: 16, marginTop: 6 }} size={24} color={colors.text} /></Pressable>
      </View>
  )
}

export default Header

function StylingComponents(colors) { 
    return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      padding: 16,
      backgroundColor: colors.background,
      flex: 1,
    },
    noteHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#4e4e4eff",
      flexDirection: "row",
    },
    noteHeaderText: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.text,
      flex: 1,
    },
})
}