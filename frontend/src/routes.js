import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Master
const Jabatan = React.lazy(() => import('./views/jabatan/Jabatan'))
const addJabatan = React.lazy(() => import('./views/jabatan/AddJabatan'))
const editJabatan = React.lazy(() => import('./views/jabatan/EditJabatan'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Master
  { path: '/master/data-master/jabatan', name: 'Jabatan', element: Jabatan },
  {
    path: '/master/data-master/jabatan/tambah',
    name: 'Tambah Jabatan',
    element: addJabatan,
  },
  {
    path: '/master/data-master/jabatan/edit/:id',
    name: 'Edit Jabatan',
    element: editJabatan,
  },
]

export default routes
