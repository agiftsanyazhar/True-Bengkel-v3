import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/user')
    setUser(response.data)
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      {/* <Link to={'tambah'} className="button is-primary">
        Tambah
      </Link> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">#</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Nama</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user, index) => (
                  <CTableRow v-for="item in tableItems" key={user.id}>
                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <div>{user.name}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{user.email}</span>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-between text-nowrap">
                        {user.role.name}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
