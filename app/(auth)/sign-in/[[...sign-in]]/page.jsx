import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
        </div>
        <SignIn />
      </div>
    </>
  );
}