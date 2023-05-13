import React, {Fragment, useEffect, useState} from "react"
import PageTitle from "../../components/PageTitle"
import {Table,message} from "antd"
import moment from "moment"
import {VerifyUser, getUsers} from "../../api/users"
import {Accepted, Rejected} from "../../components/Plus"

const Users = () => {

   const updateStatus = async (record,isVerified)=>{
    try {
      const response = await VerifyUser({
        selectedUser: record._id,
        isVerified
      }
      )
      if(response.success){
        message.success(response.msg);
        getData()
      }else{
        message.error(response.msg)
      }
    } catch (error) {
        message.error(error.message)
    }
  }
	const getData = async () => {
		try {
			const users = await getUsers()
			console.log(users.data)
			setUsers(users.data)
		} catch (error) {
			console.log(error)
		}
	}
	const columns = [
    {
      title: "Registed On",
      dataIndex: "date",
      render:(text,record)=>{
				return moment(record.createdAt).format("MMMM D, YYYY h:mm a")
			},
    },
     {
      title: "Last Updated",
      dataIndex: "date",
      render:(text,record)=>{
				return moment(record.updatedAt).format("MMMM D, YYYY h:mm a")
			},
    },
		{
			title: "First Name",
			dataIndex: "firstName",
		},
		{
			title: "Last Name",
			dataIndex: "lastName",
		},
    {
      title: "Email",
      dataIndex: "email"
    },
		{
			title: "Is Verified",
			dataIndex: "isVerified",
			render: (text, record) => {
				return (
					<div>
						{record.isVerified === true ? (
							<Accepted text='Yes' />
						) : (
							<Rejected text='No' />
						)}
					</div>
				)
			},
		},
		{
			title: "Balance",
			dataIndex: "balance",
			render(text, record) {
				return "$" + record.balance.toLocaleString("en")
			},
		},

		{
			title: "Action",
			dataIndex: "actions",
			render: (text, record) => {
				return (
					<div className='flex gap-1'>
						{record.isVerified ? (
							<button className='primary-outlined-btn'
              onClick={()=>updateStatus(record,false)}>Suspend</button>
						) : (
							<button className='primary-outlined-btn'
               onClick={()=>updateStatus(record,true)}
              >Activate</button>
						)}
					</div>
				)
			},
		},
	]
	const [users, setUsers] = useState([])

 

	useEffect(() => {
		getData()
	}, [])

	return (
		<Fragment>
			<div className='flex justify-between items-center'>
				<PageTitle title='Users' />
			</div>

			<Table columns={columns} dataSource={users} className='mt-2'></Table>
		</Fragment>
	)
}

export default Users
