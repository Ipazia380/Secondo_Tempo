'use client';

import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, ShoppingCart, Store, Package, Calendar, Plus, Search } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Calendar as CalendarComponent } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useForm } from 'react-hook-form';
import { useMenu } from '../../hooks/useMenu';
import { useReservations } from '../../hooks/useReservations';
import { toast } from 'react-toastify';

// Componenti per le diverse sezioni
const MenuSection = () => {
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const { dishes, isLoading, addDish } = useMenu();
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      ingredients: '',
      price: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await addDish.mutateAsync(data);
      setIsAddDishOpen(false);
      form.reset();
      toast.success('Piatto aggiunto con successo!');
    } catch (error) {
      toast.error('Errore durante l\'aggiunta del piatto');
    }
  };

  if (isLoading) {
    return <div>Caricamento menu...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Aggiungi Piatto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Piatto</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli del nuovo piatto da aggiungere al menu.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome del Piatto</Label>
                <Input id="name" placeholder="es. Margheritaaaa" />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Entrée', 'Antipasti', 'Primi', 'Secondi', 'Dessert'].map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ingredients">Ingredienti</Label>
                <Textarea id="ingredients" placeholder="Inserisci gli ingredienti" />
              </div>
              <div>
                <Label htmlFor="price">Prezzo</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>Salva Piatto</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="antipasti">
        <TabsList className="w-full justify-start">
          {['Entrée', 'Antipasti', 'Primi', 'Secondi', 'Dessert'].map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {['Entrée', 'Antipasti', 'Primi', 'Secondi', 'Dessert'].map((category) => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const OrdersSection = () => {
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ordini</h2>
        <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuovo Ordine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuovo Ordine</DialogTitle>
              <DialogDescription>
                Crea un nuovo ordine selezionando il tavolo e i piatti.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="table">Tavolo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona tavolo" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((table) => (
                      <SelectItem key={table} value={table.toString()}>Tavolo {table}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Piatti</Label>
                <div className="space-y-2">
                  <Input placeholder="Cerca piatto..." />
                  <div className="h-[200px] overflow-y-auto border rounded-md p-2">
                    {/* Lista piatti selezionabili */}
                    <div className="space-y-2">
                      {['Margheritaaaa', 'Marinara', 'Diavola'].map((dish) => (
                        <div key={dish} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                          <span>{dish}</span>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Crea Ordine</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Tavolo 1 - Sala A</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">In corso</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p>2x Margheritaaa</p>
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
};

const TablesSection = () => {
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sale</h2>
        <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Aggiungi Tavolo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Tavolo</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli del nuovo tavolo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="room">Sala</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona sala" />
                  </SelectTrigger>
                  <SelectContent>
                    {['A', 'B', 'C'].map((room) => (
                      <SelectItem key={room} value={room}>Sala {room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="seats">Numero Posti</Label>
                <Input id="seats" type="number" min="1" placeholder="4" />
              </div>
              <Button className="w-full">Aggiungi Tavolo</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">Sala A</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((table) => (
                <div key={table} className="p-2 border rounded hover:bg-accent cursor-pointer">
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
};

const InventorySection = () => {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Inventario</h2>
        <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Aggiungi Prodotto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Prodotto</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli del nuovo prodotto da aggiungere all'inventario.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">Nome Prodotto</Label>
                <Input id="productName" placeholder="es. Pomodori" />
              </div>
              <div>
                <Label htmlFor="quantity">Quantità</Label>
                <Input id="quantity" type="number" min="0" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="unit">Unità di Misura</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona unità" />
                  </SelectTrigger>
                  <SelectContent>
                    {['kg', 'g', 'l', 'ml', 'pz'].map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Aggiungi Prodotto</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
};

const ReservationsSection = () => {
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getReservations, addReservation } = useReservations();
  const { data: reservations, isLoading } = getReservations(selectedDate);
  const form = useForm({
    defaultValues: {
      customerName: '',
      date: new Date(),
      time: '',
      guests: '',
      notes: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await addReservation.mutateAsync(data);
      setIsAddReservationOpen(false);
      form.reset();
      toast.success('Prenotazione aggiunta con successo!');
    } catch (error) {
      toast.error('Errore durante l\'aggiunta della prenotazione');
    }
  };

  if (isLoading) {
    return <div>Caricamento prenotazioni...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Prenotazioni</h2>
        <Dialog open={isAddReservationOpen} onOpenChange={setIsAddReservationOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuova Prenotazione
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuova Prenotazione</DialogTitle>
              <DialogDescription>
                Prenota un tavolo per i tuoi clienti.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Nome Cliente</Label>
                <Input id="customerName" placeholder="es. Mario Rossi" />
              </div>
              <div>
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {selectedDate ? selectedDate.toLocaleDateString() : "Seleziona data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="time">Ora</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona orario" />
                  </SelectTrigger>
                  <SelectContent>
                    {['19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="guests">Numero Ospiti</Label>
                <Input id="guests" type="number" min="1" placeholder="2" />
              </div>
              <div>
                <Label htmlFor="notes">Note</Label>
                <Textarea id="notes" placeholder="Eventuali richieste speciali..." />
              </div>
              <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>Conferma Prenotazione</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {reservations.map((reservation, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{reservation.customerName}</h4>
                    <p className="text-sm text-gray-600">
                      {reservation.time} - {reservation.guests} persone
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
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('menu');

  const navigation = [
    { name: 'Menu', icon: BookOpen, section: 'menu' },
    { name: 'Ordini', icon: ShoppingCart, section: 'orders' },
    { name: 'Sale', icon: Store, section: 'tables' },
    { name: 'Inventario', icon: Package, section: 'inventory' },
    { name: 'Prenotazioni', icon: Calendar, section: 'reservations' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar per dispositivi mobili */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-card transform transition-transform lg:transform-none lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <h1 className="text-xl font-bold">Secondo Tempo</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.section}
              variant={activeSection === item.section ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveSection(item.section);
                setIsSidebarOpen(false);
              }}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Contenuto principale */}
      <div className="lg:pl-64">
        <div className="h-16 flex items-center px-4 border-b lg:justify-end">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <main>
          {activeSection === 'menu' && <MenuSection />}
          {activeSection === 'orders' && <OrdersSection />}
          {activeSection === 'tables' && <TablesSection />}
          {activeSection === 'inventory' && <InventorySection />}
          {activeSection === 'reservations' && <ReservationsSection />}
        </main>
      </div>
    </div>
  );
};

export default App;