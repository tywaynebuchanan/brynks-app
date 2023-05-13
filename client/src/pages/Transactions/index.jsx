import {useState, useEffect, Fragment} from "react"
import PageTitle from "../../components/PageTitle"
import {Table,message} from "antd"
import TransactionsModal from "./TransactionsModal"
import {transactionsList} from "../../api/transactions"
import {ShowLoading, HideLoading} from "../../redux/loaderSlice"
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"
import {Plus, Minus, Accepted, Rejected} from "../../components/Plus"
import moment from "moment"
import {useNavigate} from "react-router-dom"
import DepositModel from "./DepositModel"

const Transactions = () => {
	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			render: (text, record) => {
				return moment(record.createdAt).format("MMMM D, YYYY h:mm a")
			},
		},
		{
			title: "Transaction ID",
			dataIndex: "_id",
		},
		{
			title: "Amount",
			dataIndex: `amount`,
			render(text, record) {
				return "$" + record.amount.toLocaleString("en")
			},
		},
		{
			title: "Type",
			dataIndex: "type",
			render(text, record) {
				return {
					children: (
						<div>{record.sender._id === user._id ? <Minus /> : <Plus />}</div>
					),
				}
			},
		},
		{
			title: "Reference Account",
			dataIndex: "",
			render: (text, record) => {
				return record.sender._id === user._id ? (
					<div>
						<h1 className='text-sm'>
							{record.receiver.firstName} {record.receiver.lastName}
						</h1>
					</div>
				) : (
					<div>
						<h1 className='text-sm'>
							{record.sender.firstName} {record.sender.lastName}
						</h1>
					</div>
				)
			},
		},
		{
			title: "Descripton",
			dataIndex: "description",
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (text, record) => {
				return (
					<div>
						{record.status === "Success" || "success" ? (
							<Accepted text={record.status} />
						) : (
							<Rejected text={record.status} />
						)}
					</div>
				)
			},
		},
	]
	const {user} = useSelector(state => state.users)
	const [showModal, setShowModal] = useState(false)
	const [showDeposit, setShowDeposit] = useState(false)
	const dispatch = useDispatch()
	const [transactions, setTransactions] = useState([])
	const navigate = useNavigate()

	const getTransactions = async () => {
		try {
			dispatch(ShowLoading)
			const response = await transactionsList()
			if (response.success) {
				setTransactions(response.data)
			}

			dispatch(HideLoading)
		} catch (error) {
			dispatch(HideLoading)
			setTransactions("")
			message.error(error.message)
		}
	}
	useEffect(() => {
		getTransactions()
	}, [])
	return (
		<Fragment>
			<div>
				<div className='flex justify-between items-center'>
					<PageTitle title='Transactions' />
					<div className='flex gap-1'>
						{/* <button className='primary-outlined-btn text-uppercase'>
							Request
						</button> */}
						{/* <button disabled className='primary-outlined-btn text-uppercase'
						onClick={()=>navigate("/payments")}
						>
							Deposit
						</button> */}
						<button
							className='primary-contained-btn reg text-uppercase'
							onClick={() => setShowModal(true)}>
							Send Money
						</button>
					</div>
				</div>
				<Table
					columns={columns}
					dataSource={transactions}
					className='mt-2'></Table>
				{showModal && (
					<TransactionsModal
						showModal={showModal}
						setShowModal={setShowModal}
						reloadData={getTransactions}
					/>
				)}

				{showDeposit && (
					<DepositModel
						showDeposit={showDeposit}
						setShowDeposit={setShowDeposit}
					/>
				)}
			</div>
		</Fragment>
	)
}

export default Transactions
