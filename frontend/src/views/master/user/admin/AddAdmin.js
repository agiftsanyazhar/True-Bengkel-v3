import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'

const RegisterAdmin = () => {
  const [role_id, setRoleId] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const [successMsg, setSuccessMsg] = useState('')
  const [failedMsg, setFailedMsg] = useState('')
  const history = useNavigate()

  const saveRegister = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/register', {
        role_id,
        name,
        email,
        password,
        rePassword,
      })
      localStorage.setItem('successMsg', 'Admin berhasil ditambahkan! Silakan login!')
      history(-1)
    } catch (error) {
      if (error.response) {
        setFailedMsg(error.response.data.msg)
      }
    }
  }

  useEffect(() => {
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }
  }, [])

  return (
    <>
      {successMsg && (
        <CAlert color="success" variant="solid" dismissible>
          {successMsg}
        </CAlert>
      )}
      {failedMsg && (
        <CAlert color="danger" variant="solid" dismissible>
          {failedMsg}
        </CAlert>
      )}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Tambah Admin</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={saveRegister}>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="hidden"
                placeholder="Role"
                value={role_id}
                onChange={(e) => setRoleId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="password"
                placeholder="Ulangi Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">
              <CIcon icon={cilSave} />
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default RegisterAdmin
