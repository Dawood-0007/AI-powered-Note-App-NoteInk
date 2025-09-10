import { Text, View, StyleSheet, Pressable, FlatList, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "@/colors/theme-provider";
import { router } from "expo-router";
import Header from "@/components/header";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const { colors } = useTheme();

  const [currentData, setCurrentData] = useState([]);

  const styles = createStyles(colors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('my-notes');
        if (value !== null) {
          const notes = JSON.parse(value);
          setCurrentData(notes.slice().reverse());
        } else {
          setCurrentData([]);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    }}>
      <Header shown={false} page={"nil"} id={null} />

      <FlatList
        data={currentData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/note/${item.id}`)}>
            <View style={styles.noteContent}>
              <Text style={[styles.noteContentText, styles.noteContentHeader]}>
                {item.title.trim() === "" ? "No Title" : item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
              </Text>
              <Text style={styles.noteContentText}>Date : {item.date}</Text>
              <Text style={styles.noteContentText}>
                {item.content.trim() === "" ? "No Content" : item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <Text style={{ color: colors.text, textAlign: "center", marginTop: 20 }}>
            No notes yet
          </Text>
        }
      />

      <View style={styles.MainText}>
        <Text style={{ color: colors.text }}>Add</Text>
      </View>

      <Pressable style={styles.noteAdder} onPress={() => { router.push("/add") }}>
        <Text style={styles.noteAdderText}>+</Text>
      </Pressable>

      <StatusBar backgroundColor={colors.text} barStyle="light-content" />
    </SafeAreaView>
  );
}

function createStyles(themeColor) {
  return StyleSheet.create({
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
      color: themeColor.text,
      flex: 1,
    },
    noteContainer: {
      flex: 1,
      alignItems: "center",
      height: 700,
    },
    noteContent: {
      padding: 16,
      backgroundColor: themeColor.boxColor,
      borderRadius: 8,
      width: "98%",
      marginTop: 16,
    },
    noteContentText: {
      fontSize: 16,
      lineHeight: 24,
      color: themeColor.text,
    },
    noteContentHeader: {
      fontWeight: "bold",
    },
    noteAdder: {
      position: "absolute",
      bottom: 16,
      right: 16,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: themeColor.btnColorBackground,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    noteAdderText: {
      fontSize: 28,
      color: themeColor.btnColor,
    },
    noteContainerMain: {
      flexDirection: "column",
      alignContent: "center",
      width: "100%",
      paddingLeft: 16,
    },
    MainText: {
      position: "absolute",
      bottom: 82,
      right: 33,
    }
  });
}
