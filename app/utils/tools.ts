export function getTimeRemaining(futureTimestamp: number | undefined) {
  if (!futureTimestamp) return "";
  // 获取当前时间戳
  const now = Math.floor(Date.now() / 1000);
  const timeDifference = futureTimestamp - now;

  if (timeDifference <= 0) return "Time's up!";

  // 计算剩余的天、小时、分钟、秒
  const days = Math.floor(timeDifference / (24 * 60 * 60));
  const hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeDifference % (60 * 60)) / 60);

  // 返回格式化的结果
  return `${days} days ${hours} hours ${minutes} minutes`;
}

// 示例使用
const futureTimestamp = Math.floor(Date.now() / 1000) + 100000; // 假设未来时间戳
console.log(getTimeRemaining(futureTimestamp));

export function getMessage(
  proposalId: string | number | null,
  optionId: string | number | null
) {
  if (!proposalId) return "";
  return `I am voting for ${optionId} option in ${proposalId} proposal`;
}

export function formatCurrency(value: number, prefix = "$") {
  if (value >= 1e9) {
    return prefix + (value / 1e9).toFixed(1) + "B";
  } else if (value >= 1e6) {
    return prefix + (value / 1e6).toFixed(1) + "M";
  } else if (value >= 1e3) {
    return prefix + (value / 1e3).toFixed(1) + "K";
  } else if (value < 1) {
    return "0";
  } else {
    return prefix + value?.toFixed(3);
  }
}

export function formatPercentage(value: number, total: number) {
  if (!total) return "0%";
  return ((value / total) * 100).toFixed(2) + "%";
}
