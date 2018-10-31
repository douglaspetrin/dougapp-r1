import React , { Component } from 'react';
import api from '../../services/api';
import './styles.css'

export default class Main extends Component {
    state = { // o estado amarzena objeto, ou seja, os dados da api q estou buscando
        products: [],
        productInfo: {},
    };
    
    
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/products');
        
        const { docs, productInfo } = response.data; //criei duas variaveis pra receber as info dos products e o docs

        this.setState({ products: docs, productInfo}); //aqui ouve a alteracao do state, entao pegou o valor de docs = 10
    };
    

    prevPage = () => {

    }

    nextPage = () => {

    }

    render() {

        const { products } = this.state; //dessa maneira product vai ta recebendo products do this.state e nao preciso mais chamar this.state abaixo

        return (
        <div className="product-list"> 
        {products.map(products => (
            <article key={products._id}>
                <strong>{products.title}</strong>
                <p>{products.description}</p>
                <a href="">Acessar</a>
            </article>
        ))}
            <div className="actions">
            <button onClick={this.prevPage}> Anterior </button>
            <button onClick={this.nextPage}> Próximo </button>

            </div> 
        </div> 
        // <h1>Contagem do produtos: {this.state.products.length}</h1> //antes ouvia state, mas foi alterado e pegou q qtdade total
        )
    }
}