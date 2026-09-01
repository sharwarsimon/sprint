import React, { useState, useEffect } from 'react';
import { X, User, Sparkles, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Gender } from '../types';
import { useUser } from '../context/UserContext';

interface UserEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRoomId?: string | null;
  onSuccess: (roomId?: string | null) => void;
}

export const UserEntryModal: React.FC<UserEntryModalProps> = ({
  isOpen,
  onClose,
  targetRoomId,
  onSuccess
}) => {
  const { user, setUserProfile, agreedToRules, setAgreedToRules } = useUser();

  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState<string>(user?.age ? String(user.age) : '');
  const [gender, setGender] = useState<Gender>(user?.gender || 'Other');
  const [agreed, setAgreed] = useState<boolean>(agreedToRules);
  const [errors, setErrors] = useState<{ name?: string; age?: string; gender?: string; rules?: string }>({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAge(String(user.age));
      setGender(user.gender);
    }
    setAgreed(agreedToRules);
    setErrors({});
  }, [user, agreedToRules, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: { name?: string; age?: string; gender?: string; rules?: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      errs.name = 'Please enter your chat display name.';
    } else if (trimmedName.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    } else if (trimmedName.length > 25) {
      errs.name = 'Name must be less than 25 characters.';
    }

    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge)) {
      errs.age = 'Age is required.';
    } else if (parsedAge < 13 || parsedAge > 100) {
      errs.age = 'Age must be between 13 and 100.';
    }

    if (!gender) {
      errs.gender = 'Please select a gender.';
    }

    if (!agreed) {
      errs.rules = 'You must agree to the community rules to enter.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedAge = parseInt(age, 10);
    setUserProfile(name.trim(), parsedAge, gender);
    setAgreedToRules(true);
    onSuccess(targetRoomId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-2xl text-[#3E2723] p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-[#3E2723] hover:bg-stone-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] mb-3 shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#3E2723] tracking-tight">Enter Chat Room</h2>
          <p className="text-xs text-stone-500 mt-1">
            Choose your nickname and quick profile before joining the public room.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label htmlFor="user-name-input" className="block text-xs font-bold uppercase tracking-wider text-[#3E2723] mb-1.5">
              Display Name <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              id="user-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. Simon, Sarah, Alex"
              maxLength={25}
              className={`w-full px-4 py-2.5 rounded-xl bg-stone-50 border text-sm text-[#3E2723] placeholder-stone-400 focus:outline-none focus:ring-2 transition ${
                errors.name ? 'border-rose-500 focus:ring-rose-500/20' : 'border-stone-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="user-age-input" className="block text-xs font-bold uppercase tracking-wider text-[#3E2723] mb-1.5">
              Age <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              id="user-age-input"
              type="number"
              min={13}
              max={100}
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                if (errors.age) setErrors(prev => ({ ...prev, age: undefined }));
              }}
              placeholder="13 - 100"
              className={`w-full px-4 py-2.5 rounded-xl bg-stone-50 border text-sm text-[#3E2723] placeholder-stone-400 focus:outline-none focus:ring-2 transition ${
                errors.age ? 'border-rose-500 focus:ring-rose-500/20' : 'border-stone-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20'
              }`}
            />
            <p className="text-[11px] text-stone-500 mt-1">Age is kept private and not displayed publicly in chat.</p>
            {errors.age && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.age}</span>
              </p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#3E2723] mb-2">
              Gender <span className="text-[#FF6B00]">*</span>
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Male', 'Female', 'Other'] as Gender[]).map((option) => (
                <label
                  key={option}
                  id={`gender-option-${option.toLowerCase()}`}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition select-none ${
                    gender === option
                      ? 'bg-orange-50 border-[#FF6B00] text-[#FF6B00] ring-1 ring-[#FF6B00]'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={() => {
                      setGender(option);
                      if (errors.gender) setErrors(prev => ({ ...prev, gender: undefined }));
                    }}
                    className="sr-only"
                  />
                  <span>{option === 'Male' ? '👦 Male' : option === 'Female' ? '👧 Female' : '✨ Other'}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>

          {/* Community Guidelines Box */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#3E2723]">
              <Shield className="w-4 h-4 text-[#FF6B00]" />
              <span>Community Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-stone-500 text-[11px]">
              <li>Be respectful to everyone.</li>
              <li>No harassment, hate speech, or spam.</li>
              <li>No illegal or explicit content.</li>
              <li>Do not share sensitive personal information.</li>
            </ul>

            <label className="flex items-center gap-2 pt-2 border-t border-stone-200 cursor-pointer select-none text-[#3E2723] font-semibold text-xs">
              <input
                id="agree-rules-checkbox"
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (errors.rules) setErrors(prev => ({ ...prev, rules: undefined }));
                }}
                className="w-4 h-4 rounded text-[#FF6B00] bg-white border-stone-300 focus:ring-[#FF6B00]"
              />
              <span>I Agree to the Community Guidelines</span>
            </label>
            {errors.rules && (
              <p className="text-xs text-rose-500 pt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.rules}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            id="enter-room-submit-button"
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-2"
          >
            <span>Agree & Enter Room</span>
          </button>
        </form>

      </div>
    </div>
  );
};

