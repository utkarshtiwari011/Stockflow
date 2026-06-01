import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MoveLeft } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center select-none p-6 animate-fadeIn">
      {/* 404 Header text */}
      <h1 className="text-[120px] sm:text-[180px] md:text-[200px] font-black font-syne text-primary leading-none tracking-tighter bg-gradient-to-b from-primary via-primaryHover to-transparent bg-clip-text text-transparent opacity-80 filter drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]">
        404
      </h1>
      
      {/* Status descriptions */}
      <h2 className="text-xl sm:text-2xl font-bold font-syne text-textPrimary -mt-2 mb-2">
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm text-textSecondary max-w-sm mb-8 leading-relaxed">
        The warehouse directory coordinates you requested could not be resolved. It may have been relocated or cancelled.
      </p>

      {/* Redirect buttons */}
      <Button
        variant="primary"
        size="md"
        icon={MoveLeft}
        iconPosition="left"
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </Button>
    </div>
  );
}
