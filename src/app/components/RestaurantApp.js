'use client';

import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, ShoppingCart, Store, Package, Calendar } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

// Componenti per le diverse sezioni
const MenuSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Menu</h2>
    <div className="grid gap-4">
      {['Entrée', 'Antipasti', 'Primi', 'Secondi', 'Dessert'].map((category) => (
        <Card key={category}>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <div className="space-y-2">
              {/* Esempio di piatto */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Nome Piatto</h4>
                  <p className="text-sm text-gray-600">Ingredienti: pomodoro, mozzarella, basilico</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">€10.00</p>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Modifica</Button>
                    <Button variant="destructive" size="sm">Elimina</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const OrdersSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Ordini</h2>
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Tavolo 1 - Sala A</h3>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">In corso</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p>2x Margherita</p>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Modifica</Button>
                <Button variant="destructive" size="sm">Elimina</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TablesSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Sale</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">Sala A</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((table) => (
              <div key={table} className="p-2 border rounded">
                <p className="font-medium">Tavolo {table}</p>
                <p className="text-sm text-gray-600">4 posti</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const InventorySection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Inventario</h2>
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {['Pomodori', 'Mozzarella', 'Basilico'].map((item) => (
              <div key={item} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{item}</h4>
                  <p className="text-sm text-gray-600">Quantità: 100</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Modifica</Button>
                  <Button variant="destructive" size="sm">Elimina</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ReservationsSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Prenotazioni</h2>
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {[
              { date: '2025-01-05', time: '20:00', people: 4, table: 1 }
            ].map((reservation, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{reservation.date} - {reservation.time}</h4>
                  <p className="text-sm text-gray-600">
                    Tavolo {reservation.table} - {reservation.people} persone
                  </p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Modifica</Button>
                  <Button variant="destructive" size="sm">Elimina</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('menu');

  const navItems = [
    { id: 'menu', label: 'Menu', icon: BookOpen },
    { id: 'orders', label: 'Ordini', icon: ShoppingCart },
    { id: 'tables', label: 'Sale', icon: Store },
    { id: 'inventory', label: 'Inventario', icon: Package },
    { id: 'reservations', label: 'Prenotazioni', icon: Calendar },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'menu':
        return <MenuSection />;
      case 'orders':
        return <OrdersSection />;
      case 'tables':
        return <TablesSection />;
      case 'inventory':
        return <InventorySection />;
      case 'reservations':
        return <ReservationsSection />;
      default:
        return <MenuSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-30 md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold">Ristorante</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsNavOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveSection(item.id);
                  setIsNavOpen(false);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsNavOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default App;