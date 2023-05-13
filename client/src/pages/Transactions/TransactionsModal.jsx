import React, {Fragment, useState} from "react"
import {Button, Form, Modal, Col, Row, message} from "antd"
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"
import {transferFunds, verifyAcc} from "../../api/transactions"
import { ShowLoading,HideLoading } from "../../redux/loaderSlice"
import { ReloadUser } from "../../redux/usersSlice"

const TransactionsModal = ({showModal, setShowModal, reloadData}) => {
	const {user} = useSelector(state => state.users)
	const [isVerified, setIsVerified] = useState("")
	const dispatch = useDispatch()
	const [form] = Form.useForm()

	const onFinish = async values => {
		try {

			dispatch(ShowLoading)
			const payload = {
				...values,
				sender: user._id,
				status: "Success",
			}
			const response = await transferFunds(payload)
			if (response.success) {
				reloadData()
				setShowModal(false)
				console.log(response.msg)
				message.success(response.msg)
				dispatch(ReloadUser(true))
			} else {
				dispatch(HideLoading)
				message.error(response.msg)
			}
		} catch (error) {
			dispatch(HideLoading)
			console.log(error)
			message.error("Internal Server Error")
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
			title='Transfer Funds'
			open={showModal}
			onCancel={() => setShowModal(false)}
			onClose={() => {
				setShowModal(false)
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
						onClick={() => setShowModal(false)}>
						Cancel
					</button>
					{isVerified === true && (
						<button className='primary-contained-btn'>Transfer</button>
					)}
				</div>
			</Form>
		</Modal>
	)
}

export default TransactionsModal
