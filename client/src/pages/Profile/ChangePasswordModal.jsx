import React from "react"
import {Form, Modal, message, Input} from "antd"
import {EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons"
import {changePassword} from "../../api/users"
import {useDispatch} from "react-redux"
import {ShowLoading, HideLoading} from "../../redux/loaderSlice"

const ChangePasswordModal = ({passwordModal, showPasswordModal}) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	const onFinish = async values => {
		try {
			dispatch(ShowLoading)
			const response = await changePassword(values)
			dispatch(HideLoading)
			if (response.success) {
				message.success(response.msg)
				showPasswordModal(false)
			} else {
				message.error(response.msg)
			}
		} catch (error) {
			showPasswordModal(false)
			message.error(error.response.message)
		}
	}
	return (
		<div>
			<Modal
				title='Change Password'
				open={passwordModal}
				onCancel={() => showPasswordModal(false)}
				footer={null}>
				<Form layout='vertical' form={form} onFinish={onFinish}>
					<Form.Item
						label='Current Password'
						name='currentpassword'
						rules={[
							{
								required: true,
								message: "Please enter your current password",
							},
						]}>
						<input type='password' placeholder='Enter your current password' />
					</Form.Item>
					<Form.Item
						label='New Password'
						name='password'
						rules={[
							{
								required: true,
								message: "Please enter your new password",
							},
						]}>
						<input type='password' placeholder='Enter New Password' />
					</Form.Item>

					<div className='flex justify-end gap-2'>
						<button
							className='primary-outlined-btn'
							onClick={() => showPasswordModal(false)}>
							Cancel
						</button>
						<button className='primary-contained-btn'>Change Password</button>
					</div>
				</Form>
			</Modal>
		</div>
	)
}

export default ChangePasswordModal
