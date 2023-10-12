import axios from 'axios';
import './Home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [produtos, setProdutos] = useState([]);

  // Função para formatar o valor em moeda (pt-BR)
  const parseValue = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Função para lidar com a exclusão de um produto
  const handleDeleteProduct = async (productId) => {
    // Confirmação usando window.confirm
    const confirmed = window.confirm('Tem certeza de que deseja apagar este produto?');
    if (!confirmed) {
      return; // Cancela a exclusão se o usuário não confirmar
    }

    try {
      await axios.delete(`http://localhost:8080/api/v1/produtos/${productId}`);
      // Atualize a lista de produtos após a exclusão
      const updatedProducts = produtos.filter((produto) => produto.id !== productId);
      setProdutos(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <main className="list-container">
      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{parseValue(produto.valor)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProduct(produto.id)}
                >
                  Apagar
                </button>
              </td>
              <td>
                <Link to={`/editar-produto/${produto.id}`} className='btn btn-warning btn-sm'>
                  Atualizar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Home;
