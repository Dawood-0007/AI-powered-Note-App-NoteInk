import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useTheme } from '@/colors/theme-provider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import { router } from 'expo-router';
import ConfirmBox from './ConfirmComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({shown, page, id}) => {
    const { colors, toggleTheme, theme } = useTheme();

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showConfirmBack, setShowConfirmBack] = useState(false);

    const styles = StylingComponents(colors);

    const handleBackPress = () => {
      if (page === "add" || page === "note") {
        setShowConfirmBack(false)
        router.push("/");
      } else if (page === "edit")  {
        setShowConfirmBack(false)
        router.push(`/note/${id}`)
      }
    };

    const handleCancelDelete = () => {
    setShowConfirmDelete(false)
  }

    const handleCancelBack = () => {
    setShowConfirmBack(false)
  }

  const handleDelete  = async () => {
     let updatedValue = '';
        try {
            const previousValue = await AsyncStorage.getItem('my-notes');
            const allNotes = previousValue ? JSON.parse(previousValue) : [];

            const filteredNotes = allNotes.filter(n => n.id !== parseInt(id));

            updatedValue = JSON.stringify(filteredNotes);
            
            await AsyncStorage.setItem('my-notes', updatedValue);

            setShowConfirmDelete(false)
            
            router.push('/');
        } catch (e) {
            console.error('Failed to process the data', e);
        }
  };

  const handleConfirmBox = () => {
    setShowConfirmDelete(true)
  }

  const handleConfirmBack = () => {
    if (page === "note") {
      handleBackPress()
      return;
    }
    setShowConfirmBack(true)
  }

  return (
   <View style={styles.noteHeader}>
    { shown ? <Pressable onPress={handleConfirmBack}>
      <Text style={ { color: colors.text, fontSize: 35, position: "relative", top: -10} }>←</Text>
    </Pressable> : "" }
        <Text style={styles.noteHeaderText}>
          <MaterialCommunityIcons name="lightbulb-on" size={24} color={colors.text} />Notes</Text>
          <View style={{ gap: "20px", flexDirection: "row"}}>
            {page === "note" && <Pressable onPress={handleConfirmBox} style={{ cursor: "pointer", marginTop: 6}}>
              <AntDesign name="delete" size={24} color={colors.text} />
            </Pressable>}
            
        <Pressable onPress={toggleTheme}>
          <Ionicons name={theme === "dark" ? "sunny-outline" : "moon-outline"} style={{ cursor: "pointer", marginLeft: 16, marginTop: 6 }} size={24} color={colors.text} /></Pressable>
        </View>
          <ConfirmBox
        visible={showConfirmDelete}
        message="Are you sure you want to delete?"
        theme={theme}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />

          <ConfirmBox
        visible={showConfirmBack}
        message="Are you sure, Your unsaved note will be lost"
        theme={theme}
        onConfirm={handleBackPress}
        onCancel={handleCancelBack}
      />
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