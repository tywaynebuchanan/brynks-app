import {Fragment, useEffect, useState} from "react"
import "./css/typography.css"
import "./css/form-elements.css"
import "./css/custom-components.css"
import "./css/alignment.css"
import "./css/themes.css"
import "./css/layout.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import Home from "./pages/Dashboard"
import ProtectedRoutes from "./components/ProtectedRoutes"
import PublicRoute from "./components/PublicRoute"
import Loader from "./components/Loader"
import {useSelector} from "react-redux"
import Transactions from "./pages/Transactions/index"
import Requests from "./pages/Requests"
import Payments from "./pages/Payments/index"
import Profile from "./pages/Profile/index"
import Users from "./pages/Users/index"
import ResetPassword from "./pages/ResetPassword/index"

function App() {
	const {loading} = useSelector(state => state.loaders)

	return (
		<Fragment>
			{loading && <Loader />}
			<Router>
				<Routes>
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/forget-password' element={<ResetPassword/>} />
					<Route
						exact
						path='/login'
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						exact
						path='/transactions'
						element={
							<ProtectedRoutes>
								<Transactions />
							</ProtectedRoutes>
						}
					/>
					<Route
						exact
						path='/requests'
						element={
							<ProtectedRoutes>
								<Requests />
							</ProtectedRoutes>
						}
					/>
					<Route
						exact
						path='/'
						element={
							<ProtectedRoutes>
								<Home />
							</ProtectedRoutes>
						}
					/>

					<Route
						exact
						path='/profile'
						element={
							<ProtectedRoutes>
								<Profile />
							</ProtectedRoutes>
						}
					/>
					<Route
						exact
						path='/users'
						element={
							<ProtectedRoutes>
								<Users />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</Router>
		</Fragment>
	)
}

export default App
