import React from 'react';
import { LoadDevNavIcon } from '@/components/CustomIcons';
import { ArmoryModule } from '../types';
import manifest from './manifest.json';
import { ReloadingComponents } from './ReloadingComponents';
import { LoadDevelopment } from './LoadDevelopment';

export { ReloadingComponents, LoadDevelopment };

export const reloadingModule: ArmoryModule = {
  manifest: manifest as any,
  routes: [
    {
      path: '/components',
      element: ReloadingComponents as any,
    },
    {
      path: '/load-development',
      element: LoadDevelopment as any,
    },
  ],
  navItems: [
    {
      path: '/load-development',
      label: 'Load Dev',
      icon: <LoadDevNavIcon size={18} />,
      group: 'tools',
    },
  ],
  commands: [
    {
      id: 'search-reloading-components',
      label: 'Reloading Components',
      sublabel: 'Powder, Primers, Brass & Bullets',
      path: '/components',
      keywords: ['reloading', 'powder', 'primers', 'brass', 'bullets', 'grains'],
    },
    {
      id: 'search-load-development',
      label: 'Load Development',
      sublabel: 'Powder charges, ladders & recipes',
      path: '/load-development',
      keywords: ['load', 'development', 'recipe', 'ladder', 'charge'],
    },
  ],
};

export default reloadingModule;
