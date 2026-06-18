import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau de bord — MDM Academy',
  description: 'Suivez votre progression dans la formation Apple Enterprise, Jamf et Microsoft Intune.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}

// ─── Client component ────────────────────────────────────────────────────────
// Separated to allow metadata on server component
import DashboardClient from './DashboardClient';
