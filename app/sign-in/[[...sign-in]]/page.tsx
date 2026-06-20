import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Connexion — MDM Academy',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#080B12]">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#5E6AD2',
            colorBackground: '#0D1117',
            colorNeutral: '#9AA2B4',
            borderRadius: '0.75rem',
          },
        }}
      />
    </div>
  );
}
