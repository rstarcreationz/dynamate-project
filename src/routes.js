import React from 'react';

const Profileview = React.lazy(() => import('./Components/Profile/Profileview'));
const Help = React.lazy(() => import('./Components/Profile/Help'));
const ProfileEdit = React.lazy(() => import('./Components/Profile/ProfileEdit'));
const History = React.lazy(() => import('./Components/Profile/History'));


const routes = [
  { path: '/myprofile', exact: true, name: 'My Profile', component: Profileview },
  { path: '/myprofile/help', exact: true, name: 'Help', component: Help },
  { path: '/myprofile/profile_edit/:id', exact: true, name: 'Help', component: ProfileEdit },
  { path: '/myprofile/history', exact: true, name: 'History', component: History },
];

export default routes;
