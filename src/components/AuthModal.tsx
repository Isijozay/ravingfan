import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X, Briefcase, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'personal' | 'business' | ''>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      accountType: accountType as 'personal' | 'business'
    };

    setUser(user);

    if (accountType === 'business') {
      navigate('/business/setup');
    } else {
      navigate('/dashboard');
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>

                {step === 1 ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Create your account</h2>
                    <p className="text-gray-600">Choose your account type to get started</p>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setAccountType('personal');
                          setStep(2);
                        }}
                        className="w-full p-4 text-left border rounded-lg hover:border-purple-500 focus:border-purple-500 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-purple-600" />
                          <div>
                            <span className="text-lg font-medium block">Personal Account</span>
                            <span className="text-sm text-gray-500">For individual reviewers and consumers</span>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setAccountType('business');
                          setStep(2);
                        }}
                        className="w-full p-4 text-left border rounded-lg hover:border-purple-500 focus:border-purple-500 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                          <div>
                            <span className="text-lg font-medium block">Business Account</span>
                            <span className="text-sm text-gray-500">For companies and service providers</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Create your account</h2>
                    <p className="text-gray-600">Fill in your basic information</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="mt-4 text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <button className="text-purple-600 hover:underline">Sign in</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}