import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import NewCase from "./NewCase";
import ResetPassword from "./ResetPassword";
import PrivateRoute from "./PrivateRoute";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../context/AuthContext";
import {MemoryRouter, Routes, Route} from "react-router-dom";
import {RestProvider} from "../context/RESTContext";

function App() {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <MemoryRouter>
                    <AuthProvider>
                        <RestProvider>
                            <Routes>
                                <Route path="/login" index element={<Login/>}/>
                                <Route path="/"
                                       element={<PrivateRoute>
                                           <NewCase/>
                                       </PrivateRoute>}/>
                                <Route path="/signup" element={<Signup/>}/>
                                <Route path="/reset-password" element={<ResetPassword/>}/>
                            </Routes>
                        </RestProvider>
                    </AuthProvider>
                </MemoryRouter>
            </div>
        </Container>
    );
}

export default App;