import {useState, useEffect, useReducer} from "react"
import {message} from "antd"
import {getUserInfo} from "../api/users"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {SetUser,ReloadUser} from "../redux/usersSlice"
import { ShowLoading,HideLoading } from "../redux/loaderSlice"
import DefaultLayout from "./DefaultLayout"

const ProtectedRoutes = ({children}) => {
	const navigate = useNavigate()
	const {user,reloadUser} = useSelector(state => state.users)
	const dispatch = useDispatch()
	const getUser = async () => {
		try {
			dispatch(ShowLoading())
			const res = await getUserInfo()
			dispatch(HideLoading());
			if (res.success) {
				console.log(res.data)
				dispatch(SetUser(res.data))
			} else {
				dispatch(HideLoading())
				message.error(res.msg)
				navigate("/login")
			}
			dispatch(ReloadUser(false))
		} catch (error) {
			dispatch(HideLoading())
			navigate("/login")
			message.error(error.message)
		}
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			if (!user) {
				getUser()
			}
		} else {
			localStorage.clear()
			navigate("/login")
		}
	}, []);

	useEffect(()=>{
		if(reloadUser){
			getUser()
		}
	},[reloadUser])

	return (
		user && (
			<div>
				<DefaultLayout>
					{children}
				</DefaultLayout>
			</div>
		)
	)
}

export default ProtectedRoutes
