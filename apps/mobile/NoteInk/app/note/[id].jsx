import { StyleSheet, Text, View, SafeAreaView, Pressable, StatusBar} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import Header from '@/components/header'
import { useTheme } from '@/colors/theme-provider'

const NoteDetail = () => {
    const { id } = useLocalSearchParams();
    const [note, setNote] = useState(null);

    const { theme, colors } = useTheme();
    const styles = React.useMemo(() => createStyles(colors), [theme, colors]);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const storedNote = await AsyncStorage.getItem(`my-notes`);
                if (storedNote) {
                    let allNotes = JSON.parse(storedNote);
                    let myNote = allNotes.find(note => note.id === parseInt(id));
                    setNote(myNote || null);
                }
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };
        fetchNote();
    }, [id]);

    if (!note) {
        return (
            <SafeAreaView style={styles.container}>
                <Header shown={true} page={"note"} id={null}/>
                <Text style={[styles.text, { textAlign: "center" }]}>
                    Loading note...
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header shown={true} page={"note"} id={null}/>
            <View style={styles.noteFields}>
                <Text style={[styles.title, styles.text]}>{note.title}</Text>
                <Text style={{ paddingLeft: 10, color: colors.text }}>
                    Date : {note.date}
                </Text>
                <Text style={[styles.content, styles.text]}>{note.content}</Text>
            </View>

            <Pressable
                style={styles.noteAdder}
                onPress={() => {
                    router.push({
                        pathname: '/edit/[id]',
                        params: { id: note.id }
                    })
                }}
            >
                <Text style={styles.noteAdderText}>✎</Text>
            </Pressable>

            <StatusBar backgroundColor={colors.text} barStyle="light-content" />
        </SafeAreaView>
    );
}

export default NoteDetail;

function createStyles(colors) {
    return StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: colors.background,
            padding: 16,
            flex: 1,
        },
        noteFields: {
            padding: 16,
        },
        text: {
            padding: 12,
            marginBottom: 12,
            color: colors.text,
        },
        title: {
            fontWeight: 'bold',
            borderBottomWidth: 1,
            borderColor: colors.text,
        },
        content: {
            fontSize: 16,
            fontWeight: 'normal',
            height: 300,
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
        noteAdderText: {
            fontSize: 28,
            color: colors.btnColor,
        },
    })
}
