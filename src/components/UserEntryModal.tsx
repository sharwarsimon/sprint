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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white mb-3 shadow-lg shadow-indigo-500/20">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enter Chat</h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose your nickname and quick profile before joining the public room.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label htmlFor="user-name-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Display Name <span className="text-rose-400">*</span>
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
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                errors.name ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="user-age-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Age <span className="text-rose-400">*</span>
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
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                errors.age ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20'
              }`}
            />
            <p className="text-[11px] text-slate-500 mt-1">Age is kept private and not displayed publicly in chat.</p>
            {errors.age && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.age}</span>
              </p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Gender <span className="text-rose-400">*</span>
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Male', 'Female', 'Other'] as Gender[]).map((option) => (
                <label
                  key={option}
                  id={`gender-option-${option.toLowerCase()}`}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition select-none ${
                    gender === option
                      ? 'bg-indigo-600/30 border-indigo-400 text-cyan-300 ring-1 ring-indigo-400'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
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
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>

          {/* Community Guidelines Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Community Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
              <li>Be respectful to everyone.</li>
              <li>No harassment, hate speech, or spam.</li>
              <li>No illegal or explicit content.</li>
              <li>Do not share sensitive personal information.</li>
            </ul>

            <label className="flex items-center gap-2 pt-2 border-t border-slate-800/80 cursor-pointer select-none text-slate-300 font-medium text-xs">
              <input
                id="agree-rules-checkbox"
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (errors.rules) setErrors(prev => ({ ...prev, rules: undefined }));
                }}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-600 focus:ring-indigo-500"
              />
              <span>I Agree to the Community Guidelines</span>
            </label>
            {errors.rules && (
              <p className="text-xs text-rose-400 pt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.rules}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            id="enter-room-submit-button"
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 mt-2"
          >
            <span>I Agree & Enter Room</span>
          </button>
        </form>

      </div>
    </div>
  );
};
