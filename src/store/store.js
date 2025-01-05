import { create } from 'zustand'

export const useStore = create((set) => ({
  // Menu items
  menuItems: [],
  addMenuItem: (item) => set((state) => ({ 
    menuItems: [...state.menuItems, item] 
  })),
  removeMenuItem: (id) => set((state) => ({ 
    menuItems: state.menuItems.filter(item => item.id !== id) 
  })),

  // Orders
  orders: [],
  addOrder: (order) => set((state) => ({ 
    orders: [...state.orders, order] 
  })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
  })),

  // Tables
  tables: [],
  updateTableStatus: (tableId, status) => set((state) => ({
    tables: state.tables.map(table =>
      table.id === tableId ? { ...table, status } : table
    )
  })),

  // Reservations
  reservations: [],
  addReservation: (reservation) => set((state) => ({
    reservations: [...state.reservations, reservation]
  })),
  removeReservation: (id) => set((state) => ({
    reservations: state.reservations.filter(res => res.id !== id)
  })),

  // Inventory
  inventory: [],
  updateInventory: (itemId, quantity) => set((state) => ({
    inventory: state.inventory.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
  })),
}))
