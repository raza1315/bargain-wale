import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

const menuItems = [
  {
    id: "inventory",
    title: "Inventory",
    icon: <Ionicons name="folder-outline" size={24} color="#007AFF" />,
    screen: "Inventory",
  },
  {
    id: "purchase",
    title: "Purchase",
    icon: <Ionicons name="cart-outline" size={24} color="#007AFF" />,
    screen: "Purchase",
  },
  {
    id: "sales",
    title: "Sales",
    icon: <MaterialIcons name="attach-money" size={24} color="#007AFF" />,
    screen: "Sales",
  },
  {
    id: "master",
    title: "Master",
    icon: <Ionicons name="time-outline" size={24} color="#007AFF" />,
    screen: "Master",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Ionicons name="person-outline" size={24} color="#007AFF" />,
    screen: "Profile",
  },
]

export default function More({ navigation }) {
  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => navigation.navigate(item.screen)}>
          <View style={styles.menuItemLeft}>
            {item.icon}
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C7C7CC",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 17,
    color: "#000",
  },
})
