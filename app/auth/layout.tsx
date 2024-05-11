import { Metadata } from "next"


export const metadata: Metadata = {
    title: "登录Bug窝子"
}

const AuthLayout = ({ children }: React.PropsWithChildren) => {

    return (
        <div className="mb-32 pl-5 pr-5">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto rounded"
                        src="/logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
                        欢迎来到Bug窝子
                    </h2>
                </div>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {children}
            </div>
        </div>
    )
}
export default AuthLayout