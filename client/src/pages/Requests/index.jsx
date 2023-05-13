import {useState, useEffect, Fragment} from "react"
import {message, Table} from "antd"
import {getter,setter,endpoints} from "../../api/request"

import PageTitle from "../../components/PageTitle"
import {Tabs} from "antd"
import TabPane from "antd/es/tabs/TabPane"
import RequestModal from "./RequestModal"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import {ReloadUser} from "../../redux/usersSlice"
import {ShowLoading, HideLoading} from "../../redux/loaderSlice"
import {Plus, Minus, Accepted,Sent, Received} from "../../components/Plus"
import moment from "moment"

const Requests = () => {
	const {user, reloadData} = useSelector(state => state.users)
	const dispatch = useDispatch()
	const [sentData, setRequestsSent] = useState([])
	const [showRequestModal, setShowRequestModal] = useState(false)

	const getRequests = async () => {
		try {
			const response = await getter(endpoints.requests)
			console.log(response)
			if (response.success) {
				const senderData = response.data.filter(
					item => item.sender._id === user._id
				)
				const receiverData = response.data.filter(
					item => item.receiver._id === user._id
				)
				setRequestsSent({
					sent: senderData,
					receiver: receiverData,
				})
			}
		} catch (error) {
			setRequestsSent("")
			console.log(error)
			message.error(error)
		}
	}

	const updateStatus = async (record, status) => {
		try {
			if (status === "Accepted" && record.amount > user.balance) {
				message.error("Insufficient Funds")
				return
			} else {
				dispatch(ShowLoading)
				const response = await setter(endpoints.update({...record, status}))
				dispatch(HideLoading)
				console.log(response)
				if (response.success) {
					getRequests()
					dispatch(ReloadUser(true))
				} else {
					dispatch(HideLoading)
					message.error(response.msg)
				}
			}
		} catch (error) {
			dispatch(HideLoading)
			console.log(error)
			message.error("Internal Server Error")
		}
	}

	const columns = [
		{
			title: "Request ID",
			dataIndex: "_id",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			render(text, record) {
				return "$" + record.amount.toLocaleString("en")
			},
		},
		{
			title: "Sender",
			dataIndex: "sender",
			render(sender) {
				return sender.firstName + " " + sender.lastName
			},
		},
		{
			title: "Receiver",
			dataIndex: "receiver",
			render(receiver) {
				return receiver.firstName + " " + receiver.lastName
			},
		},

		{
			title: "Date",
			dataIndex: "date",
			render: (text, record) => {
				return moment(record.createdAt).format("MMMM D, YYYY h:mm a")
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (text, record) => {
				return (
					<div>
						{record.status === "Accepted" || "accepted" ? (
							<Accepted text={record.status} />
						) : (
							<Plus />
						)}
					</div>
				)
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (text, record) => {
				if (record.status === "Pending" && record.receiver._id === user._id) {
					return (
						<div className='flex gap-1'>
							<div
								className='text-sm underline'
								onClick={() => updateStatus(record, "Rejected")}>
								Reject
							</div>
							<div
								className='text-sm underline'
								onClick={() => updateStatus(record, "Accepted")}>
								Accept
							</div>
						</div>
					)
				}
			},
		},
	]

	useEffect(() => {
		getRequests()
	}, [])


	return (
		<Fragment>
			<div className='flex justify-between'>
				<PageTitle title='Request Funds' />
				<div className='flex gap-1'>
					<button
						className='primary-contained-btn reg text-uppercase'
						onClick={() => setShowRequestModal(true)}>
						Make a Request
					</button>
				</div>
			</div>
			<div className='mt-2'>
				<Tabs defaultActiveKey='1'>
					<TabPane tab={ <Sent text = "Sent"/>} key='1'>
						These are requests that you have sent to clients
						<Table
							columns={columns}
							dataSource={sentData.sent}
							className='mt-2'></Table>
					</TabPane>
					<TabPane tab={ <Received text = "Received"/>} key='2'>
						These are requests that you have received from clients
						<Table
							columns={columns}
							dataSource={sentData.receiver}
							className='mt-2'></Table>
					</TabPane>
				</Tabs>
			</div>

			{showRequestModal && (
				<RequestModal
					showRequestModal={showRequestModal}
					setShowRequestModal={setShowRequestModal}
					reloadData={getRequests}
				/>
			)}
		</Fragment>
	)
}

export default Requests
