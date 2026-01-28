
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompleteAccountSetupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    newsletter: true,
    weeklyDigest: false,
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock verified email - in real app, this would come from URL token/context
  const verifiedEmail = 'user@example.com';

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle account creation logic here
    console.log('Account setup submitted:', formData);
  };

  return (
    <main className="bg-gray-50 flex-grow min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EE6260] text-white flex items-center justify-center text-sm font-bold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">Email Verified</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1a2a44] text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm font-bold text-[#1a2a44]">Complete Profile</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm font-medium text-gray-400">Start Reading</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-[#EE6260] text-white font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 mb-4">Almost There</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2a44] mb-3">
              Complete Your Account
            </h1>
            <p className="text-gray-600">
              Just a few more details to unlock your free access
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-10">
            {/* Verified Email Display */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-green-800">Email Verified</p>
                <p className="text-sm text-green-700">{verifiedEmail}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    First Name <span className="text-[#EE6260]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6260] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name <span className="text-[#EE6260]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6260] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Create Password <span className="text-[#EE6260]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    placeholder="At least 8 characters"
                    minLength={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6260] focus:border-transparent transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password <span className="text-[#EE6260]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    placeholder="Re-enter your password"
                    minLength={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6260] focus:border-transparent transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold text-gray-700 mb-4">Email Preferences</h3>

                {/* Newsletter Preferences */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#EE6260] border-gray-300 rounded focus:ring-[#EE6260]"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900 group-hover:text-[#EE6260] transition">Brussels Calling Newsletter</span>
                      <p className="text-xs text-gray-500">Daily coverage of European politics and policy</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.weeklyDigest}
                      onChange={(e) => handleInputChange('weeklyDigest', e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#EE6260] border-gray-300 rounded focus:ring-[#EE6260]"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900 group-hover:text-[#EE6260] transition">Weekly Digest</span>
                      <p className="text-xs text-gray-500">A summary of the week's top stories every Sunday</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="border-t border-gray-200 pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-[#EE6260] border-gray-300 rounded focus:ring-[#EE6260]"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#EE6260] hover:underline font-medium">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-[#EE6260] hover:underline font-medium">Privacy Policy</Link>
                    <span className="text-[#EE6260]"> *</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#EE6260] text-white font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#d44947] transition-all shadow-lg"
              >
                Create My Account
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#EE6260] font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>

          {/* Benefits Reminder */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-4">Your Free Account Includes</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>5 free articles/month</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Daily newsletter</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#EE6260]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Save favorites</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompleteAccountSetupPage;
