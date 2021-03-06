import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import backImg from '../ecommerce.jpg'
//import Menu from './Menu';


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
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop:"-50px",
        //marginTop:"-70px",
        //backgroundAttachment: "fixed",
        position:"relative"
        
        
    }

    const imgStyle = {
            fontSize:"25px",
            textAlign: "center",
            color: "#3d85d8",

            // paddingTop: "400px",
            // marginLeft: "50%",

            position: "absolute",
            top: "57%",
            left: "45%",
         
    }
    
    //style={imgStyle}
        
    const pageFill = () => (
        <div className="img-fluid" style={divStyle}>
        
       
        <div  className="imgStyle">
            <p style={{textDecoration: "underline"}}>Scroll down</p>
            <i className="fas fa-angle-double-down"></i>
        </div>
        
       
        </div>          
         )     
        
   

    return (
        
    <div >
        
        <Layout
            
            title="E-commerce"
            description="Scroll down to view new arrivals and best sellers"
            
           
        >
            
        </Layout>

        {pageFill()}

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
