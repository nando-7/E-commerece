import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import backImg from '../ecommerce.jpg'


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            //console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    const divStyle = {
        backgroundImage: "url("+backImg+")",
        height: "85vh",
        //paddingTop: "0",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop:"-50px",
        position:"relative"
         //backgroundAttachment: "fixed",
        //width: "100%",  opacity: "1", visibility: "inherit", zIndex: "20"
        
    }

    const imgStyle = {
            fontSize:"25px",
            textAlign: "center",
            color: "white",
            paddingTop: "400px"
            
     
    }
    

        
    const pageFill = () => (
        <div className="img-fluid" style={divStyle}>
        <div  style={imgStyle} >
            <p style={{textDecoration: "underline"}}>Scroll down</p>
            <i className="fas fa-angle-double-down"></i>
            
        </div>
        </div>          
         )     
        
   

    return (
        
    <div>
        <Layout
            
            title="E-commerce"
            description="Scroll down to view new arrivals and best sellers"
            
           
        >
           {pageFill()} 
        </Layout>
    
          
        <Search />
            
         <div className="container-fluid">  
            
            <h2 className="mb-4 ef">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-4 col-sm-6 mb-3">
                        <Card product={product}/>
                    </div>
                ))}
            </div>
            <hr/>
            <h2 className="mb-4 ef">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-md-4 col-sm-6 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            </div> 
    </div> 
    );
};

export default Home;
