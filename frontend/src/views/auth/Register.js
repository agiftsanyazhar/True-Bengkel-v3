import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const Register = () => {
  const [role_id, setRoleId] = useState(3)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
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
        phone,
        address,
      })
      localStorage.setItem('successMsg', 'Registrasi berhasil! Silakan login!')
      history('/')
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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={saveRegister}>
                  <h1 className="text-center mb-5">Register</h1>
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
                  <CFormInput
                    className="mb-3"
                    type="hidden"
                    placeholder="Role"
                    value={role_id}
                    onChange={(e) => setRoleId(e.target.value)}
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    placeholder="Nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    type="number"
                    placeholder="Telepon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <CFormTextarea
                    rows={5}
                    className="mb-3"
                    placeholder="Alamat"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></CFormTextarea>
                  <CFormInput
                    className="mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    type="password"
                    placeholder="Ulangi Password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                  <CRow className="text-center">
                    <CCol>
                      <CButton type="submit" color="primary" className="mb-4">
                        Register
                      </CButton>
                    </CCol>
                    <p className="text-body-secondary">
                      Sudah punya akun? <Link to="/">Login!</Link>
                    </p>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
