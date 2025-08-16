let activities = JSON.parse(localStorage.getItem("activities")) || [];
const tbody = document.getElementById("timetableBody");

function renderTable() {
  tbody.innerHTML = "";
  activities.forEach((item, index) => {
    let row = `
      <tr class="${item.type}">
        <td>${item.day}</td>
        <td>${item.time}</td>
        <td>${item.name}</td>
        <td>${getTypeLabel(item.type)}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editActivity(${index})">✏️ Sửa</button>
          <button class="action-btn delete-btn" onclick="deleteActivity(${index})">🗑 Xóa</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
  localStorage.setItem("activities", JSON.stringify(activities));
}

function addActivity() {
  const name = document.getElementById("activityInput").value.trim();
  const day = document.getElementById("daySelect").value;
  const time = document.getElementById("timeInput").value;
  const type = document.getElementById("typeSelect").value;

  if (!name || !time) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  activities.push({ day, time, name, type });
  renderTable();

  document.getElementById("activityInput").value = "";
  document.getElementById("timeInput").value = "";
}

function editActivity(index) {
  const newName = prompt("Nhập hoạt động mới:", activities[index].name);
  const newTime = prompt("Nhập thời gian mới:", activities[index].time);
  if (newName && newTime) {
    activities[index].name = newName;
    activities[index].time = newTime;
    renderTable();
  }
}

function deleteActivity(index) {
  if (confirm("Bạn có chắc muốn xóa hoạt động này?")) {
    activities.splice(index, 1);
    renderTable();
  }
}

function searchActivity() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const rows = tbody.getElementsByTagName("tr");
  for (let row of rows) {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(keyword) ? "" : "none";
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "hoc": return "📘 Học tập";
    case "congviec": return "💼 Công việc";
    case "giaitri": return "🎮 Giải trí";
    case "canhan": return "🏠 Cá nhân";
    default: return "";
  }
}

console.log("Script đã tải thành công!");


renderTable();