import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useTheme } from '@/colors/theme-provider';

export default function ConfirmBox({ visible, message, onConfirm, onCancel, theme }) {
    const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={[styles.overlay, { backgroundColor: colors.background + "aa" }]}>
        <View
          style={[
            styles.box,
            {
              backgroundColor: colors.background,
              borderColor: theme === "light" ? "black" : "white",
              borderWidth: 1,
              shadowColor: theme === "light" ? "black" : "white",
            },
          ]}
        >
          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onConfirm} style={styles.btn}>
              <Text style={{ color: colors.text }}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel} style={styles.btn}>
              <Text style={{ color: colors.text }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    width: "100%",
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "rgb(158,158,158)",
    marginHorizontal: 10,
  },
});
