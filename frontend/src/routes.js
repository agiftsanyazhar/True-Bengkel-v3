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
const AddJabatan = React.lazy(() => import('./views/master/data-master/jabatan/AddJabatan'))
const EditJabatan = React.lazy(() => import('./views/master/data-master/jabatan/EditJabatan'))

// Role
const Role = React.lazy(() => import('./views/master/data-master/role/Role'))
const AddRole = React.lazy(() => import('./views/master/data-master/role/AddRole'))
const EditRole = React.lazy(() => import('./views/master/data-master/role/EditRole'))

// Tipe Motor
const TipeMotor = React.lazy(() => import('./views/master/data-master/tipe-motor/TipeMotor'))
const AddTipeMotor = React.lazy(() => import('./views/master/data-master/tipe-motor/AddTipeMotor'))
const EditTipeMotor = React.lazy(
  () => import('./views/master/data-master/tipe-motor/EditTipeMotor'),
)

// --------------------------------------------------------------------------
// User
// --------------------------------------------------------------------------
// Semua User
const SemuaUser = React.lazy(() => import('./views/master/user/semua-user/SemuaUser'))

// Admin
const Admin = React.lazy(() => import('./views/master/user/admin/Admin'))
const AddAdmin = React.lazy(() => import('./views/master/user/admin/AddAdmin'))

// Pegawai
const Pegawai = React.lazy(() => import('./views/master/user/pegawai/Pegawai'))
const AddPegawai = React.lazy(() => import('./views/master/user/pegawai/AddPegawai'))

// Pelanggan
const Pelanggan = React.lazy(() => import('./views/master/user/pelanggan/Pelanggan'))

// Spare Part
const SparePart = React.lazy(() => import('./views/master/spare-part/SparePart'))
const AddSparePart = React.lazy(() => import('./views/master/spare-part/AddSparePart'))
const EditSparePart = React.lazy(() => import('./views/master/spare-part/EditSparePart'))

// --------------------------------------------------------------------------
// Pesanan
// --------------------------------------------------------------------------
// Pesanan
const Pesanan = React.lazy(() => import('./views/pesanan/pesanan/Pesanan'))
const DetilPesanan = React.lazy(() => import('./views/pesanan/pesanan/DetilPesanan'))

// Kendaraan
const Kendaraan = React.lazy(() => import('./views/pesanan/kendaraan/Kendaraan'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },

  // --------------------------------------------------------------------------
  // Master
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // Data Master
  // --------------------------------------------------------------------------
  // Jabatan
  { path: '/admin/master/data-master/jabatan', name: 'Jabatan', element: Jabatan },
  {
    path: '/admin/master/data-master/jabatan/tambah',
    name: 'Tambah Jabatan',
    element: AddJabatan,
  },
  {
    path: '/admin/master/data-master/jabatan/edit/:id',
    name: 'Edit Jabatan',
    element: EditJabatan,
  },

  // Role
  { path: '/admin/master/data-master/role', name: 'Role', element: Role },
  {
    path: '/admin/master/data-master/role/tambah',
    name: 'Tambah Role',
    element: AddRole,
  },
  {
    path: '/admin/master/data-master/role/edit/:id',
    name: 'Edit Role',
    element: EditRole,
  },

  // Tipe Motor
  { path: '/admin/master/data-master/tipe-motor', name: 'Tipe Motor', element: TipeMotor },
  {
    path: '/admin/master/data-master/tipe-motor/tambah',
    name: 'Tambah Tipe Motor',
    element: AddTipeMotor,
  },
  {
    path: '/admin/master/data-master/tipe-motor/edit/:id',
    name: 'Edit Tipe Motor',
    element: EditTipeMotor,
  },

  // --------------------------------------------------------------------------
  // User
  // --------------------------------------------------------------------------
  // Semua User
  { path: '/admin/master/user/semua-user', name: 'Semua User', element: SemuaUser },

  // Admin
  { path: '/admin/master/user/admin', name: 'Admin', element: Admin },
  { path: '/admin/master/user/admin/tambah', name: 'Tambah Admin', element: AddAdmin },

  // Pegawai
  { path: '/admin/master/user/pegawai', name: 'Pegawai', element: Pegawai },
  { path: '/admin/master/user/pegawai/tambah', name: 'Tambah Pegawai', element: AddPegawai },

  // Pelanggan
  { path: '/admin/master/user/pelanggan', name: 'Pelanggan', element: Pelanggan },

  // Spare Part
  { path: '/admin/master/spare-part', name: 'Spare Part', element: SparePart },
  {
    path: '/admin/master/spare-part/tambah',
    name: 'Tambah Spare Part',
    element: AddSparePart,
  },
  {
    path: '/admin/master/spare-part/edit/:id',
    name: 'Edit Spare Part',
    element: EditSparePart,
  },

  // --------------------------------------------------------------------------
  // Master
  // --------------------------------------------------------------------------
  // Pesanan
  { path: '/admin/pesanan/pesanan', name: 'Pesanan', element: Pesanan },
  { path: '/admin/pesanan/pesanan/detil/:id', name: 'Detil Pesanan', element: DetilPesanan },

  // Kendaraan
  { path: '/admin/pesanan/kendaraan', name: 'Kendaraan', element: Kendaraan },
]

export default routes
