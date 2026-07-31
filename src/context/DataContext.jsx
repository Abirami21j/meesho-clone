import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories
                const catSnapshot = await getDocs(collection(db, 'categories'));
                const cats = catSnapshot.docs.map(doc => doc.data());
                
                // Fetch Products
                const prodSnapshot = await getDocs(collection(db, 'products'));
                const rawProds = prodSnapshot.docs.map(doc => doc.data());
                
                // Deduplicate products based on their unique 'id' 
                // AND deduplicate by image so we don't show visually identical products
                const uniqueProdsMap = new Map();
                const seenImages = new Set();
                
                rawProds.forEach(p => {
                    const firstImage = p.images && p.images.length > 0 ? p.images[0] : null;
                    
                    if (!uniqueProdsMap.has(p.id) && (!firstImage || !seenImages.has(firstImage))) {
                        uniqueProdsMap.set(p.id, p);
                        if (firstImage) {
                            seenImages.add(firstImage);
                        }
                    }
                });
                const uniqueProds = Array.from(uniqueProdsMap.values());
                
                setCategories(cats);
                setAllProducts(uniqueProds);
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ allProducts, categories, loadingData }}>
            {children}
        </DataContext.Provider>
    );
};
