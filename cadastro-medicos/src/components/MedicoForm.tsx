import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar o useNavigate
import "./MedicoForm.css";

interface MedicoFormData {
  nomeCompleto: string;
  crm: string;
  especialidade: string;
  telefone?: string;
  email?: string;
}

const MedicoForm: React.FC = () => {
  const [formData, setFormData] = useState<MedicoFormData>({
    nomeCompleto: "",
    crm: "",
    especialidade: "",
    telefone: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate(); // Hook para navegação

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nomeCompleto) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    }

    if (!formData.crm || !/^\d{5,10}-[A-Za-z]{2}$/.test(formData.crm)) {
      newErrors.crm = "CRM inválido. Formato correto: 1234567-XX";
    }

    if (!formData.especialidade) {
      newErrors.especialidade = "Especialidade é obrigatória";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      console.log("Formulário enviado com sucesso:", formData);
      setFormData({
        nomeCompleto: "",
        crm: "",
        especialidade: "",
        telefone: "",
        email: "",
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="medico-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nomeCompleto">Nome Completo:</label>
        <input
          type="text"
          id="nomeCompleto"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleInputChange}
          className={errors.nomeCompleto ? "input-error" : ""}
        />
        {errors.nomeCompleto && <span className="error">{errors.nomeCompleto}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="crm">CRM:</label>
        <input
          type="text"
          id="crm"
          name="crm"
          value={formData.crm}
          onChange={handleInputChange}
          className={errors.crm ? "input-error" : ""}
        />
        {errors.crm && <span className="error">{errors.crm}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="especialidade">Especialidade:</label>
        <input
          type="text"
          id="especialidade"
          name="especialidade"
          value={formData.especialidade}
          onChange={handleInputChange}
          className={errors.especialidade ? "input-error" : ""}
        />
        {errors.especialidade && <span className="error">{errors.especialidade}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="telefone">Telefone (opcional):</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail (opcional):</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <button type="submit">Cadastrar</button>
      {/* Botão Voltar */}
      <button type="button" onClick={() => navigate("/")}>
        Voltar
      </button>
    </form>
  );
};

export default MedicoForm;
