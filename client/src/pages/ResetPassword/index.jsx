import React, {Fragment} from "react"
import {Col, Row, Form, message,Checkbox} from "antd"
import {Link, useNavigate} from "react-router-dom"
import {getEmailReset} from "../../api/users"
import {useDispatch} from "react-redux"
import {ShowLoading} from "../../redux/loaderSlice"
import {HideLoading} from "../../redux/loaderSlice"
import Logo from "../../assets/logo-black.png"

const ResetPassword = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const onFinish = async values => {
		try {
			dispatch(ShowLoading())
			const res = await getEmailReset(values)
			dispatch(HideLoading())
			if (res.success) {
				console.log(res.msg)
				message.success(res.msg)
				navigate("/login")
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
                    <div className="flex justify-center items-center">
                        <h1 className="text-lg mt-2 mb-2">It looks like you have forgotten your password. Please enter your email address.</h1>
                    </div>
					<Form layout='vertical' onFinish={onFinish}>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label='Email' name='email'
                                rules={[
                                    {
                                        type:"email",
                                        message: "Please provide a valid email"
                                    },
									{
										required: true,
										message: "Please enter your email"
									}
                                ]}>
									<input type='email' placeholder="Username"/>
								</Form.Item>
							</Col>
						</Row>

						

						<button className='primary-contained-btn reg w-100' type='submit'>
							Reset Password
						</button>
						
					</Form>
				</div>
			</div>
		</Fragment>
	)
}

export default ResetPassword
