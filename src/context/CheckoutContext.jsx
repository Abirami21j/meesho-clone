import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCart } from './CartContext';
import { AuthContext } from './AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const { cartItems } = useCart();
    const { user } = useContext(AuthContext);
    
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [appliedCoupon, setAppliedCoupon] = useState(null); 

    // Fetch addresses from Firestore when user logs in
    useEffect(() => {
        const fetchAddresses = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().addresses) {
                        const fetchedAddresses = docSnap.data().addresses;
                        setAddresses(fetchedAddresses);
                        if (fetchedAddresses.length > 0) {
                            setSelectedAddressId(fetchedAddresses[0].id);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching addresses:", error);
                }
            } else {
                setAddresses([]);
            }
        };
        fetchAddresses();
    }, [user]);
    
    // Dynamically calculate from cart
    const cartBaseTotal = cartItems.reduce((acc, item) => acc + ((item.originalPrice || item.price || 0) * item.qty), 0);
    const discountedTotal = cartItems.reduce((acc, item) => acc + ((item.discountedPrice || item.price || 0) * item.qty), 0);
    const initialDiscounts = cartBaseTotal - discountedTotal;
    
    const getFinalTotal = () => {
        let total = cartBaseTotal - initialDiscounts;
        if (appliedCoupon) {
            total -= appliedCoupon.discountAmount;
        }
        if (selectedPayment === 'online') {
            total -= 50; 
        }
        return total > 0 ? total : 0;
    };

    const addAddress = async (newAddress) => {
        const addr = {
            ...newAddress,
            id: Date.now().toString(),
            isServiceable: true
        };
        
        // Optimistic UI update
        const newAddresses = [addr, ...addresses];
        setAddresses(newAddresses);
        setSelectedAddressId(addr.id);

        if (user?.uid) {
            try {
                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, { addresses: newAddresses });
            } catch (error) {
                console.error("Error saving address:", error);
            }
        }
    };

    const editAddress = async (id, updatedAddress) => {
        const newAddresses = addresses.map(addr => addr.id === id ? { ...addr, ...updatedAddress } : addr);
        setAddresses(newAddresses);

        if (user?.uid) {
            try {
                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, { addresses: newAddresses });
            } catch (error) {
                console.error("Error updating address:", error);
            }
        }
    };

    return (
        <CheckoutContext.Provider value={{
            addresses,
            selectedAddressId,
            setSelectedAddressId,
            selectedPayment,
            setSelectedPayment,
            appliedCoupon,
            setAppliedCoupon,
            cartBaseTotal,
            initialDiscounts,
            getFinalTotal,
            addAddress,
            editAddress
        }}>
            {children}
        </CheckoutContext.Provider>
    );
};
