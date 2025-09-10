import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Platform, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useTheme } from '@/colors/theme-provider'
import React, { useState, useEffect } from 'react'
import Header from '@/components/header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import AIChatBar from '@/components/AiComponent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const index = () => {
    const { id } = useLocalSearchParams();

    const { colors } = useTheme();

    const platform = Platform.OS;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [chatVisible, setChatVisible] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            const storedNote = await AsyncStorage.getItem(`my-notes`);
            let allNotes = JSON.parse(storedNote);
            let myNote = allNotes.find(note => note.id === parseInt(id));
            setTitle(myNote.title);
            setContent(myNote.content);
            setDate(myNote.date);
        };

        fetchNote();
    }, [id]);

    const styles = createStyles(colors);

    const storeData = async (value) => {
        let updatedValue = '';
        try {
            const previousValue = await AsyncStorage.getItem('my-notes');
            const allNotes = previousValue ? JSON.parse(previousValue) : [];

            value = JSON.parse(value);

            const filteredNotes = allNotes.filter(n => n.id !== parseInt(id));

            filteredNotes.push(value);

            updatedValue = JSON.stringify(filteredNotes);

        } catch (e) {
            console.error('Failed to process the data', e);
        }
        try {
            await AsyncStorage.setItem('my-notes', updatedValue);
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
    };

    const handlePressAI = () => {
        setChatVisible(true);
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1, backgroundColor: colors.background }}
                keyboardVerticalOffset={1}
            >
                <SafeAreaView style={[styles.container, { width: platform === "web" ? chatVisible ? "calc(100% - 300px)" : "100%" : "100%", position: "absolute", right: platform === "web" ? chatVisible ? 0 : 0 : 0 }]}>
                    <Header shown={true} page={"edit"} id={id} />
                    <View style={styles.noteAddFields}>
                        <TextInput
                            placeholder='Title Here'
                            style={[styles.input, styles.title, { fontSize: 20 }]}
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor={colors.text}
                        />
                        <Text style={{ paddingLeft: 10, color: colors.text }}>Date : {date}</Text>
                        <TextInput placeholder='Note Here' style={[styles.input, styles.content]} multiline value={content} onChangeText={setContent} placeholderTextColor={colors.text} />
                    </View>

                    <View style={styles.MainText}>
                        <Text style={ { color: colors.text}}>Confirm</Text>
                    </View>

                    <Pressable style={[styles.noteAdder, { bottom: platform !== "web" ? chatVisible ? 350 : 16 : 16 }]} onPress={handlePress}>
                        <Text style={styles.noteAdderText}>✓</Text>
                    </Pressable>

                    <View style={styles.askAIText}>
                        <Text style={ { color: colors.text}}>Ask AI</Text>
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
            width: "100%",
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
            marginTop: 12,
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