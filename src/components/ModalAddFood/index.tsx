import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';
import { Food } from '../../types/Food';

type ModalAddFoodProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleAddFood: (food: Food) => void;
};

const ModalAddFood = (props: ModalAddFoodProps) => {
  const { isOpen, setIsOpen, handleAddFood } = props;
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (data: Food) => {
    handleAddFood(data);
    setIsOpen(!isOpen);
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
