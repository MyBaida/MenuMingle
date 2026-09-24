import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiUrl } from '../config';

const options = [
  { value: 'square', label: 'Vertical card', hint: 'Image on top, details below' },
  { value: 'round', label: 'Horizontal card', hint: 'Image beside the details' },
];

const CardStyling = () => {
  const [selectedCardType, setSelectedCardType] = useState('square');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const stored = localStorage.getItem('selectedCardType');
    if (stored) setSelectedCardType(stored);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await fetch(apiUrl('/api/menuItems/update-card-type/'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_type: selectedCardType }),
      });
      localStorage.setItem('selectedCardType', selectedCardType);
      navigate('/admin/home');
    } catch (error) {
      console.error('Error updating card type setting:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const active = selectedCardType === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl p-4 ring-1 ring-inset transition ${
                active ? 'bg-brand-50 ring-brand-500' : 'bg-white ring-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="cardType"
                value={opt.value}
                checked={active}
                onChange={(e) => setSelectedCardType(e.target.value)}
                className="mt-0.5 h-4 w-4 accent-brand-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900">{opt.label}</span>
                <span className="block text-xs text-slate-500">{opt.hint}</span>
              </span>
            </label>
          );
        })}
      </div>

      <button type="submit" className="btn-primary mt-5" disabled={saving}>
        {saving ? 'Saving…' : 'Save & Preview'}
      </button>
    </form>
  );
};

export default CardStyling;
