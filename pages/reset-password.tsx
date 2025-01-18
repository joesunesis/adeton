import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [mobile1, setMobile1] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const OTP_VALIDITY_PERIOD = 100; // 300 seconds (5 min)
  const [timeLeft, setTimeLeft] = useState(OTP_VALIDITY_PERIOD);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP sent logic (Replace with API call)
    alert(`OTP sent to ${mobile1}`);
    setStep(2);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification logic (Replace with API call)
    
    if (otp === '1234') {
      alert('OTP verified successfully!');
      setStep(3);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password reset logic (Replace with API call)
    alert('Password reset successful!');
    router.push('/signin');
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  return (
    <div className='p-4 flex justify-center items-start sm:items-center'>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <h1 className="text-lg font-bold mb-4 text-center">
              Reset Your Password
            </h1>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Enter your mobile number to receive an OTP for password reset.
            </p>

            {/* Mobile/Email Input */}
            <input
              type="text"
              id="mobile1"
              value={mobile1}
              onChange={(e) => setMobile1(e.target.value)}
              required
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Request OTP Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4">
            <h1 className="text-lg font-bold mb-4 text-center">
              Verify OTP
            </h1>
            <p className="text-green-00 text-sm mb-6 text-center">
              {!isExpired && `Time left: ${formatTime(timeLeft)}`}
            </p>

            {/* OTP Input */}
            {isExpired ? (
              <p className="text-red-500 text-sm mb-6 text-center">The OTP has expired. Please request a new one.</p>
            ) : (
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter the OTP sent to your mobile."
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}

            {/* Verify OTP Button */}
            {isExpired ? (
              <button
                onClick={() => window.location.reload}
                className="w-full bg-red-400 text-green-300 py-2 rounded-md font-bold hover:bg-green-300 hover:text-red-500"
              >
                Request OTP
              </button>
            ) : (
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <h1 className="text-lg font-bold mb-4 text-center">
              Reset Password
            </h1>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Enter your new password to reset your account.
            </p>

            {/* New Password Input */}
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}