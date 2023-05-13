import React from "react"

export const Plus = () => {
	return (
		<div className='flex justify-center items-center success'>
			<i class='ri-add-line'></i>
			Debit
		</div>
	)
}

export const Minus = () => {
	return (
		<div className='flex justify-center items-center error'>
			<i class='ri-subtract-line'></i>
			Credit
		</div>
	)
}

export const Accepted = ({text}) => {
	return (
		<div className='flex justify-center items-center success-light'>{text}</div>
	)
}

export const Rejected = ({text}) => {
	return (
		<div className='flex justify-center items-center error-light'>{text}</div>
	)
}

export const Sent = ({text}) => {
	return (
		<div className='flex justify-end items-center'>
			{text}<i class='ri-arrow-right-up-line'></i>
		</div>
	)
}

export const Received = ({text}) => {
	return (
		<div className='flex justify-end items-center'>
			{text}<i class="ri-arrow-left-down-line"></i>
		</div>
	)
}

