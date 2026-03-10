import { Redirect } from 'expo-router';
import React from 'react';

import { useAuth } from '@/src/context/AuthContext';
import { getRoleRootHref } from '@/src/navigation/roleRoutes';

export default function TabLayout() {
  const { status, role } = useAuth();
  return <Redirect href={getRoleRootHref(role, status) as any} />;
}
