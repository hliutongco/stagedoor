import { auth, currentUser } from '@clerk/nextjs/server';
// import ShowsList from '../components/ShowsList';

export default async function MyProfilePage() {
  const user = await currentUser();
  if (!user) return (await auth()).redirectToSignIn();
  return (
    <>
      <h1>{user?.firstName ?? 'User'}&apos;s Profile</h1>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {/* {shows && <ShowsList shows={shows} />} */}
      </div>
    </>
  );
}
