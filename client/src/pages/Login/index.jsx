import React, {Fragment} from "react"
import {Col, Row, Form, message,Checkbox} from "antd"
import {Link, useNavigate} from "react-router-dom"
import {loginUser} from "../../api/users"
import {useDispatch} from "react-redux"
import {ShowLoading} from "../../redux/loaderSlice"
import {HideLoading} from "../../redux/loaderSlice"
import Logo from "../../assets/logo-black.png"

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const onFinish = async values => {
		try {
			dispatch(ShowLoading())
			const res = await loginUser(values)
			dispatch(HideLoading())
			if (res.success) {
				localStorage.setItem("token", res.data)
				console.log(res.msg)
				message.success(res.msg)
				navigate("/")
			} else if (!res.success) {
				dispatch(HideLoading())
				message.error(res.msg)
				console.log(res.msg)
			}
		} catch (error) {
			dispatch(HideLoading())
			console.log(error)
			message.error(error)
		}
	}
	return (
		<Fragment>
			<div className='bg-primary flex items-center justify-center h-screen'>
				<div className='card w-400 p-2'>
					<div className='flex items-center justify-between w-400'>
						<img src={Logo} alt='Brynks Logo' className='login-logo' />
					</div>
					<Form layout='vertical' onFinish={onFinish}>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label='Email' name='email'>
									<input type='email' placeholder="Username"/>
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item label='Password' name='password'>
									<input type='password' placeholder="Enter Password" />
								</Form.Item>
							</Col>
						</Row>

						

						<button className='primary-contained-btn reg w-100' type='submit'>
							Login
						</button>

						<div className='flex justify-between mt-2'>
							<h1
								className='text-sm on-hover'
								onClick={() => navigate("/forget-password")}>
								Forget Password?
							</h1>
							<h1
							className='text-sm on-hover'
							onClick={() => navigate("/register")}>
							Not a Member? Register Now!
						</h1>
						</div>
						
					</Form>
				</div>
			</div>
		</Fragment>
	)
}

export default Login
