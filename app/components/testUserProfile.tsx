// components/TestUserProfile.tsx
"use client";

import { useState } from 'react';
import { useSessionState } from '@/app/store/useSession';
import { Loader } from './loader';

export default function TestUserProfile() {
  const { user, loading } = useSessionState(state => state);
  const { fetchFullUserProfile } = useSessionState(state => state.actions);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchFullProfile = async () => {
    try {
      setIsFetching(true);
      setError(null);
      console.log('🚀 Starting full profile fetch...');
      
      const fullUserData = await fetchFullUserProfile();
      
      console.log('🎉 Full profile fetch completed:', fullUserData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('💥 Full profile fetch failed:', err);
    } finally {
      setIsFetching(false);
    }
  };

  // Check what data we currently have
  const hasBasicData = user && user._id;
  const hasFullData = user && 'email' in user && 'firstName' in user;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      right: 10, 
      background: 'white', 
      padding: '20px', 
      border: '2px solid #ccc',
      borderRadius: '8px',
      zIndex: 1000,
      maxWidth: '400px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>🧪 User Profile Test</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Current Data Level:</strong></p>
        <p>• Basic Data: {hasBasicData ? '✅' : '❌'}</p>
        <p>• Full Profile: {hasFullData ? '✅' : '❌'}</p>
        <p>• Loading: {loading ? '🔄' : '✅'}</p>
      </div>

      {hasBasicData && !hasFullData && (
        <div style={{ marginBottom: '15px' }}>
          <button 
            onClick={handleFetchFullProfile}
            disabled={isFetching}
            style={{
              padding: '10px 15px',
              background: isFetching ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isFetching ? 'not-allowed' : 'pointer'
            }}
          >
            {isFetching ? '🔄 Fetching...' : '📥 Fetch Full Profile'}
          </button>
        </div>
      )}

      {error && (
        <div style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ 
        background: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        maxHeight: '200px',
        overflow: 'auto'
      }}>
        <p><strong>Current User Data:</strong></p>
        <pre style={{ fontSize: '12px' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}