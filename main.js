const gradeSelect = document.querySelector(".grade-select");
const storageKey = "ss-selected-grade";

if (gradeSelect) {
  const savedGrade = localStorage.getItem(storageKey);
  if (savedGrade) {
    gradeSelect.value = savedGrade;
  }

  gradeSelect.addEventListener("change", () => {
    localStorage.setItem(storageKey, gradeSelect.value);
  });
}
