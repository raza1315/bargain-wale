import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons"
import { View, Text } from "react-native"
import Home from "./screen/Home"
import More from "./screen/More"
import Inventory from "./screen/Inventory"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Placeholder screens
const OrdersScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Orders Screen</Text>
  </View>
)
const AnalyticsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Analytics Screen</Text>
  </View>
)
const BookingsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Bookings Screen</Text>
  </View>
)
const PurchaseScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Purchase Screen</Text>
  </View>
)
const SalesScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Sales Screen</Text>
  </View>
)
const MasterScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Master Screen</Text>
  </View>
)
const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Profile Screen</Text>
  </View>
)

function MoreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreMenu"
        component={More}
        options={{
          title: "More",
          headerRight: () => <Text style={{ color: "#007AFF", marginRight: 16 }}>Edit</Text>,
        }}
      />
      <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown: false }} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="Master" component={MasterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle: "Bargainwale ▼",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerLeft: () => <FontAwesome5 name="store" size={24} color="gray" style={{ marginLeft: 16 }} />,
          headerRight: () => (
            <Ionicons name="notifications-outline" size={24} color="black" style={{ marginRight: 16 }} />
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
              return <Ionicons name={iconName} size={size} color={color} />
            } else if (route.name === "Orders") {
              return <MaterialIcons name="featured-play-list" size={size} color={color} />
            } else if (route.name === "Analytics") {
              iconName = focused ? "stats-chart" : "stats-chart-outline"
              return <Ionicons name={iconName} size={size} color={color} />
            } else if (route.name === "Bookings") {
              return <MaterialIcons name="book" size={size} color={color} />
            } else if (route.name === "More") {
              return <MaterialIcons name="more-horiz" size={size} color={color} />
            }
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="More" component={MoreStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

