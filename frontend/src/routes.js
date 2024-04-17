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
const addAdmin = React.lazy(() => import('./views/master/user/admin/AddAdmin'))

// Admin
const Pegawai = React.lazy(() => import('./views/master/user/pegawai/Pegawai'))
const addPegawai = React.lazy(() => import('./views/master/user/pegawai/AddPegawai'))

// Spare Part
const SparePart = React.lazy(() => import('./views/master/spare-part/SparePart'))
const addSparePart = React.lazy(() => import('./views/master/spare-part/AddSparePart'))
const editSparePart = React.lazy(() => import('./views/master/spare-part/EditSparePart'))

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
  { path: '/master/user/admin/tambah', name: 'Tambah Admin', element: addAdmin },

  // Pegawai
  { path: '/master/user/pegawai', name: 'Pegawai', element: Pegawai },
  { path: '/master/user/pegawai/tambah', name: 'Tambah Pegawai', element: addPegawai },

  // Spare Part
  { path: '/master/spare-part', name: 'Spare Part', element: SparePart },
  {
    path: '/master/spare-part/tambah',
    name: 'Tambah Spare Part',
    element: addSparePart,
  },
  {
    path: '/master/spare-part/edit/:id',
    name: 'Edit Spare Part',
    element: editSparePart,
  },
]

export default routes
