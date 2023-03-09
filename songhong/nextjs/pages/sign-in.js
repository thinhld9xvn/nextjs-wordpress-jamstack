import { useEffect } from 'preact/compat'
import { signIn, useSession } from 'next-auth/react'

const SignInPage = () => {
  const {data: session, status} = useSession();

  useEffect(() => {
    if (status !== 'loading' && !session) void signIn('facebook');
    if (status !== 'loading' && session) window.close();
  }, [session, status])

  return null;
}

export default SignInPage