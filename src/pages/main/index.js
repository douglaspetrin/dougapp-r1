import React , { Component } from 'react';
import api from '../../services/api';
import './styles.css'
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = { // o estado amarzena objeto, ou seja, os dados da api q estou buscando
        products: [],
        productInfo: {},
        page: 1,
    };
    
    
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        

        //... rest operator
        const { docs, ...productInfo } = response.data; //criei duas variaveis pra receber as info dos products e o docs

        this.setState({ products: docs, productInfo, page}); //aqui ouve a alteracao do state, entao pegou o valor de docs = 10
    };
    

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return; //se a pagina atual for igual a pagina atual, retornar.

        const pageNumber = page + 1; //aqui cria uma variavel pra contar as paginas

        this.loadProducts(pageNumber);

    };

    render() {

        const { products, page, productInfo } = this.state; //dessa maneira product vai ta recebendo products do this.state e nao preciso mais chamar this.state abaixo

        return (
        <div className="product-list"> 
        {products.map(product => (
            <article key={product._id}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <Link to={`/products/${product._id}`}>Load more</Link>
            </article>
        ))};
            <div className="actions">
            <button disabled={page === 1} onClick={this.prevPage}> Prev </button>
            <button disabled={ page === productInfo.pages } onClick={this.nextPage}> Next </button>

            </div> 
        </div> 
        // <h1>Contagem do produtos: {this.state.products.length}</h1> //antes ouvia state, mas foi alterado e pegou q qtdade total
        )
    }
}