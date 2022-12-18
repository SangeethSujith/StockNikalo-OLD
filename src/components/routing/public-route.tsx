
/**
 * Public  Route
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 1/12/2022
 * Project: Stocknikalo
 */

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutePath from '../global/route-paths';
import AuthStore from '../store/auth-store';

interface Props
{
  restricted: boolean
  component: React.ComponentType
  path?: string
}

export const PublicRoute: React.FC<Props> = ( { component: RouteComponent, restricted } ) =>
{
  if ( AuthStore.currentUser != null && restricted )
  {
    return <RouteComponent />
  }
  return <Navigate to={ RoutePath.login } />
}