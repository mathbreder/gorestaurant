import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import FoodItem from '../../components/FoodItem';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { Food } from '../../types/Food';

const Dashboard = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food>({} as Food);

  useEffect(() => {
    const loadFoods = async () => {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    loadFoods();
  }, []);

  const handleAddFood = async (food: Food) => {
    try {
      const response = await api.post('/foods', { ...food, available: true });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: Food) => {
    const { id } = editingFood;

    const response = await api.put(`/foods/${id}`, food);

    const updatedFoods = foods.map(f => {
      if (f.id === id) {
        return response.data;
      }

      return f;
    }).filter(f => f.id !== id);

    setFoods(updatedFoods);
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const updatedFoods = foods.filter(f => f.id !== id);

    setFoods(updatedFoods);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }
  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    toggleEditModal();
  }
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods && foods.map(food => (
          <FoodItem
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
