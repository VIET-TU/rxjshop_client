import Image from 'next/image'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex">
			<div className="w-[55%]">
				<div className="content px-[100px] mt-[50px]">{children}</div>
			</div>

			<div className="w-[45%]">
				<Image
					src="/background-auth.png"
					alt="background-auth"
					width={641}
					height={400}
					priority={true}
					className="w-full h-[100vh]"
				/>
			</div>
		</div>
	)
}
