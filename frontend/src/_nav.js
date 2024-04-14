import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCarAlt, cilClipboard, cilHome, cilNotes, cilPeople, cilSettings } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Master',
  },
  {
    component: CNavGroup,
    name: 'Data Master',
    to: 'master/data-master',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Jabatan',
        to: 'master/data-master/jabatan',
      },
      {
        component: CNavItem,
        name: 'Role',
        to: 'master/data-master/role',
      },
      {
        component: CNavItem,
        name: 'Tipe Motor',
        to: 'master/data-master/tipe-motor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    to: 'master/user',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Semua',
        to: 'master/user/semua',
      },
      {
        component: CNavItem,
        name: 'Admin',
        to: 'master/user/admin',
      },
      {
        component: CNavItem,
        name: 'Pegawai',
        to: 'master/user/pegawai',
      },
      {
        component: CNavItem,
        name: 'Pelanggan',
        to: 'master/user/pelanggan',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Spare Part',
    to: 'master/spare-part',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Pesanan',
  },
  {
    component: CNavItem,
    name: 'Pesanan',
    to: 'pesanan/pesanan',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kendaraan',
    to: 'pesanan/kendaraan',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
]

export default _nav
