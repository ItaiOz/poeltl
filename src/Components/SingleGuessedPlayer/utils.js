export const GREEN = "green";
export const YELLOW = "yellow";
export const RED = "red";

export const getHeightClassName = (height1, height2) => {
  const [feet1, inches1] = height1.split("-").map(Number);
  const [feet2, inches2] = height2.split("-").map(Number);

  const totalInhces1 = feet1 * 12 + inches1;
  const totalInhces2 = feet2 * 12 + inches2;

  const diff = Math.abs(totalInhces1 - totalInhces2);
  if (diff <= 2) {
    if (diff === 0) return GREEN;
    return YELLOW;
  }

  return "";
};

export const getFullHeight = (height) => {
  const [feet, inches] = height.split("-").map(Number);
  return feet * 12 + inches;
};

export const getNumberClassName = (num1, num2) => {
  const number = Math.abs(+num1 - +num2);

  if (number <= 2) {
    if (num1 === num2) return GREEN;
    return YELLOW;
  }
  return "";
};

export const getDraftClassName = (draft1, draft2) => {
  if (!draft1 || !draft2) {
    if (draft1 === draft2) return GREEN;
    return "";
  }

  const diff = Math.abs(draft1 - draft2);

  if (diff <= 2) {
    if (diff === 0) return GREEN;
    return YELLOW;
  }
  return "";
};

export const getPositionClassName = (position1, position2) => {
  if (position1 === position2) return GREEN;

  const position1Set = new Set();
  position1.split("-").forEach((pos) => position1Set.add(pos.trim()));

  for (let i in position2) if (position1Set.has(position2[i])) return YELLOW;

  return "";
};
