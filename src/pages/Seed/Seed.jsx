import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { allProducts, categories } from '../../data';

const Seed = () => {
    const [status, setStatus] = useState('Idle');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const uploadProducts = async () => {
        try {
            setError('');
            setStatus('Starting Upload...');
            setProgress(0);
            
            if (!allProducts || allProducts.length === 0) {
                setError("Error: allProducts array is empty or undefined!");
                setStatus('Failed.');
                return;
            }

            setStatus(`Uploading ${allProducts.length} Products...`);
            let count = 0;

            for (const product of allProducts) {
                try {
                    const docRef = doc(db, 'products', product.id.toString());
                    await setDoc(docRef, product);
                    count++;
                    setProgress(Math.round((count / allProducts.length) * 100));
                } catch (err) {
                    throw new Error(`Failed on product ${product.id}: ${err.message}`);
                }
            }
            
            setStatus('Products Upload Complete! ✓');
        } catch (err) {
            console.error(err);
            setError(err.message);
            setStatus('Upload Failed.');
        }
    };

    const uploadCategories = async () => {
        try {
            setError('');
            setStatus(`Uploading ${categories.length} Categories...`);
            setProgress(0);
            let count = 0;

            for (const category of categories) {
                try {
                    const docRef = doc(db, 'categories', category.id.toString());
                    await setDoc(docRef, category);
                    count++;
                    setProgress(Math.round((count / categories.length) * 100));
                } catch (err) {
                    throw new Error(`Failed on category ${category.id}: ${err.message}`);
                }
            }
            
            setStatus('Categories Upload Complete! ✓');
        } catch (err) {
            console.error(err);
            setError(err.message);
            setStatus('Upload Failed.');
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Inter' }}>
            <h1>Database Seeding Tool</h1>
            <p>Use this tool to push the local mock data into your new Firebase Firestore database.</p>
            
            <div style={{ margin: '40px 0' }}>
                <h3 style={{ color: '#f43397' }}>Status: {status}</h3>
                {error && <div style={{ color: 'red', margin: '20px', padding: '15px', border: '1px solid red', backgroundColor: '#ffebee' }}><strong>Error:</strong> {error}</div>}
                
                {progress > 0 && progress < 100 && !error && (
                    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '20px', overflow: 'hidden', marginTop: '10px' }}>
                        <div style={{ width: `${progress}%`, backgroundColor: '#f43397', height: '100%', transition: 'width 0.3s' }}></div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button 
                    onClick={uploadProducts}
                    style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#f43397', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    1. Upload All Products
                </button>
                <button 
                    onClick={uploadCategories}
                    style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    2. Upload Categories
                </button>
            </div>
        </div>
    );
};

export default Seed;
