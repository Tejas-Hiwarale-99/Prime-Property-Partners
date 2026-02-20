import React, { useState, useEffect } from 'react';
import { useLocation,} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostPropertyForm = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'RENT',
    price: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    image: null, // single image
  });

  useEffect(() => {
    if (location.state?.type) {
      setFormData((prev) => ({ ...prev, type: location.state.type }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.image) {
      toast.error('❌ Please select an image.');
      return;
    }
  
    const userId = localStorage.getItem('userId');
  
    const data = new FormData();
    const dto = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      price: formData.price,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      userId: userId, // ✅ Include userId here
    };
  
    data.append('dto', JSON.stringify(dto));
    data.append('image', formData.image);
  
    try {
      await axios.post('http://localhost:8080/api/property/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      toast.success('✅ Property posted successfully..!');
      // navigate('/my-properties');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to post property.');
    }
  };
  

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow p-4 mt-5" style={{ width: '100%', maxWidth: '600px' }}>
        <h4 className="text-center mb-4">Post {formData.type} Property</h4>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-3">
            <label>Property Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Property Type</label>
            <select className="form-control" name="type" value={formData.type} onChange={handleChange}>
              <option value="RENT">RENT</option>
              <option value="SELL">SELL</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPropertyForm;
