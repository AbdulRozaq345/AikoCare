import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-gray-600 mb-2">
        Pertanyaan {current} dari {total}
      </p>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ 
            width: `${progressPercentage}%`, 
            backgroundColor: '#4ade80' // Hijau cerah
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;