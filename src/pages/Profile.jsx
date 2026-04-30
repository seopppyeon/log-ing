import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Camera, LogIn, LogOut, Edit3, Save, User } from 'lucide-react';
import { strings } from '../constants/strings';
import './Profile.css';

const Profile = () => {
  const { user, isLoggedIn, login, logout, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    updateProfile({ name: tempName });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header glass-panel">
        <h1>{strings.profile.title}</h1>
      </div>

      <div className="profile-content glass-panel">
        <div className="profile-image-section">
          <div className="image-wrapper">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="profile-img" />
            ) : (
              <div className="profile-img-placeholder">
                <User size={60} color="var(--text-muted)" />
              </div>
            )}
            <label className="image-edit-btn">
              <Camera size={20} />
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          </div>
        </div>

        <div className="profile-info-section">
          {isEditing ? (
            <div className="name-edit-group">
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="input-field"
                placeholder={strings.profile.namePlaceholder}
              />
              <button className="btn btn-primary save-btn" onClick={handleSaveName}>
                <Save size={18} />
                <span>{strings.profile.saveName}</span>
              </button>
            </div>
          ) : (
            <div className="name-display-group">
              <h2>{isLoggedIn ? strings.profile.welcome(user.name) : user.name}</h2>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <Edit3 size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="auth-section">
          {isLoggedIn ? (
            <button className="btn logout-btn" onClick={logout}>
              <LogOut size={20} style={{ marginRight: '8px' }} />
              {strings.profile.logout}
            </button>
          ) : (
            <button className="btn btn-primary login-btn" onClick={login}>
              <LogIn size={20} style={{ marginRight: '8px' }} />
              {strings.profile.login}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
