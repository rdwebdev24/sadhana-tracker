document.getElementById("date").valueAsDate = new Date();

function getLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const data = await response.json();

        const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state_district ||
            "";

        document.getElementById("location").value = city;

    }, () => {
        document.getElementById("location").value = "Location not available";
    });

}

function saveSadhana() {
    const entry = {
      date: document.getElementById("date").value,
      location: document.getElementById("location").value,
      rounds: document.getElementById("rounds").value,
      Rounds_finish_before: document.getElementById("Rounds_finish_before").value,
      reading: document.getElementById("reading").value,
      hearing: document.getElementById("hearing").value,
      wakeTime: document.getElementById("wakeTime").value,
      sleepTime: document.getElementById("sleepTime").value,
      Seva: document.getElementById("Seva").value,
      
    };

    let data = JSON.parse(localStorage.getItem("sadhanaData")) || [];

    data = data.filter(item => item.date !== entry.date);
    data.push(entry);

    localStorage.setItem("sadhanaData", JSON.stringify(data));

    showRecords();
    alert("Sadhana saved successfully!");
}

function showRecords() {
    const recordsDiv = document.getElementById("records");
    const data = JSON.parse(localStorage.getItem("sadhanaData")) || [];

    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    recordsDiv.innerHTML = "";
if (data.length === 0) {
  recordsDiv.innerHTML = `
    <div class="empty-state">
      <div>📭</div>
      <h3>No records found</h3>
      <p>Your saved sadhana records will appear here.</p>
    </div>
  `;
  return;
}
    data.forEach((item,index) => {
      recordsDiv.innerHTML += `
      <div class="entry">
        <div class="field">📅 Date : ${item.date}</div>
        <div class="field">📍 Location: ${item.location || "Not added"}</div>
        <div class="field">📿 Rounds: ${item.rounds || 0}</div>
        <div class="field">⏰ Rounds finish before: ${item.Rounds_finish_before || "Not added"}</div>
        <div class="field">📖 Reading: ${item.reading || 0} min</div>
        <div class="field">🎧 Hearing: ${item.hearing || 0} min</div>
        <div class="field">🌅 Wake-up: ${item.wakeTime || "Not added"}</div>
        <div class="field">🌙 Sleep Time: ${item.sleepTime || "Not added"}</div>
        <div class="field">🛕 Seva: ${item.Seva || "Not added"}</div>

        <button onclick="sendToWhatsApp(${index})">Send WhatsApp</button>
    </div>

      `;
    });


}

function sendToWhatsApp(index) {  
  const data = JSON.parse(localStorage.getItem("sadhanaData")) || [];
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  const item = data[index];

  const phoneNumber = "918919930834"; // yahan apna number daalo, country code ke saath

  const message =
`Hare krishna Prabhu ji 🙏
🌿 Sadhana Report

📅 Date: ${item.date}
📍Location: ${item.location || "Not added"}
📿Rounds: ${item.rounds || 0}
⏰ Rounds finish before: ${item.Rounds_finish_before || "Not added"}
📖 Reading: ${item.reading || 0} min
🎧 Hearing: ${item.hearing || 0} min
🌅 Wake-up: ${item.wakeTime || "Not added"}
🌙 Sleep Time: ${item.sleepTime || "Not added"}
🛕 Seva: ${item.Seva || "Not added"}`;

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
} 

function openTab(tabId, btn) {
  document.querySelectorAll(".tab-page").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");

  document.querySelectorAll(".tab-btn").forEach(button => {
    button.classList.remove("active");
  });

  btn.classList.add("active");

  if (tabId === "historyTab") {
    showRecords();
  }

  if (tabId === "analyticsTab") {
    showAnalytics();
  }
}

function showAnalytics() {
  const analyticsDiv = document.getElementById("analytics");

  const data =
    JSON.parse(localStorage.getItem("sadhanaData")) || [];

  let totalRounds = 0;
  let totalReading = 0;
  let totalHearing = 0;

  data.forEach(item => {
    totalRounds += Number(item.rounds) || 0;
    totalReading += Number(item.reading) || 0;
    totalHearing += Number(item.hearing) || 0;
  });

  // Average will be calculated only for saved days
  const totalDays = data.length;

  const averageReading =
    totalDays > 0
      ? Math.round(totalReading / totalDays)
      : 0;

  const averageHearing =
    totalDays > 0
      ? Math.round(totalHearing / totalDays)
      : 0;

  const currentStreak = calculateCurrentStreak(data);

  const weeklyData = getWeeklyAnalytics(data);
  const monthlyData = getMonthlyAnalytics(data);

  analyticsDiv.innerHTML = `

    <!-- Current Streak -->
    <div class="analytics-card streak-card">
      <div class="streak-icon">🔥</div>

      <div class="streak-content">
        <span>Current Streak</span>
        <b>${currentStreak} ${currentStreak === 1 ? "Day" : "Days"}</b>
        <small>Keep your daily sadhana consistent</small>
      </div>
    </div>


    <!-- Overall Analytics -->
    <div class="analytics-card">
      <span class="analytics-icon">📅</span>
      <span>Total Days</span>
      <b>${totalDays}</b>
    </div>

    <div class="analytics-card">
      <span class="analytics-icon">📿</span>
      <span>Total Rounds</span>
      <b>${totalRounds}</b>
    </div>

    <div class="analytics-card">
      <span class="analytics-icon">📖</span>
      <span>Total Reading</span>
      <b>${totalReading} min</b>
    </div>

    <div class="analytics-card">
      <span class="analytics-icon">🎧</span>
      <span>Total Hearing</span>
      <b>${totalHearing} min</b>
    </div>


    <!-- Average Analytics -->
    <div class="analytics-card average-card">
      <span class="analytics-icon">📖</span>
      <span>Average Reading</span>
      <b>${averageReading} min/day</b>
    </div>

    <div class="analytics-card average-card">
      <span class="analytics-icon">🎧</span>
      <span>Average Hearing</span>
      <b>${averageHearing} min/day</b>
    </div>


    <!-- Weekly Analytics -->
    <div class="period-card weekly-card">

      <div class="period-heading">
        <div>
          <span class="period-label">CURRENT WEEK</span>
          <h3>📅 Weekly Sadhana</h3>
        </div>

        <span class="period-days">
          ${weeklyData.days} days
        </span>
      </div>

      <div class="period-stats">

        <div>
          <span>📿 Rounds</span>
          <b>${weeklyData.rounds}</b>
        </div>

        <div>
          <span>📖 Reading</span>
          <b>${weeklyData.reading} min</b>
        </div>

        <div>
          <span>🎧 Hearing</span>
          <b>${weeklyData.hearing} min</b>
        </div>

      </div>

    </div>


    <!-- Monthly Analytics -->
    <div class="period-card monthly-card">

      <div class="period-heading">
        <div>
          <span class="period-label">CURRENT MONTH</span>
          <h3>🗓️ Monthly Sadhana</h3>
        </div>

        <span class="period-days">
          ${monthlyData.days} days
        </span>
      </div>

      <div class="period-stats">

        <div>
          <span>📿 Rounds</span>
          <b>${monthlyData.rounds}</b>
        </div>

        <div>
          <span>📖 Reading</span>
          <b>${monthlyData.reading} min</b>
        </div>

        <div>
          <span>🎧 Hearing</span>
          <b>${monthlyData.hearing} min</b>
        </div>

      </div>

    </div>
  `;

  drawSleepWakeGraph(data);
}

function calculateCurrentStreak(data) {
  if (data.length === 0) {
    return 0;
  }

  // Duplicate dates remove karna
  const uniqueDates = [
    ...new Set(
      data
        .filter(item => item.date)
        .map(item => item.date)
    )
  ];

  uniqueDates.sort(
    (a, b) => new Date(b) - new Date(a)
  );

  if (uniqueDates.length === 0) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latestDate = createLocalDate(uniqueDates[0]);

  const differenceFromToday = getDaysDifference(
    latestDate,
    today
  );

  /*
    Latest entry today ya yesterday ki honi chahiye.
    Usse purani hui to current streak 0.
  */
  if (
    differenceFromToday !== 0 &&
    differenceFromToday !== 1
  ) {
    return 0;
  }

  let streak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const previousDate =
      createLocalDate(uniqueDates[i - 1]);

    const currentDate =
      createLocalDate(uniqueDates[i]);

    const difference =
      getDaysDifference(currentDate, previousDate);

    if (difference === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function createLocalDate(dateString) {
  const [year, month, day] =
    dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function getDaysDifference(olderDate, newerDate) {
  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.round(
    (newerDate - olderDate) /
    millisecondsPerDay
  );
}

function getWeeklyAnalytics(data) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentDay = today.getDay();

  // Sunday ko 7 treat karenge
  const dayFromMonday =
    currentDay === 0 ? 6 : currentDay - 1;

  const weekStart = new Date(today);

  weekStart.setDate(
    today.getDate() - dayFromMonday
  );

  const weekEnd = new Date(weekStart);

  weekEnd.setDate(
    weekStart.getDate() + 6
  );

  weekEnd.setHours(23, 59, 59, 999);

  const weeklyRecords = data.filter(item => {
    if (!item.date) return false;

    const itemDate = createLocalDate(item.date);

    return (
      itemDate >= weekStart &&
      itemDate <= weekEnd
    );
  });

  return calculatePeriodTotals(weeklyRecords);
}

function getMonthlyAnalytics(data) {
  const today = new Date();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthlyRecords = data.filter(item => {
    if (!item.date) return false;

    const itemDate = createLocalDate(item.date);

    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    );
  });

  return calculatePeriodTotals(monthlyRecords);
}

function calculatePeriodTotals(records) {
  let rounds = 0;
  let reading = 0;
  let hearing = 0;

  records.forEach(item => {
    rounds += Number(item.rounds) || 0;
    reading += Number(item.reading) || 0;
    hearing += Number(item.hearing) || 0;
  });

  return {
    days: records.length,
    rounds,
    reading,
    hearing
  };
}

function drawSleepWakeGraph(data) {
  const canvas = document.getElementById("sleepWakeChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = Math.max(canvas.offsetWidth, 540);
  canvas.height = 300;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const validData = data
    .filter(item => item.wakeTime && item.sleepTime)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (validData.length === 0) {
    ctx.font = "16px Arial";
    ctx.fillText("No sleep/wake data available", 40, 150);
    return;
  }

  function timeToHours(time) {
    const [h, m] = time.split(":").map(Number);
    return h + m / 60;
  }

  const padding = 40;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;

  const minHour = 0;
  const maxHour = 24;

  function getX(index) {
    if (validData.length === 1) return canvas.width / 2;
    return padding + (index * graphWidth) / (validData.length - 1);
  }

  function getY(hour) {
    return padding + ((maxHour - hour) / (maxHour - minHour)) * graphHeight;
  }

  // Axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // Wake line
  ctx.beginPath();
  validData.forEach((item, index) => {
    const x = getX(index);
    const y = getY(timeToHours(item.wakeTime));
    index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Sleep line
  ctx.beginPath();
  validData.forEach((item, index) => {
    const x = getX(index);
    const y = getY(timeToHours(item.sleepTime));
    index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Points + dates
  validData.forEach((item, index) => {
    const x = getX(index);

    const wakeY = getY(timeToHours(item.wakeTime));
    const sleepY = getY(timeToHours(item.sleepTime));

    ctx.beginPath();
    ctx.arc(x, wakeY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, sleepY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(item.date.slice(5), x - 18, canvas.height - 15);
  });

  // Labels
  ctx.font = "13px Arial";
  ctx.fillText("🌅 Wake-up", padding, 20);
  ctx.fillText("🌙 Sleep", padding + 120, 20);
}

showRecords();
getLocation();
