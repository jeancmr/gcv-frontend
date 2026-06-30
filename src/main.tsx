import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GvcPlatformApp } from './GvcPlatformApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GvcPlatformApp />
  </StrictMode>,
);
