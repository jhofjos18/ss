const dropdowns = document.querySelectorAll(".dropdown");
const univMenu = document.querySelector("#select-univ .dropdown-menu");
const disciplineMenu = document.querySelector("#select-dicipline .dropdown-menu");
const majorMenu = document.querySelector("#select-major .dropdown-menu");
const majorButton = document.querySelector("#select-major .dropdown-button");
const disciplineButton = document.querySelector("#select-dicipline .dropdown-button");
const univButton = document.querySelector("#select-univ .dropdown-button");
const searchButton = document.querySelector("#search-button");
const viewResult = document.querySelector("#view-result");
const subjectsRecommend = document.querySelector("#subjects-recommend");

const majorData = {
  공학: ["컴퓨터공학", "전기공학", "기계공학", "건축공학"],
  자연: ["생명과학", "화학", "물리학", "수의학"],
  인문: ["국어국문학", "영어영문학", "사학", "철학"],
  사회: ["경제학", "경영학", "행정학", "사회복지학"],
  의약: ["의예과", "간호학", "치의예과", "약학과"],
  예체능: ["디자인학", "체육교육", "음악학", "미술학"]
};

const recommendationData = {
  컴퓨터공학: ["수학(미적분)", "물리학 I", "정보과학", "기술가정"],
  전기공학: ["수학(미적분)", "물리학 I", "정보과학", "전자회로"],
  기계공학: ["수학(미적분)", "물리학 I", "화학 I", "기술가정"],
  건축공학: ["수학(확률과 통계)", "물리학 I", "지구과학 I", "기술가정"],
  생명과학: ["생명과학 I", "화학 I", "수학(확률과 통계)", "정보과학"],
  화학: ["화학 I", "수학(미적분)", "생명과학 I", "정보과학"],
  물리학: ["물리학 I", "수학(미적분)", "화학 I", "지구과학 I"],
  수의학: ["생명과학 I", "화학 I", "물리학 I", "한국사"],
  국어국문학: ["국어", "영어", "한국사", "사회탐구"],
  영어영문학: ["영어", "국어", "한국사", "사회탐구"],
  사학: ["한국사", "세계사", "윤리와 사상", "사회탐구"],
  철학: ["윤리와 사상", "국어", "한국사", "사회탐구"],
  경제학: ["수학(확률과 통계)", "경제", "법과 정치", "한국사"],
  경영학: ["수학(확률과 통계)", "경영", "경제", "사회탐구"],
  행정학: ["사회탐구", "법과 정치", "한국사", "영어"],
  사회복지학: ["사회탐구", "한국사", "윤리와 사상", "영어"],
  의예과: ["수학(미적분)", "화학 I", "생명과학 I", "한국사"],
  간호학: ["생명과학 I", "화학 I", "한국사", "영어"],
  치의예과: ["수학(미적분)", "화학 I", "생명과학 I", "영어"],
  약학과: ["화학 I", "생명과학 I", "수학(확률과 통계)", "한국사"],
  디자인학: ["미술", "디자인", "생활과 윤리", "한국사"],
  체육교육: ["체육", "생활과 윤리", "한국사", "영어"],
  음악학: ["음악", "생활과 윤리", "한국사", "영어"],
  미술학: ["미술", "생활과 윤리", "한국사", "영어"]
};

function closeAllMenus() {
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.hidden = true;
  });
}

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".dropdown-button");
  const menu = dropdown.querySelector(".dropdown-menu");

  button.addEventListener("click", () => {
    const isClosed = menu.hidden;
    closeAllMenus();
    menu.hidden = !isClosed;
  });
});

function setButtonText(button, label, defaultText) {
  button.textContent = label ? label : defaultText;
}

function resetMajorSelection() {
  majorMenu.innerHTML = "<div class=\"univ\">계열을 먼저 선택하면 학과 목록이 나타납니다.</div>";
  setButtonText(majorButton, "", "학과 선택");
  viewResult.hidden = true;
}

function renderMajorOptions(discipline) {
  const majors = majorData[discipline] || [];
  majorMenu.innerHTML = "";

  if (!majors.length) {
    majorMenu.innerHTML = "<div class=\"univ\">선택 가능한 학과가 없습니다.</div>";
    return;
  }

  majors.forEach((majorName) => {
    const label = document.createElement("label");
    label.className = "univ";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = majorName;

    input.addEventListener("change", () => {
      if (input.checked) {
        majorMenu.querySelectorAll("input[type='checkbox']").forEach((other) => {
          if (other !== input) {
            other.checked = false;
          }
        });
        setButtonText(majorButton, majorName, "학과 선택");
      } else {
        setButtonText(majorButton, "", "학과 선택");
      }
      viewResult.hidden = true;
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${majorName}`));
    majorMenu.appendChild(label);
  });
}

function getSelectedValue(menuSelector) {
  const item = document.querySelector(`${menuSelector} input[type='checkbox']:checked`);
  return item ? item.value : "";
}

function updateCheckboxGroup(menuSelector, button, selectedText, defaultText) {
  const inputs = document.querySelectorAll(`${menuSelector} input[type='checkbox']`);
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        inputs.forEach((other) => {
          if (other !== input) {
            other.checked = false;
          }
        });
        setButtonText(button, input.value, defaultText);
      } else {
        setButtonText(button, "", defaultText);
      }

      if (menuSelector === "#select-dicipline") {
        const discipline = getSelectedValue(menuSelector);
        if (discipline) {
          renderMajorOptions(discipline);
        } else {
          resetMajorSelection();
        }
      }

      viewResult.hidden = true;
    });
  });
}

updateCheckboxGroup("#select-univ", univButton, "", "대학 선택(선택)");
updateCheckboxGroup("#select-dicipline", disciplineButton, "", "계열 선택");
resetMajorSelection();

searchButton.addEventListener("click", () => {
  const selectedMajor = getSelectedValue("#select-major");
  subjectsRecommend.innerHTML = "";

  if (!selectedMajor) {
    viewResult.hidden = false;
    subjectsRecommend.innerHTML = `
      <div class="subject-tag">학과를 선택해 주세요.</div>
    `;
    return;
  }

  const subjects = recommendationData[selectedMajor];
  if (!subjects) {
    viewResult.hidden = false;
    subjectsRecommend.innerHTML = `
      <div class="subject-tag">추천 과목이 준비되지 않았습니다.</div>
    `;
    return;
  }

  subjects.forEach((subject) => {
    const subjectTag = document.createElement("div");
    subjectTag.className = "subject-tag";
    subjectTag.textContent = subject;
    subjectsRecommend.appendChild(subjectTag);
  });

  viewResult.hidden = false;
});
