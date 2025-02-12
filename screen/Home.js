import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  // Dummy data for different time periods
  const chartData = {
    "7days": {
      labels: ["Feb 4", "Feb 5", "Feb 6", "Feb 7", "Feb 8", "Feb 9", "Feb 10"],
      datasets: [
        {
          data: [90, 135, 127, 128, 120, 137, 135],
          color: () => "red",
          key: "Vanaspati",
          label: "Vanaspati",
        },
        {
          data: [98, 145, 107, 88, 83, 97, 94],
          color: () => "#007AFF",
          key: "Palm Oil",
          label: "Palm Oil",
        },
        {
          data: [85, 125, 88, 75, 61, 88, 84],
          color: () => "yellow",
          key: "Soybean Oil",
          label: "Soybean Oil",
        },
        {
          data: [70, 110, 95, 85, 70, 80, 75],
          color: () => "lightgreen",
          key: "Sunflower Oil",
          label: "Sunflower Oil",
        },
      ],
    },
    "30days": {
      labels: [
        "Jan 10",
        "Jan 15",
        "Jan 20",
        "Jan 25",
        "Jan 30",
        "Feb 5",
        "Feb 10",
      ],
      datasets: [
        {
          data: [95, 125, 117, 138, 130, 127, 135],
          color: () => "red",
          key: "Vanaspati",
          label: "Vanaspati",
        },
        {
          data: [88, 135, 117, 98, 93, 87, 94],
          color: () => "#007AFF",
          key: "Palm Oil",
          label: "Palm Oil",
        },
        {
          data: [75, 115, 98, 85, 71, 78, 84],
          color: () => "yellow",
          key: "Soybean Oil",
          label: "Soybean Oil",
        },
        {
          data: [60, 100, 85, 95, 80, 70, 75],
          color: () => "lightgreen",
          key: "Sunflower Oil",
          label: "Sunflower Oil",
        },
      ],
    },
    "3months": {
      labels: ["Nov", "Dec", "Jan", "Feb"],
      datasets: [
        {
          data: [110, 125, 137, 135],
          color: () => "red",
          key: "Vanaspati",
          label: "Vanaspati",
        },
        {
          data: [108, 115, 97, 94],
          color: () => "#007AFF",
          key: "Palm Oil",
          label: "Palm Oil",
        },
        {
          data: [95, 105, 88, 84],
          color: () => "yellow",
          key: "Soybean Oil",
          label: "Soybean Oil",
        },
        {
          data: [80, 90, 85, 75],
          color: () => "lightgreen",
          key: "Sunflower Oil",
          label: "Sunflower Oil",
        },
      ],
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Greeting Card */}
        <View style={styles.card}>
          <Text style={styles.greetingTitle}>Good Evening, Admin</Text>
          <Text style={styles.greetingSubtitle}>
            Here is what's happening with your store today
          </Text>
        </View>

        {/* Update Price Card */}
        <TouchableOpacity style={styles.updateCard}>
          <View style={styles.updateIcon}>
            <FontAwesome5 name="rupee-sign" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.updateTitle}>Update Price</Text>
            <Text style={styles.updateSubtitle}>
              Update daily prices of items here.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Chart Section */}
        <View style={styles.chartCard}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedPeriod === "7days" && styles.activeTab,
              ]}
              onPress={() => setSelectedPeriod("7days")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedPeriod === "7days" && styles.activeTabText,
                ]}
              >
                7 Days
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedPeriod === "30days" && styles.activeTab,
              ]}
              onPress={() => setSelectedPeriod("30days")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedPeriod === "30days" && styles.activeTabText,
                ]}
              >
                30 Days
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedPeriod === "3months" && styles.activeTab,
              ]}
              onPress={() => setSelectedPeriod("3months")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedPeriod === "3months" && styles.activeTabText,
                ]}
              >
                3 Months
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: "red" }]} />
              <Text style={styles.legendText}>Vanaspati</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#007AFF" }]}
              />
              <Text style={styles.legendText}>Palm Oil</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "yellow" }]}
              />
              <Text style={styles.legendText}>Soybean Oil</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "lightgreen" }]}
              />
              <Text style={styles.legendText}>Sunflower Oil</Text>
            </View>
          </View>

          <LineChart
            data={chartData[selectedPeriod]}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontWeight: "500",
              },
              propsForDots: {
                r: "5",
              },
            }}
            bezier
            style={styles.chart}
          />

          <View style={styles.chartNavigation}>
            <TouchableOpacity style={styles.navButtonContainer}>
              <AntDesign name="arrowleft" size={16} color="#007AFF" />
              <Text style={styles.navButton}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButtonContainer}>
              <Text style={[styles.navButton, styles.navButtonRight]}>
                Next
              </Text>
              <AntDesign name="arrowright" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Active Orders */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>No. of Active Orders</Text>
            <Text style={styles.statsNumber}>04</Text>
            <TouchableOpacity style={styles.blueButton}>
              <Text style={styles.buttonText}>View Orders</Text>
            </TouchableOpacity>
          </View>

          {/* Active Bookings */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>No. of Active Bookings</Text>
            <Text style={styles.statsNumber}>04</Text>
            <TouchableOpacity style={styles.yellowButton}>
              <Text style={{ ...styles.buttonText, color: "black" }}>
                View Bookings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Order Value */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Total Order Value</Text>
            <Text style={styles.statsNumber}>₹1,82,325</Text>
            <TouchableOpacity style={styles.greenButton}>
              <Text style={styles.buttonText}>View Order Value</Text>
            </TouchableOpacity>
          </View>

          {/* Booking Value */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Total Booking Value</Text>
            <Text style={styles.statsNumber}>₹1,82,325</Text>
            <TouchableOpacity style={styles.redButton}>
              <Text style={styles.buttonText}>View Booking Value</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(224,224,224)",
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: "#C7C7CC",
    borderWidth: 1,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  greetingSubtitle: {
    color: "gray",
    fontSize: 16,
  },
  updateCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  updateIcon: {
    backgroundColor: "#FFD700",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  updateSubtitle: {
    color: "gray",
  },
  chartCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  activeTabText: {
    color: "white",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    justifyContent: "space-around",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  chart: {
    marginRight: 8,
    borderRadius: 16,
  },
  chartNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  navButton: {
    color: "#007AFF",
    fontSize: 16,
  },
  navButtonRight: {
    textAlign: "right",
  },
  navButtonContainer: {
    gap: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  statsCard: {
    backgroundColor: "white",
    width: "45%",
    margin: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C7C7CC",
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgb(0,0,0,0.1)",
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  blueButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
  },
  yellowButton: {
    backgroundColor: "#FFD700",
    padding: 8,
    borderRadius: 8,
  },
  greenButton: {
    backgroundColor: "#34C759",
    padding: 8,
    borderRadius: 8,
  },
  redButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
});
