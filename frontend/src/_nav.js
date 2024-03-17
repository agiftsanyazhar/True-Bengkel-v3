import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBike,
  cilCarAlt,
  cilClipboard,
  cilHome,
  cilImage,
  cilInfo,
  cilNotes,
  cilPeople,
  cilSettings,
} from '@coreui/icons'
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
    to: '/data-master',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Brand',
        to: '/data-master/brand',
      },
      {
        component: CNavItem,
        name: 'Jabatan',
        to: '/data-master/jabatan',
      },
      {
        component: CNavItem,
        name: 'Motor',
        to: '/data-master/motor',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Bio',
    to: '/bio',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Galeri',
    to: '/galeri',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Database',
  },
  {
    component: CNavItem,
    name: 'Order',
    to: '/order',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kendaraan',
    to: '/kendaraan',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Motor',
    to: '/motor',
    icon: <CIcon icon={cilBike} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Spare Part',
    to: '/spare-part',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Semua',
        to: '/user/semua',
      },
      {
        component: CNavItem,
        name: 'Admin',
        to: '/user/admin',
      },
      {
        component: CNavItem,
        name: 'Pegawai',
        to: '/user/pegawai',
      },
      {
        component: CNavItem,
        name: 'Pelanggan',
        to: '/user/pelanggan',
      },
    ],
  },
]

export default _nav
