import React from 'react';
import { NfaTrackerNavIcon } from '@/components/CustomIcons';
import { ArmoryModule } from '../types';
import manifest from './manifest.json';
import { NfaTracker } from './NfaTracker';

export { NfaTracker };

export const nfaModule: ArmoryModule = {
  manifest: manifest as any,
  routes: [
    {
      path: '/nfa-tracker',
      element: NfaTracker as any,
    },
  ],
  navItems: [
    {
      path: '/nfa-tracker',
      label: 'NFA Tracker',
      icon: <NfaTrackerNavIcon size={18} />,
      group: 'tools',
    },
  ],
  commands: [
    {
      id: 'search-nfa',
      label: 'NFA Tracker',
      sublabel: 'Form 1, Form 4, Tax Stamps & Trust',
      path: '/nfa-tracker',
      keywords: ['nfa', 'tax stamp', 'form 1', 'form 4', 'suppressor', 'sbr', 'trust'],
    },
  ],
};

export default nfaModule;
