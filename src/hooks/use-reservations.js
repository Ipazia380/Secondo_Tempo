import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { format } from 'date-fns';

export function useReservations() {
  const queryClient = useQueryClient();

  // Ottieni tutte le prenotazioni per una data specifica
  const getReservations = (date) => {
    return useQuery({
      queryKey: ['reservations', date],
      queryFn: async () => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const { data } = await api.get(`/reservations?date=${formattedDate}`);
        return data;
      },
    });
  };

  // Aggiungi una nuova prenotazione
  const addReservation = useMutation({
    mutationFn: async (newReservation) => {
      const { data } = await api.post('/reservations', newReservation);
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalida la query per la data della prenotazione
      queryClient.invalidateQueries(['reservations', variables.date]);
    },
  });

  // Modifica una prenotazione esistente
  const updateReservation = useMutation({
    mutationFn: async ({ id, ...reservation }) => {
      const { data } = await api.put(`/reservations/${id}`, reservation);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['reservations', variables.date]);
    },
  });

  // Elimina una prenotazione
  const deleteReservation = useMutation({
    mutationFn: async ({ id, date }) => {
      await api.delete(`/reservations/${id}`);
      return { id, date };
    },
    onSuccess: (variables) => {
      queryClient.invalidateQueries(['reservations', variables.date]);
    },
  });

  // Verifica disponibilità per una data e ora specifiche
  const checkAvailability = async (date, time, guests) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const { data } = await api.get(
        `/reservations/availability?date=${formattedDate}&time=${time}&guests=${guests}`
      );
      return data.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  return {
    getReservations,
    addReservation,
    updateReservation,
    deleteReservation,
    checkAvailability,
  };
}
