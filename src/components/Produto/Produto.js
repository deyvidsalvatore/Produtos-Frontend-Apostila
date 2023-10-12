import { useEffect, useState } from 'react';
import './Produto.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Produto(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
  });

  useEffect(() => {
    if (props.editMode) {
      if (props.formData && props.formData.nome && props.formData.valor) {
        setFormData({
          nome: props.formData.nome,
          valor: parseFloat(props.formData.valor).toFixed(2), // Formata o valor com duas casas decimais
        });
      } else if (id) {
        axios.get(`http://localhost:8080/api/v1/produtos/${id}`)
          .then((response) => {
            setFormData({
              nome: response.data.nome,
              valor: parseFloat(response.data.valor).toFixed(2), // Formata o valor com duas casas decimais
            });
          })
          .catch((error) => {
            console.error('Error fetching product details:', error);
          });
      }
    } else {
      setFormData({
        nome: '',
        valor: '',
      });
    }
  }, [props.editMode, id, props.formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Substituir vírgula por ponto e garantir duas casas decimais
    if (name === 'valor') {
      const formattedValue = value.replace(',', '.');
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.editMode) {
      if (id) {
        try {
          await axios.put(`http://localhost:8080/api/v1/produtos/${id}`, formData);
          navigate('/');
        } catch (error) {
          console.error('Error updating product:', error);
        }
      } else {
        console.error('ID not found for update');
      }
    } else {
      try {
        await axios.post('http://localhost:8080/api/v1/produtos', formData);
        navigate('/'); // Redireciona para a página inicial após a criação
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
  };

  return (
    <main className="containe-add">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="valor"
            placeholder="Valor"
            value={formData.valor}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {props.editMode ? (
          <div>
            <button type="submit" className="btn-aprov">
              Atualizar
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button type="submit" className="btn-aprov">
            Adicionar
          </button>
        )}
      </form>
    </main>
  );
}

export default Produto;
