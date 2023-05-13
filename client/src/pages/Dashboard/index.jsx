import {useState, useEffect, Fragment} from "react"
import {useNavigate} from "react-router-dom"
import {message} from "antd"
import {getUserInfo} from "../../api/users"
import PageTitle from "../../components/PageTitle"
import {useSelector, useDispatch} from "react-redux"

const Home = () => {
	const navigate = useNavigate()
	const {user} = useSelector(state => state.users)
	const dispatch = useDispatch()
	return (
		<Fragment>
			<div className='flex justify-between items-center'>
				<PageTitle
					title={` Hi ${user.firstName}, Welcome to your Brynks Wallet`}
				/>
			</div>
			<div className='bg-primary p-2 mt-2 b-r-1 shadow flex flex-col gap-1'>
				<div className='flex justify-between text-white'>
					<h1 className='text-md text-white'>Account Number:</h1>
					<h1 className='text-md text-white'>{user._id}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md text-white'>Brynks Balance:</h1>
					<h1 className='text-md text-white'>${user.balance || 0}</h1>
				</div>
			</div>
			<div className='bg-white p-2 mt-2 b-r-1 shadow flex flex-col gap-1'>
				<div className='flex justify-between'>
					<h1 className='text-md'>First Name:</h1>
					<h1 className='text-md text-uppercase'>{user.firstName}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Last Name:</h1>
					<h1 className='text-md text-uppercase'>{user.lastName}</h1>
				</div>

				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Email:</h1>
					<h1 className='text-md text-uppercase'>{user.email}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Phone Number:</h1>
					<h1 className='text-md text-uppercase'>{user.cellPhone}</h1>
				</div>
			</div>
		</Fragment>
	)
}

export default Home
