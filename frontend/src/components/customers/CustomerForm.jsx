import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function CustomerForm({
  onSubmit,
  onClose,
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = 'E-mail address is required';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Invalid e-mail format';
    }

    if (phone.trim() && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) {
      tempErrors.phone = 'Invalid phone number format';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
      };

      await onSubmit(payload);
      onClose();
    } catch (err) {
      // Axios global toast handler catches this
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <Input
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={errors.fullName}
        placeholder="e.g. John Doe"
        required
      />

      <Input
        label="E-mail Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="e.g. john.doe@example.com"
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.phone}
        placeholder="e.g. +1 (555) 019-2834"
      />

      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-borderDefault mt-4">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" loading={submitting}>
          Register Customer
        </Button>
      </div>
    </form>
  );
}
