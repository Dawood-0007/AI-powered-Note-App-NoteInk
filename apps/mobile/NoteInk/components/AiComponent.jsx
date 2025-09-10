import React, { useState } from "react";
import { View, Text, TextInput, Button, Platform, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import main from "@/ai/prompt";
import { useTheme } from "@/colors/theme-provider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function AIChatBar({ visible, onClose, noteText }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "How can I assist you?" }]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const { colors } = useTheme();

  const styles = createStyle(colors);
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setGenerating(true);

    try {
      setInput("");
      const res = await main(input, noteText, messages);
    
      const aiMessage = res || "No response from AI";
      setMessages((prev) => [...prev, { role: "assistant", content: aiMessage }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error from AI" }]);
    }
    setGenerating(false);
    
  };

  const handleClose = () => {
    setMessages([{ role: "assistant", content: "How can I assist you?" }]);
    onClose();
  }

  if (!visible) return null;

  return (
    <View
      style={[
        styles.container,
        Platform.OS === "web" ? styles.web : styles.mobile,
      ]}
    >
      { Platform.OS !== "web" && <View style={ { height: 1, backgroundColor: colors.text, marginBottom: 5 } }></View> }
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>
          <MaterialCommunityIcons name="lightbulb-on" size={20} color={colors.text} />Notes
        </Text>
        <TouchableOpacity onPress={handleClose}><Text style={ { fontSize: 24, color: colors.text, position: "relative", top: -5 }}>ⓧ</Text></TouchableOpacity>
      </View>
      { Platform.OS === "web" &&<hr style={styles.divider}/> }
      { Platform.OS !== "web" && <View style={ { height: 1, backgroundColor: colors.text, marginBottom: 5 } }></View> } 

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={[{ textAlign: item.role === "user" ? "right" : "left", marginLeft: item.role === "user" ? 80 : 0, backgroundColor: item.role === "user" ? "rgb(50, 50, 255)" : "white", color: item.role === "user" ? "white" : "black" }, styles.mainChat]}>
            {item.content}
          </Text>
        )}
        inverted
        contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 10 }}
      />
      {generating && <Text style={{ textAlign: "left", marginVertical: 2, color: colors.text }}>  generating ...</Text>}

      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask AI..."
          style={styles.input}
          placeholderTextColor={colors.text}
        />
        <Button title="Send" disabled={generating} onPress={sendMessage} />
      </View>
    </View>
  );
}

function createStyle(colors) {
  return StyleSheet.create({
  container: {
    position: "fixed",
    backgroundColor: colors.cardBG,
    color: colors.text,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    bottom: 0,
    padding: 10,
    zIndex: 100,
  },
  topHeader : {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  topHeaderText: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    color: colors.text,
  },  
  divider: {
    backgroundColor: "gray",
    marginTop: 28,
    width: "100%"
  },
  mobile: {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "106%",     
  paddingBottom: 10,   
  height: "40%",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  flexShrink: 1,
},
  web: {
    top: 0,
    left: 0,
    height: "100%",
    width: 300,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 5,
    color: colors.text,
  },
  mainChat: {
    padding: 10,
    maxWidth: "70%",
    borderRadius: 15,
    marginVertical: 2,
    overflow: "auto",
    textAlign: "center",
    fontSize: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,

  },
});
}