import {useState, useEffect, Fragment} from "react"
import {useNavigate} from "react-router-dom"
import {Modal, message} from "antd"
import {getUserInfo} from "../../api/users"
import {useSelector} from "react-redux"
import PageTitle from "../../components/PageTitle"
import {Accepted, Rejected} from "../../components/Plus"
import ChangePasswordModal from "./ChangePasswordModal"

const Profile = () => {
	const {user} = useSelector(state => state.users)
	const [passwordModal,showPasswordModal] = useState(false)
	return (
		<>
		<Fragment>
			<div className='flex justify-between items-center'>
				<PageTitle title='Profile' />
			</div>
			<div className='bg-white p-2 mt-2 b-r-1 shadow flex flex-col gap-1'>
				<div className='flex justify-between'>
					<h1 className='text-md'>First Name:</h1>
					<h1 className='text-md'>{user.firstName}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Last Name:</h1>
					<h1 className='text-md'>{user.lastName}</h1>
				</div>

				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Email:</h1>
					<h1 className='text-md'>{user.email}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Phone Number:</h1>
					<h1 className='text-md'>{user.cellPhone}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Address:</h1>
					<h1 className='text-md'>
						{user.address +
							" " +
							user.address2 +
							" " +
							user.city +
							" " +
							user.parish}
					</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>ID Type</h1>
					<h1 className='text-md'>{user.idType}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>ID Number</h1>
					<h1 className='text-md'>{user.idNumber}</h1>
				</div>
				<div className='flex justify-between mt-1'>
					<h1 className='text-md'>Verified</h1>
					<h1 className='text-md'>
						{user.isVerified ? <Accepted text='Yes' /> : <Rejected text='No' />}
					</h1>
				</div>
				<div className='flex justify-between'>
					<h1 className='text-md mt-1'>Password</h1>
					<button className="primary-contained-btn sm" onClick={()=>showPasswordModal(true)}>Change</button>
					
				</div>
			</div>
		</Fragment>
		<Fragment>

		{passwordModal && 
		<ChangePasswordModal showPasswordModal = {showPasswordModal}
		passwordModal = {passwordModal}/>
		}
			
		</Fragment>
		</>
	)
}

export default Profile
