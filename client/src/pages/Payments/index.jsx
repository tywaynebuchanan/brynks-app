import React, {Fragment, useEffect} from "react"
import PageTitle from "../../components/PageTitle"
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js"
import axios from "axios"
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"

const Payments = () => {
	const stripe = useStripe()
	const elements = useElements()
	const options = {
		style: {
			base: {
				fontSize: "16px",
			},
			invalid: {
				color: "#00000",
			},
		},
	}
	const {user} = useSelector(state => state.users)
	useEffect(() => {}, [])
	return (
		<Fragment>
			<div className='flex justify-between items-center'>
				<PageTitle title='Make a Deposit' />
			</div>
			<div className='flex gap-2 justify-between items-center mt-2'>
				<form action=''>
					<div className='flex gap-2 items-center justify-between mt-2 w-100'>
						<label htmlFor='card_num_field'>Card Number</label>
						<CardNumberElement
							type='text'
							// id='card_num_field'
							options={options}
						/>
					</div>
					<div className='flex gap-2 items-center justify-between w-100'>
						<label htmlFor='card_exp_field'>Card Expiry Detials</label>
						<CardExpiryElement
							type='text'
							id='card_exp_field'
							options={options}
						/>
					</div>
					<div className='flex gap-2 items-center justify-between w-100'>
						<label htmlFor='card_cvc_field'>CVC</label>
						<CardCvcElement type='text' id='card_cvc_field' options={options} />
					</div>
					<div className='flex gap-2 justify-end'>
						<button className='primary-outlined-btn'>Pay Now!</button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default Payments
