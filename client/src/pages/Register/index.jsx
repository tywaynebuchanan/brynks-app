import React, {Fragment} from "react"
import {Form, Col, Row, message, Input} from "antd"
import {useNavigate} from "react-router-dom"
import {registerUser} from "../../api/users"
import {ShowLoading, HideLoading} from "../../redux/loaderSlice"
import {useDispatch} from "react-redux"

const Register = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const selectOptions = [
		{
			value: "NATIONAL_ID",
			text: "National ID or Voter's Id",
		},

		{
			value: "PASSPORT",
			text: "Passport",
		},
		{
			value: "DRIVER'S LICENSE",
			text: "Driver's License",
		},
	]

	const onFinish = async values => {
		try {
			dispatch(ShowLoading())
			const res = await registerUser(values)
			dispatch(HideLoading())
			if (res.success) {
				message.success(res.msg)
				navigate("/login")
			} else {
				dispatch(HideLoading())
				message.error(res.msg)
			}
		} catch (error) {
			dispatch(HideLoading())
			message.error(error.msg)
		}
	}

	return (
		<Fragment>
			<div className='m-5'>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl text-uppercase'>brynks wallet - register</h1>
					<h1 className='text-sm on-hover' onClick={() => navigate("/login")}>
						Already a Member? Login
					</h1>
				</div>

				<hr />
				<Form layout='vertical' onFinish={onFinish}>
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item
								label='First Name'
								name='firstName'
								hasFeedback 
								validateStatus="success"
								rules={[
									{
										required: true,
										message: "Please enter your first name",
									},
								]}>
								<Input type='text' placeholder='First Name'/>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label='Last Name'
								name='lastName'
								rules={[
									{
										required: true,
										message: "Please enter your last name",
									},
								]}>
								<input type='text' placeholder='Last Name' />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label='Email'
								name='email'
								rules={[
									{
										type: "email",
										message: "The input is not valid E-mail!",
									},
									{
										required: true,
										message: "An email is required",
									},
								]}>
								<input type='email' placeholder='eg. bob@brynks.com' />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label='Cell Phone'
								name='cellPhone'
								rules={[
									{
										required: true,
										message: "Please enter your cell phone number",
									},
								]}>
								<input type='tel' />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item label='Identification Type' name='idType'>
								<select>
									{selectOptions.map((option, index) => (
										<option key={index} value={option.value}>
											{option.text}
										</option>
									))}
								</select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label='Identification Number' name='idNumber'>
								<input type='text' name='' id='' />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item label='Address' name='address'>
								<input type='text' name='' id='' />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label='Address 2' name='address2'>
								<input type='text' name='' id='' />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label='City' name='city'>
								<input type='text' name='' id='' />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label='Parish' name='parish'>
								<select>
									<option value='Saint Catherine'>Saint Catherine</option>
								</select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item
								label='Password'
								name='password'
								rules={[
									{
										required: true,
										message: "Password does not match the criteria",
									},
								]}>
								<input
									type='password'
									pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
								/>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label='Confirm Password'
								name='confirmPassword'
								dependencies={["password"]}
								rules={[
									{
										required: true,
										message: "Please confirm your password!",
									},
									({getFieldValue}) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve()
											}
											return Promise.reject(
												new Error(
													"The two passwords that you entered do not match!"
												)
											)
										},
									}),
								]}>
								<input type='password' name='' id='' />
							</Form.Item>
						</Col>
					</Row>

					<div className='flex'>
						<button className='primary-contained-btn reg' type='submit'>
							Register
						</button>
					</div>
				</Form>
			</div>
		</Fragment>
	)
}

export default Register
