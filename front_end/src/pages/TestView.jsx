import { useState } from 'react';
import WelcomeScreen from '../components/scanner/WelcomeScreen';
import ScannerScreen from '../components/scanner/ScannerScreen';

export default function TestView() {
  const [hasStarted, setHasStarted] = useState(false);
  return (
    <>
      {!hasStarted ? (
        <WelcomeScreen onStart={() => setHasStarted(true)} />
      ) : (
        <ScannerScreen />
      )}
    </>
  );
}