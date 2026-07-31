import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Address.css';
import CheckoutHeader from '@/components/common/CheckoutHeader';
import { CheckoutContext } from '@/context/CheckoutContext';

const Address = () => {
    const navigate = useNavigate();
    const { 
        addresses, 
        selectedAddressId, 
        setSelectedAddressId, 
        addAddress, 
        editAddress,
        cartBaseTotal,
        initialDiscounts,
        getFinalTotal 
    } = useContext(CheckoutContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

    const openAddModal = () => {
        setModalMode('add');
        setFormData({ name: '', address: '', phone: '' });
        setEditingId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (addr) => {
        setModalMode('edit');
        setFormData({ name: addr.name, address: addr.address, phone: addr.phone });
        setEditingId(addr.id);
        setIsModalOpen(true);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'add') {
            addAddress(formData);
        } else {
            editAddress(editingId, formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="address-page">
            <CheckoutHeader activeStep="address" />

            <div className="container">
                <div className="col-left">
                    <div className="title-row">
                        <h2>Select Delivery Address</h2>
                        <span className="add-new" style={{ cursor: 'pointer' }} onClick={openAddModal}>+ ADD NEW ADDRESS</span>
                    </div>

                    {addresses.map((addr) => (
                        <div key={addr.id} className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}>
                            <input 
                                type="radio" 
                                name="address" 
                                checked={selectedAddressId === addr.id} 
                                onChange={() => setSelectedAddressId(addr.id)} 
                            />
                            <div className="address-info">
                                <div className="name-row">
                                    <h3>{addr.name} {!addr.isServiceable && <span className="tag">Unserviceable</span>}</h3>
                                    <button className="edit-btn" onClick={() => openEditModal(addr)}>EDIT</button>
                                </div>
                                <p className="address-text">{addr.address}</p>
                                <p className="phone">{addr.phone}</p>
                                {selectedAddressId === addr.id && addr.isServiceable && (
                                    <button className="btn btn-primary address-deliver-btn" onClick={() => navigate('/payment')}>
                                        Deliver to this Address
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-right">
                    <div className="price-card">
                        <h3>Price Details</h3>
                        <div className="row">
                            <span>Product Price</span>
                            <span>+ ₹{cartBaseTotal}</span>
                        </div>
                        <div className="row text-green">
                            <span>Total Discounts</span>
                            <span>- ₹{initialDiscounts}</span>
                        </div>
                        <div className="row total">
                            <span>Order Total</span>
                            <span>₹{getFinalTotal()}</span>
                        </div>
                        <div className="discount-badge">
                            <span>%</span> Yay! Your total discount is ₹{initialDiscounts}
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content address-modal">
                        <h2>{modalMode === 'add' ? 'Add New Address' : 'Edit Address'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Full Address</label>
                                <textarea name="address" value={formData.address} onChange={handleFormChange} rows="3" required></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Address;
