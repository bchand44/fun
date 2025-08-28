import React from 'react';

export default function Showcase() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif',
      boxSizing: 'border-box',
      overflow: 'auto',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '32px',
        boxShadow: '0 8px 32px rgba(80,80,160,0.2)',
        padding: '48px 40px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        margin: '0 auto',
        animation: 'fadeIn 1.2s',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          color: '#6e8efb',
          marginBottom: '24px',
          letterSpacing: '2px',
        }}>
          🚀 React UI Automation Showcase
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: '#444',
          marginBottom: '32px',
        }}>
          Experience the power of modern UI with React!<br />
          This page demonstrates beautiful design, smooth animations, and interactive components.<br />
          <span style={{ color: '#a777e3', fontWeight: 600 }}>Built with React + Vite</span>
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '32px',
        }}>
          <button style={{
            background: 'linear-gradient(90deg, #6e8efb 0%, #a777e3 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '24px',
            padding: '16px 32px',
            fontSize: '1.1rem',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(80,80,160,0.15)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Try React Animation
          </button>
          <button style={{
            background: 'linear-gradient(90deg, #a777e3 0%, #6e8efb 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '24px',
            padding: '16px 32px',
            fontSize: '1.1rem',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(80,80,160,0.15)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Explore UI Components
          </button>
        </div>
        <div style={{
          marginTop: '16px',
          fontSize: '1.1rem',
          color: '#888',
        }}>
          <span style={{ fontWeight: 600, color: '#6e8efb' }}>✨ Fast, Interactive, Beautiful ✨</span>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
