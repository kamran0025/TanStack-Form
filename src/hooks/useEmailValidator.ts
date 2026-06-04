import { useState, useRef, useCallback } from 'react';
import { TAKEN_EMAILS } from '../constants';
import { sleep, isValidEmail } from '../utils';

interface UseEmailValidatorReturn {
  syncError: string | null;
  asyncError: string | null;
  isChecking: boolean;
  isValid: boolean;
  handleChange: (value: string) => void;
}

export function useEmailValidator(): UseEmailValidatorReturn {
  const [syncError, setSyncError] = useState<string | null>(null);
  const [asyncError, setAsyncError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [email, setEmail] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((value: string) => {
    setEmail(value);
    setAsyncError(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value) {
      setSyncError('Email is required');
      setIsChecking(false);
      return;
    }

    if (!isValidEmail(value)) {
      setSyncError('Invalid email format');
      setIsChecking(false);
      return;
    }

    setSyncError(null);
    setIsChecking(true);

    timerRef.current = setTimeout(async () => {
      await sleep(700);
      setAsyncError(
        TAKEN_EMAILS.includes(value) ? 'This email is already registered' : null
      );
      setIsChecking(false);
    }, 500);
  }, []);

  const error = syncError ?? asyncError;
  const isValid = !error && !isChecking && email.length > 0;

  return { syncError, asyncError, isChecking, isValid, handleChange };
}
