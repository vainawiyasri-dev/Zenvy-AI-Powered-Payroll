module.exports = (salary, attendance) => {
  const perDay = salary.baseSalary / 30;
  return (
    perDay * attendance.daysPresent +
    salary.hra +
    salary.bonus -
    salary.deductions
  );
};
