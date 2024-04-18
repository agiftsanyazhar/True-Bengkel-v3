import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCarAlt, cilClipboard, cilHome, cilNotes, cilPeople, cilSettings } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Master',
  },
  {
    component: CNavGroup,
    name: 'Data Master',
    to: '/admin/master/data-master',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Jabatan',
        to: '/admin/master/data-master/jabatan',
      },
      {
        component: CNavItem,
        name: 'Role',
        to: '/admin/master/data-master/role',
      },
      {
        component: CNavItem,
        name: 'Tipe Motor',
        to: '/admin/master/data-master/tipe-motor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/admin/master/user',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Semua',
        to: '/admin/master/user/semua-user',
      },
      {
        component: CNavItem,
        name: 'Admin',
        to: '/admin/master/user/admin',
      },
      {
        component: CNavItem,
        name: 'Pegawai',
        to: '/admin/master/user/pegawai',
      },
      {
        component: CNavItem,
        name: 'Pelanggan',
        to: '/admin/master/user/pelanggan',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Spare Part',
    to: '/admin/master/spare-part',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Pesanan',
  },
  {
    component: CNavItem,
    name: 'Pesanan',
    to: '/admin/pesanan/pesanan',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kendaraan',
    to: '/admin/pesanan/kendaraan',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
]

export default _nav
