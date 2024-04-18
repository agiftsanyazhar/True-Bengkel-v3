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
  CRow,
} from '@coreui/react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [successMsg, setSuccessMsg] = useState('')
  const [failedMsg, setFailedMsg] = useState('')
  const history = useNavigate()

  const Auth = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/login', {
        email,
        password,
      })
      history('/admin/dashboard')
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
                <CForm onSubmit={Auth}>
                  <h1 className="text-center mb-5">Login</h1>
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <CRow className="text-center">
                    <CCol>
                      <CButton type="submit" color="primary" className="mb-4">
                        Login
                      </CButton>
                    </CCol>
                    <p className="text-body-secondary">
                      Belum punya akun? <Link to="/register">Register!</Link>
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

export default Login
