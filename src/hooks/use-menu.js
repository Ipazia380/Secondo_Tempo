import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function useMenu() {
  const queryClient = useQueryClient();

  // Ottieni tutti i piatti
  const { data: dishes = [], isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const { data } = await api.get('/menu');
      return data;
    },
  });

  // Aggiungi un nuovo piatto
  const addDish = useMutation({
    mutationFn: async (newDish) => {
      const { data } = await api.post('/menu', newDish);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['menu']);
    },
  });

  // Modifica un piatto esistente
  const updateDish = useMutation({
    mutationFn: async ({ id, ...dish }) => {
      const { data } = await api.put(`/menu/${id}`, dish);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['menu']);
    },
  });

  // Elimina un piatto
  const deleteDish = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/menu/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['menu']);
    },
  });

  return {
    dishes,
    isLoading,
    error,
    addDish,
    updateDish,
    deleteDish,
  };
}
