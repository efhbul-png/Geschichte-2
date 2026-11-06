import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BADGES } from '../data/historyData';

interface ProgressContextType {
  completedStations: number[];
  unlockedBadges: string[];
  xp: number;
  activeStationId: number;
  setActiveStationId: (id: number) => void;
  teacherMode: boolean;
  setTeacherMode: (val: boolean) => void;
  toggleTeacherMode: () => void;
  requestTeacherMode: () => void;
  isTeacherAuthenticated: boolean;
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (val: boolean) => void;
  authenticateTeacher: (enteredPass: string) => boolean;
  lockTeacherDashboard: () => void;
  changeTeacherPassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  teacherPasswordHint: string;
  isGlossaryOpen: boolean;
  setIsGlossaryOpen: (val: boolean) => void;
  isBadgeModalOpen: boolean;
  setIsBadgeModalOpen: (val: boolean) => void;
  completeStation: (stationId: number, xpBonus: number, badgeId?: string) => void;
  resetProgress: () => void;
  recentlyUnlockedBadge: string | null;
  dismissBadgeNotification: () => void;
}

const STORAGE_KEY = 'geschichte_1848_progress_v1';
const TEACHER_AUTH_KEY = 'geschichte_1848_teacher_auth';
const TEACHER_PASS_KEY = 'geschichte_1848_teacher_pass';
const DEFAULT_PASSWORD = 'geschichte1848';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedStations, setCompletedStations] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.completedStations || [];
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.unlockedBadges || [];
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.xp || 0;
      }
    } catch {
      // fallback
    }
    return 0;
  });

  const [activeStationId, setActiveStationId] = useState<number>(1);
  const [teacherMode, setTeacherMode] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);
  const [recentlyUnlockedBadge, setRecentlyUnlockedBadge] = useState<string | null>(null);

  // Teacher Password & Authentication
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(TEACHER_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);

  const [teacherPassword, setTeacherPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(TEACHER_PASS_KEY) || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completedStations,
          unlockedBadges,
          xp,
        })
      );
    } catch {
      // ignore
    }
  }, [completedStations, unlockedBadges, xp]);

  const authenticateTeacher = (enteredPass: string): boolean => {
    if (enteredPass.trim() === teacherPassword) {
      setIsTeacherAuthenticated(true);
      setTeacherMode(true);
      setIsPasswordModalOpen(false);
      try {
        sessionStorage.setItem(TEACHER_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const lockTeacherDashboard = () => {
    setIsTeacherAuthenticated(false);
    setTeacherMode(false);
    try {
      sessionStorage.removeItem(TEACHER_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const changeTeacherPassword = (oldPass: string, newPass: string) => {
    if (oldPass !== teacherPassword) {
      return { success: false, message: 'Das alte Passwort ist nicht korrekt.' };
    }
    if (newPass.trim().length < 4) {
      return { success: false, message: 'Das neue Passwort muss mindestens 4 Zeichen lang sein.' };
    }
    const cleanPass = newPass.trim();
    setTeacherPassword(cleanPass);
    try {
      localStorage.setItem(TEACHER_PASS_KEY, cleanPass);
    } catch {
      // ignore
    }
    return { success: true, message: 'Passwort erfolgreich geändert!' };
  };

  const requestTeacherMode = () => {
    if (isTeacherAuthenticated) {
      setTeacherMode((prev) => !prev);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const completeStation = (stationId: number, xpBonus: number, badgeId?: string) => {
    setXp((prev) => prev + xpBonus);

    if (!completedStations.includes(stationId)) {
      setCompletedStations((prev) => [...prev, stationId]);
    }

    if (badgeId && !unlockedBadges.includes(badgeId)) {
      setUnlockedBadges((prev) => [...prev, badgeId]);
      setRecentlyUnlockedBadge(badgeId);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D97706', '#DC2626', '#1E293B', '#F59E0B'],
        });
      } catch {
        // ignore
      }
    }
  };

  const dismissBadgeNotification = () => {
    setRecentlyUnlockedBadge(null);
  };

  const resetProgress = () => {
    setCompletedStations([]);
    setUnlockedBadges([]);
    setXp(0);
    setActiveStationId(1);
    setRecentlyUnlockedBadge(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleTeacherMode = () => {
    requestTeacherMode();
  };

  return (
    <ProgressContext.Provider
      value={{
        completedStations,
        unlockedBadges,
        xp,
        activeStationId,
        setActiveStationId,
        teacherMode,
        setTeacherMode,
        toggleTeacherMode,
        requestTeacherMode,
        isTeacherAuthenticated,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        authenticateTeacher,
        lockTeacherDashboard,
        changeTeacherPassword,
        teacherPasswordHint: DEFAULT_PASSWORD,
        isGlossaryOpen,
        setIsGlossaryOpen,
        isBadgeModalOpen,
        setIsBadgeModalOpen,
        completeStation,
        resetProgress,
        recentlyUnlockedBadge,
        dismissBadgeNotification,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
