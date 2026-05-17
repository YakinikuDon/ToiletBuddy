import React, { useState, useEffect, useRef } from 'react';
import { calculatePerMillisecond } from '../utils/calculator';

export const JumpingNumber = ({ startTime, salary, salaryType }) => {
  const [earned, setEarned] = useState(0);
  const perMs = calculatePerMillisecond(Number(salary), salaryType);
  const requestRef = useRef();

  const updateEarned = () => {
    const now = Date.now();
    const durationMs = now - startTime;
    setEarned(durationMs * perMs);
    requestRef.current = requestAnimationFrame(updateEarned);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateEarned);
    return () => cancelAnimationFrame(requestRef.current);
  }, [startTime, perMs]);

  // 根据月薪大小决定小数位数，以达到“快速跳动”的效果
  let fractionDigits = 4;
  const normalizedMonthlySalary = salaryType === 'monthly' ? Number(salary) : Number(salary) / 12;
  
  if (normalizedMonthlySalary > 100000) {
    fractionDigits = 2;
  } else if (normalizedMonthlySalary > 30000) {
    fractionDigits = 3;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontWeight: 'bold' }}>已赚取 (元)</div>
      <div style={{ fontSize: '64px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'monospace', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
        ￥{earned.toFixed(fractionDigits)}
      </div>
    </div>
  );
};
