import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: "S'inscrire — MDM Academy",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#080B12]">
      <SignUp
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
