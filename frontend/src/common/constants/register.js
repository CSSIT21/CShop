export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const YEARS = [...Array(100)]
  .map((year, idx) => new Date().getFullYear() - 99 + idx)
  .reverse();

export const DAYS = [...Array(31)];

export const years = ["Select Year", ...YEARS];

export const months = [
  {
    id: 0,
    label: "Select Month",
  },
  ...MONTHS.map((label, id) => ({ id: id + 1, label })),
];

export const days = ["Select Day", ...DAYS.map((day, idx) => 1 + idx)];

export const genders = [
  { id: 0, value: "Select Gender", label: "Select Gender" },

  { id: 1, value: "male", label: "Male" },
  { id: 2, value: "female", label: "Female" },
  { id: 3, value: "others", label: "Others" },

  { id: 1, value: "Male", label: "Male" },
  { id: 2, value: "Female", label: "Female" },
  { id: 3, value: "Others", label: "Others" },
  { id: 4, value: "PreferNotToSay", label: "Prefer not to say" },

];
