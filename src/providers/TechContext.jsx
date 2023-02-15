import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const TechContext = createContext({});

export function TechProvider({ children }) {
  const { user, setUser, userToken, setLoading } = useContext(UserContext);

  const [registerTechModal, setRegisterTechModal] = useState(false);

  const [editTechModal, setEditTechModal] = useState(false);

  function openRegisterTechModal() {
    setRegisterTechModal(true);
  }

  function closeRegisterTechModal() {
    setRegisterTechModal(false);
  }

  function openEditTechModal() {
    setEditTechModal(true);
  }

  function closeEditTechModal() {
    setEditTechModal(false);
  }

  async function techRegister(formData) {
    try {
      setLoading(true);
      const response = await api.post("/users/techs", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      toast.success("Tecnologia cadastrada com sucesso");
      setUser({ ...user, techs: [...user.techs, response.data] });
      closeRegisterTechModal();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function techEdit(formData, techID) {
    try {
      setLoading(true);
      const response = await api.put(`/users/techs/${techID}`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      toast.success("Tecnologia editada com sucesso");
      closeEditTechModal();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function techDelete(techID) {
    try {
      setLoading(true);
      const response = await api.delete(`/users/techs/${techID}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      toast.success("Tecnologia deletada com sucesso");
      closeEditTechModal();
    } catch (error) {
      toast.error("Erro!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TechContext.Provider
      value={{
        techRegister,
        techEdit,
        techDelete,
        registerTechModal,
        openRegisterTechModal,
        closeRegisterTechModal,
        editTechModal,
        openEditTechModal,
        closeEditTechModal,
      }}
    >
      {children}
    </TechContext.Provider>
  );
}