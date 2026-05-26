import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '../components/scanner/WelcomeScreen';
import ScannerScreen from '../components/scanner/ScannerScreen';

export default function TestView() {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  return (
    <>
      {!hasStarted ? (
        <WelcomeScreen
          onStart={() => setHasStarted(true)}
          onBattle={() => navigate('/batalla')}
        />
      ) : (
        <ScannerScreen />
      )}
    </>
  );
}