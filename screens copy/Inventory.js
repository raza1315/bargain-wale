'use client';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const inventoryData = [
  { id: '001', name: 'Vanaspati', quantity: 10, type: 'Rack' },
  { id: '002', name: 'Ruchi', quantity: 20, type: 'Depo' },
  { id: '003', name: 'Sunflower', quantity: 15, type: 'Plant' },
];

const warehouses = [
  {
    id: 1,
    name: 'Prayagraj Warehouse',
    description: 'Select this for getting the data of this warehouse'
  },
  {
    id: 2,
    name: 'Gorakhpur Warehouse',
    description: 'Select this for getting the data of this warehouse'
  },
  {
    id: 3,
    name: 'Varanasi Warehouse',
    description: 'Select this for getting the data of this warehouse'
  }
];

const inventoryTypes = [
  {
    id: 'all',
    name: 'All',
    description: 'Select all inventory types.'
  },
  {
    id: 'rack',
    name: 'Rack',
    description: 'Select this inventory type where the cargo is getting transported by the train.'
  },
  {
    id: 'plant',
    name: 'Plant',
    description: 'Select this inventory type where the cargo is stored in a plant.'
  },
  {
    id: 'depo',
    name: 'Depo',
    description: 'Select this inventory type where the cargo is kept in a depo.'
  }
];

const itemHistory = [
  {
    date: '24th Oct. 2024',
    title: 'Order Billed on 24th Oct. 2024',
    subtitle: 'Warehouse: Divyanshu Trading Company',
    color: '#FF9500'
  },
  {
    date: '16th Oct. 2024',
    title: 'Order Virtualized on 16th Oct. 2024',
    subtitle: 'Items shifted from the Overbooked to Virtual.',
    color: '#000'
  },
  {
    date: '24th Oct. 2024',
    title: 'Order in Overbook on 24th Oct. 2024',
    subtitle: 'Item value added in the Over booked situation.',
    color: '#34C759'
  }
];

export default function Inventory({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Virtual');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0]);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(['all']);
  const [showItemSheet, setShowItemSheet] = useState(false);

  const handleTypeSelection = (typeId) => {
    if (typeId === 'all') {
      setSelectedTypes(['all']);
    } else {
      const newTypes = selectedTypes.filter(t => t !== 'all');
      if (selectedTypes.includes(typeId)) {
        setSelectedTypes(newTypes.filter(t => t !== typeId));
      } else {
        setSelectedTypes([...newTypes, typeId]);
      }
    }
  };

  const ItemDetailSheet = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showItemSheet}
      onRequestClose={() => {
        setShowItemSheet(false);
        setSelectedItem(null);
      }}
    >
      <Pressable 
        style={styles.modalOverlay}
        onPress={() => {
          setShowItemSheet(false);
          setSelectedItem(null);
        }}
      >
        <View style={styles.itemSheetView}>
          <View style={styles.itemSheetHandle} />
          <Text style={styles.itemId}>@Item{selectedItem?.id}</Text>
          <Text style={styles.itemName}>{selectedItem?.name}</Text>
          <Text style={styles.lastUpdated}>24th October 2024 last updated on.</Text>

          <Text style={styles.historyTitle}>Item History</Text>
          {itemHistory.map((history, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={[styles.historyDot, { backgroundColor: history.color }]} />
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>{history.title}</Text>
                <Text style={styles.historySubtitle}>{history.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </Pressable>
    </Modal>
  );

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilterModal}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <Pressable 
        style={styles.modalOverlay}
        onPress={() => setShowFilterModal(false)}
      >
        <View style={styles.modalView}>
          {inventoryTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={styles.filterOption}
              onPress={() => handleTypeSelection(type.id)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  selectedTypes.includes(type.id) && styles.checkboxSelected
                ]}>
                  {selectedTypes.includes(type.id) && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </View>
              <View style={styles.filterOptionText}>
                <Text style={styles.filterOptionTitle}>{type.name}</Text>
                <Text style={styles.filterOptionDescription}>{type.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => setShowFilterModal(false)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventory</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.warehouseSelectorContainer}>
        <TouchableOpacity 
          style={styles.warehouseSelector}
          onPress={() => setShowWarehouseModal(true)}
        >
          <View style={styles.warehouseLeft}>
            <MaterialIcons name="apartment" size={24} color="#666" />
            <Text style={styles.warehouseText}>{selectedWarehouse.name}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowFilterModal(true)}
        >
          <MaterialIcons name="menu" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {['Virtual', 'Billed', 'Booked'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.idCell,{fontWeight: 'bold',marginTop: 12,marginLeft:5}]}>ItemId</Text>
          <Text style={[styles.tableCell, styles.nameCell,{fontWeight: 'bold',marginTop: 12}]}>Name</Text>
          <Text style={[styles.tableCell, styles.quantityCell,{fontWeight: 'bold',marginTop: 12}]}>Quantity</Text>
          <Text style={[styles.tableCell, styles.typeCell,{fontWeight: 'bold',marginTop: 12,marginRight:5}]}>Type</Text>
        </View>
        <ScrollView>
          {inventoryData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}
              onPress={() => {
                setSelectedItem(item);
                setShowItemSheet(true);
              }}
            >
              <Text style={[styles.tableCell, styles.idCell]}>{item.id}</Text>
              <Text style={[styles.tableCell, styles.nameCell]}>{item.name}</Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.typeCell]}>{item.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showWarehouseModal}
        onRequestClose={() => setShowWarehouseModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowWarehouseModal(false)}
        >
          <View style={styles.modalView}>
            {warehouses.map((warehouse) => (
              <TouchableOpacity
                key={warehouse.id}
                style={styles.warehouseOption}
                onPress={() => {
                  setSelectedWarehouse(warehouse);
                  setShowWarehouseModal(false);
                }}
              >
                <MaterialIcons name="apartment" size={24} color="#666" />
                <View style={styles.warehouseOptionText}>
                  <Text style={styles.warehouseOptionTitle}>{warehouse.name}</Text>
                  <Text style={styles.warehouseOptionDescription}>{warehouse.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <FilterModal />
      {selectedItem && <ItemDetailSheet />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(224,224,224)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  warehouseSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  warehouseSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  warehouseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warehouseText: {
    fontSize: 15,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  itemSheetView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 8,
    maxHeight: '80%',
  },
  itemSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  warehouseOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  warehouseOptionText: {
    marginLeft: 12,
  },
  warehouseOptionTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 4,
  },
  warehouseOptionDescription: {
    fontSize: 13,
    color: '#666',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
  },
  filterOptionText: {
    flex: 1,
  },
  filterOptionTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 4,
  },
  filterOptionDescription: {
    fontSize: 13,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  evenRow: {
    backgroundColor: '#F9F9F9',
  },
  tableCell: {
    fontSize: 15,
  },
  idCell: {
    flex: 1,
  },
  nameCell: {
    flex: 2,
  },
  quantityCell: {
    flex: 1,
    textAlign: 'center',
  },
  typeCell: {
    flex: 1,
    textAlign: 'right',
  },
  itemId: {
    fontSize: 15,
    color: '#666',
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  historyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
    marginTop: 6,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 13,
    color: '#666',
  },
});