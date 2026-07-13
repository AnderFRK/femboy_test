import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeScreen from '../components/scanner/WelcomeScreen';
import ScannerScreen from '../components/scanner/ScannerScreen';

export default function TestView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasStarted(false);
  }, [location.key]);

  return (
    <>
      {!hasStarted ? (
        <WelcomeScreen
          onStart={() => setHasStarted(true)}
          onBattle={() => navigate('/batalla')}
        />
      ) : (
        <ScannerScreen onBack={() => setHasStarted(false)} />
      )}
    </>
  );
}