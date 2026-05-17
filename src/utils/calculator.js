export const calculatePerMillisecond = (salary, type) => {
  // 按八小时工作制和双休计算
  // 月薪按 21.75 天，每天 8 小时计算
  // 年薪按 250 天，每天 8 小时计算
  let perMs = 0;
  if (type === 'monthly') {
    const hoursPerMonth = 21.75 * 8;
    perMs = salary / (hoursPerMonth * 60 * 60 * 1000);
  } else {
    const hoursPerYear = 250 * 8;
    perMs = salary / (hoursPerYear * 60 * 60 * 1000);
  }
  return perMs;
}

export const getPercentage = (earned, durationMs, salary, type) => {
  // 模拟打败全国XX%的计算
  // 中国薪水中位数正态分布模拟
  // 这里用一个简单的算法：基础百分比（50%） + 时长加成 + 薪水加成
  // 尽量让用户超过50%以上的人

  // 基础 55%
  let percentage = 55.0;

  // 根据每毫秒赚取的钱，调整百分比
  // 假设中位数月薪 6000 左右
  const medianMonthly = 6000;
  const normalizedMonthlySalary = type === 'monthly' ? Number(salary) : Number(salary) / 12;

  if (normalizedMonthlySalary > medianMonthly) {
    percentage += ((normalizedMonthlySalary - medianMonthly) / medianMonthly) * 15;
  } else {
    percentage -= ((medianMonthly - normalizedMonthlySalary) / medianMonthly) * 5; // 低于中位数惩罚较小
  }

  // 待的时间越长，感觉超过的人越多，加一些随机性和时长加成
  const minutes = durationMs / (1000 * 60);
  percentage += Math.min(minutes * 0.5, 10); // 最多加10%

  // 确保在 1% 到 99.99% 之间
  return Math.min(Math.max(percentage, 1), 99.99);
}
