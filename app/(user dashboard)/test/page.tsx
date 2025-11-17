// app/marketplace/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSessionState } from '@/app/store/useSession';
import TestUserProfile from '@/app/components/testUserProfile';
import { Loader } from '@/app/components/fieldError';


export default function Marketplace() {
  
  return (
    <div>
      <TestUserProfile /> {/* Remove after testing */}
      
      <h1>Marketplace</h1>
      
      {user ? (
        <div>
          <h2>Welcome to Marketplace!</h2>
          
          {/* Show different content based on data availability */}
          {('email' in user && 'firstName' in user) ? (
            // Full profile available
            <div>
              <p>Hello, <strong>{user.firstName} {user.lastName}</strong>!</p>
              <p>Email: {user.email}</p>
              <p>Profession: {user.profession}</p>
              <p>City: {user.currentCity}</p>
              {/* Your marketplace content */}
            </div>
          ) : (
            // Basic profile only
            <div style={{ background: '#fff3cd', padding: '15px', margin: '15px 0' }}>
              <p>🔄 Loading your full profile...</p>
              <p>Basic info: User ID {user._id}</p>
              {/* Show limited content or skeleton */}
            </div>
          )}
        </div>
      ) : (
        <p>Please sign in to access the marketplace</p>
      )}
    </div>
  );
}