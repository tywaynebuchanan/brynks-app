import {Form, Modal} from "antd"
import React, {useEffect, useState} from "react"

import {getstripeApiKey} from "../../api/transactions"
import {useSelector} from "react-redux"
import axios from "axios"

const DepositModel = ({showDeposit, setShowDeposit, reloadData}) => {
	const [form] = Form.useForm()
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const onToken = token => {
		console.log(token)
	}
	return (
		<Modal
			title='Make a Deposit to your Account'
			open={showDeposit}
			onCancel={() => setShowDeposit(false)}
			onClose={() => {
				setShowDeposit(false)
			}}
			footer={null}>
			<div className='flex-col gap-1'>
				
			</div>
		</Modal>
	)
}

export default DepositModel
