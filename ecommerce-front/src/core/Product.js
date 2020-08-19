import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import ShowImgSp from './ShowImgSp';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log("hey")
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]); 

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 50)}
            className="container-fluid"
        >
            
            <div className="row">
                <div className="col-md-8">
                    
                    <ShowImgSp item={product} url="product"/>
                    
                    {product && product.description && <Card product={product} showViewProductButton={false} showDes={true} showImg={false} />}
                </div>

                <div className="col-md-4">
                    <h4 className="ef2">Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
