import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// --------------------------------------------------------------------------
// Master
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// Data Master
// --------------------------------------------------------------------------
// Jabatan
const Jabatan = React.lazy(() => import('./views/master/data-master/jabatan/Jabatan'))
const addJabatan = React.lazy(() => import('./views/master/data-master/jabatan/AddJabatan'))
const editJabatan = React.lazy(() => import('./views/master/data-master/jabatan/EditJabatan'))

// Role
const Role = React.lazy(() => import('./views/master/data-master/role/Role'))
const addRole = React.lazy(() => import('./views/master/data-master/role/AddRole'))
const editRole = React.lazy(() => import('./views/master/data-master/role/EditRole'))

// Tipe Motor
const TipeMotor = React.lazy(() => import('./views/master/data-master/tipe-motor/TipeMotor'))
const addTipeMotor = React.lazy(() => import('./views/master/data-master/tipe-motor/AddTipeMotor'))
const editTipeMotor = React.lazy(
  () => import('./views/master/data-master/tipe-motor/EditTipeMotor'),
)

// --------------------------------------------------------------------------
// User
// --------------------------------------------------------------------------
// Semua User
const SemuaUser = React.lazy(() => import('./views/master/user/semua-user/SemuaUser'))

// Admin
const Admin = React.lazy(() => import('./views/master/user/admin/Admin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // --------------------------------------------------------------------------
  // Master
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // Data Master
  // --------------------------------------------------------------------------
  // Jabatan
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

  // Role
  { path: '/master/data-master/role', name: 'Role', element: Role },
  {
    path: '/master/data-master/role/tambah',
    name: 'Tambah Role',
    element: addRole,
  },
  {
    path: '/master/data-master/role/edit/:id',
    name: 'Edit Role',
    element: editRole,
  },

  // Tipe Motor
  { path: '/master/data-master/tipe-motor', name: 'Tipe Motor', element: TipeMotor },
  {
    path: '/master/data-master/tipe-motor/tambah',
    name: 'Tambah Tipe Motor',
    element: addTipeMotor,
  },
  {
    path: '/master/data-master/tipe-motor/edit/:id',
    name: 'Edit Tipe Motor',
    element: editTipeMotor,
  },

  // --------------------------------------------------------------------------
  // User
  // --------------------------------------------------------------------------
  // Semua User
  { path: '/master/user/semua-user', name: 'Semua User', element: SemuaUser },

  // Admin
  { path: '/master/user/admin', name: 'Admin', element: Admin },
]

export default routes
