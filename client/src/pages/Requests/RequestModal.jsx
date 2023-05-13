import {Form, Modal, message} from "antd"
import React, {useState} from "react"
import {useSelector} from "react-redux"
import {verifyAcc} from "../../api/transactions"
import {endpoints,setter} from "../../api/request"

const RequestModal = ({showRequestModal, setShowRequestModal, reloadData}) => {
	const {user} = useSelector(state => state.users)
	const [isVerified, setIsVerified] = useState("")
	const [form] = Form.useForm()

	const onFinish = async values => {
		try {

			//check the balance
			if(values.amount > user.balance){
				message.error("Insufficent Funds")
				return;
			}
			const payload = {
				...values,
				sender: user._id,
				status: "Success",
			}
			const response = await setter(endpoints.send,payload)
			if (response.success) {
				reloadData()
				setShowRequestModal(false)
				console.log(response.msg)
				message.success(response.msg)
			} else {
				setShowRequestModal(false)
				message.error(response.msg)
			}
		} catch (error) {
			setShowRequestModal(false)
			console.log(error)
		}
	}
	const verifyAccount = async () => {
		try {
			const response = await verifyAcc({
				receiver: form.getFieldValue("receiver"),
			})

			console.log(response.data.isVerified)
			if (response.data.isVerified) {
				setIsVerified(true)
			}
			if (!response.data.isVerified) {
				console.log(response)
				setIsVerified(false)
			}
		} catch (error) {
			setIsVerified(false)
		}
	}

	return (
		<Modal
			title='Request Funds'
			open={showRequestModal}
			onCancel={() => setShowRequestModal(false)}
			onClose={() => {
				setShowRequestModal(false)
			}}
			footer={null}>
			<Form layout='vertical' form={form} onFinish={onFinish}>
				<div className='flex gap-2 items-center'>
					<Form.Item label='Account Number' name='receiver' className='w-100'>
						<input type='text' />
					</Form.Item>
					<button
						className='primary-contained-btn reg'
						onClick={verifyAccount}
						type='submit'>
						Verify
					</button>
				</div>

				{isVerified === true && (
					<div className='success p-1 mb-1'>
						<h1 className='text-sm text-white'>Account is Verified</h1>
					</div>
				)}
				{isVerified === false && (
					<div className='error p-1 mb-1'>
						<h1 className='text-sm text-white'>Account is Invalid</h1>
					</div>
				)}

				<div className='flex gap-2 items-center'>
					<Form.Item
						label='Amount'
						name='amount'
						className='w-100'
						rules={[
							{
								required: true,
								message: "Please enter an amount to send",
							},
							{
								max: user.balance,
								message: "You have insufficent funds to make this transfer",
							},
						]}>
						<input type='number' />
					</Form.Item>
				</div>

				<Form.Item label='Description' name='description'>
					<input type='text' />
				</Form.Item>
				<div className='flex gap-2 justify-end'>
					<button
						className='primary-outlined-btn reg'
						onClick={() => setShowRequestModal(false)}>
						Cancel
					</button>
					{isVerified === true && (
						<button className='primary-contained-btn'>Send Request</button>
					)}
				</div>
			</Form>
		</Modal>
	)
}

export default RequestModal
