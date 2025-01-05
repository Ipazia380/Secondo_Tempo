'use client';

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useForm } from 'react-hook-form';
import { useMenu } from '@/hooks/use-menu';
import { useReservations } from '@/hooks/use-reservations';
import { toast } from 'sonner';
import { Menu, Home, Calendar as CalendarIcon, ClipboardList, Package2, Users } from 'lucide-react';
import { Card, CardContent } from "../../components/ui/card";

export default function RestaurantApp() {
  const [activeSection, setActiveSection] = useState('menu');

  const sidebarItems = [
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'orders', label: 'Ordini', icon: ClipboardList },
    { id: 'tables', label: 'Tavoli', icon: Home },
    { id: 'inventory', label: 'Inventario', icon: Package2 },
    { id: 'reservations', label: 'Prenotazioni', icon: CalendarIcon },
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
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Secondo Tempo</h1>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={\`flex items-center w-full px-6 py-3 text-left \${
                  activeSection === item.id
                    ? 'bg-gray-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }\`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('antipasti');
  const { dishes, isLoading, addDish } = useMenu();

  const categories = [
    { id: 'antipasti', label: 'Antipasti' },
    { id: 'primi', label: 'Primi' },
    { id: 'secondi', label: 'Secondi' },
    { id: 'contorni', label: 'Contorni' },
    { id: 'dolci', label: 'Dolci' },
  ];

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
        <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
          <DialogTrigger asChild>
            <Button>
              Aggiungi Piatto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Piatto</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome del Piatto</FormLabel>
                      <FormControl>
                        <Input placeholder="es. Margherita" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredienti</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Inserisci gli ingredienti..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prezzo</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Salva Piatto</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes
                .filter((dish) => dish.category === category.id)
                .map((dish, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{dish.name}</h3>
                          <p className="text-sm text-gray-600">{dish.ingredients}</p>
                          <p className="mt-2 font-medium">€{dish.price}</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Modifica</Button>
                          <Button variant="destructive" size="sm">Elimina</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function OrdersSection() {
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
}

function TablesSection() {
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
}

function InventorySection() {
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
}

function ReservationsSection() {
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
                    <Calendar
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
}