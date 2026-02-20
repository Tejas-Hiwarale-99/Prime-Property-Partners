import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PostPropertyDashboard from './PostPropertyDashboard';
import UpdateProfile from './UpdateProfile';
import PostPropertyForm from './PostPropertyForm';
import MyProperties from './MyProperties';
import PostProtectedRoute from './PostProtectedRoute';

const PostDashboard = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/PostDashboard" element={<PostProtectedRoute element={<PostPropertyDashboard />} />} >
        <Route
          index
          element={
            <div className="d-flex justify-content-center mt-5">
              <div className="card shadow p-4 mt-5" style={{ width: '100%', maxWidth: '700px' }}>
                <h1 className="mb-4 text-center" style={{ color: '#002B5B', fontSize: '2.2rem' }}>
                  Post-Property Dashboard
                </h1>
                <p className="text-center text-muted" style={{ fontSize: '1.4rem' }}>
                  Welcome! You have successfully logged in to your property management workspace.
                </p>

                {/* Enhanced headline and paragraph */}
                <h4 className="text-center mt-4" style={{ color: '#002B5B', fontWeight: '600', fontSize: '1.4rem' }}>
                  Effortlessly Manage and Publish Your Property Listings
                </h4>
                <p className="text-center text-muted" style={{ fontSize: '1.3rem' }}>
                  Simplify your property management with our all-in-one platform. Whether you're listing a property for
                  rent or sale, we provide the tools to manage, publish, and track your listings efficiently.
                </p>

                <div className="mt-4 d-flex justify-content-center gap-3">
                  <button
                    onClick={() => navigate('/PostDashboard/add-property', { state: { type: 'RENT' } })}
                    className="btn btn-primary btn-lg"
                  >
                    Rent Property
                  </button>

                  <button
                    onClick={() => navigate('/PostDashboard/add-property', { state: { type: 'SELL' } })}
                    className="btn btn-success btn-lg"
                  >
                    Sell Property
                  </button>
                </div>
              </div>
            </div>
          }
        />
        <Route path="update-profile" element={<PostProtectedRoute element={<UpdateProfile />} />} />
        <Route path="add-property" element={<PostProtectedRoute element={<PostPropertyForm />} />} />
        <Route path="my-properties" element={<PostProtectedRoute element={<MyProperties />} />} />
      </Route>
    </Routes>
  );
};

export default PostDashboard;
