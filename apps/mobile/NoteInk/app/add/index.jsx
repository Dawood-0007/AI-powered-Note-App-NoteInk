import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, StatusBar } from 'react-native'
import { useTheme } from '@/colors/theme-provider'
import React, { useState } from 'react'
import Header from '@/components/header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, Stack } from 'expo-router'
import AIChatBar from "@/components/AiComponent";
import { Platform, KeyboardAvoidingView } from 'react-native';

const index = () => {
    const { colors } = useTheme();

    const platform = Platform.OS;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [chatVisible, setChatVisible] = useState(false);


    const styles = createStyles(colors)

    const date = new Date().toLocaleDateString();

    const storeData = async (value) => {
        try {
            const previousValue = await AsyncStorage.getItem('my-notes');
            let notes = [];
            if (previousValue !== null) {
                const parsedValue = JSON.parse(previousValue);
                notes = parsedValue;
            }
            notes.push(JSON.parse(value));
            value = JSON.stringify(notes);
        } catch (e) {
            console.error('Failed to fetch the data from the storage', e);
        }
        try {
            await AsyncStorage.setItem('my-notes', value);
            router.push('/');
        } catch (e) {
            console.error('Failed to save the data to the storage', e);
        }
    }

    const handlePress = async () => {
        let nextId = 1;
        try {
            const previousValue = await AsyncStorage.getItem('my-notes');
            if (previousValue !== null) {
                const notes = JSON.parse(previousValue);
                const lastNote = notes[notes.length - 1];
                nextId = lastNote.id + 1;
            }
        } catch (e) {
            console.error('Failed to fetch the data from the storage', e);
        }
        const note = {
            id: nextId,
            title,
            content,
            date
        };

        storeData(JSON.stringify(note));
        setTitle('');
        setContent('');

        router.push("/");
    }

    const handlePressAI = () => {
        setChatVisible(true);
    }

    return (
        <>
            <Stack.Screen name="add" options={{ title: "Add Note", headerShown: false }} />
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1, backgroundColor: colors.background }}
                keyboardVerticalOffset={1}
            >
                <SafeAreaView style={[styles.container, { width: platform === "web" ? chatVisible ? "calc(100% - 300px)" : "100%" : "100%", position: "absolute", right: platform === "web" ? chatVisible ? 0 : 0 : 0 }]}>

                    <Header shown={true} page={"add"} id={null} />
                    <View style={styles.noteAddFields}>
                        <TextInput
                            placeholder='Title Here'
                            style={[styles.input, styles.title, { fontSize: 20 }]}
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor={colors.text}
                        />
                        <Text style={{ paddingLeft: 10, color: colors.text }}>Date : {date}</Text>
                        <TextInput placeholder='Note Here'
                            placeholderTextColor={colors.text} style={[styles.input, styles.content]} multiline value={content} onChangeText={setContent} />
                    </View>

                    <View style={styles.MainText}>
                        <Text style={{ color: colors.text}}>Confirm</Text>
                    </View>

                    <Pressable style={[styles.noteAdder, { bottom: platform !== "web" ? chatVisible ? 350 : 16 : 16 }]} onPress={handlePress}>
                        <Text style={styles.noteAdderText}>✓</Text>
                    </Pressable>
                    <View style={styles.askAIText}>
                        <Text style={{ color: colors.text}}>Ask AI</Text>
                    </View>
                    <Pressable style={[styles.noteAdderAI, { bottom: platform !== "web" ? chatVisible ? 350 : 16 : 16 }]} onPress={handlePressAI}>

                        <Text style={styles.noteAdderText}>
                            <MaterialCommunityIcons name="pencil-plus-outline" size={24} color={colors.btnColor} />
                        </Text>
                    </Pressable>

                    <AIChatBar
                        visible={chatVisible}
                        onClose={() => setChatVisible(false)}
                        noteText={content.trim() === "" ? "null" : content}
                    />

                    <StatusBar backgroundColor={colors.text} barStyle="light-content" />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
}

export default index

function createStyles(colors) {
    return StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: colors.background,
            padding: 16,
            flex: 1,
        },
        input: {
            padding: 12,
            marginBottom: 12,
            borderWidth: 0,
            color: colors.text,
        },
        noteAddFields: {
            padding: 12,

        },
        title: {
            fontWeight: 'bold',
            borderBottomWidth: 1,
            borderColor: "gray",
        },
        content: {
            fontSize: 16,
            fontWeight: 'normal',
            paddingBottom: 100,
        },
        noteAdder: {
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.btnColorBackground,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
        },
        noteAdderAI: {
            position: "absolute",
            bottom: 16,
            right: 82,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.btnColorBackground,
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
            color: colors.btnColor,
        },
        askAIText: {
            position: "absolute",
            bottom: 82,
            right: 95,
        },
        MainText: {
            position: "absolute",
            bottom: 82,
            right: 23,
        }
    })
}