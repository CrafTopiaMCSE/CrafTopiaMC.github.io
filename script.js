// ===== بارگذاری تنظیمات =====
loadConfig();
applyTheme();

// ===== اعمال تم =====
function applyTheme() {
  document.body.style.backgroundColor = CONFIG.themeBg;
  document.querySelector('header').style.borderBottom = 3px solid ${CONFIG.themeColor};
  document.querySelector('.logo').style.color = CONFIG.themeColor;
  document.title = CONFIG.siteName;
}

// ===== رندر صفحات =====
function renderPage(page) {
  const content = document.getElementById('content');

  if (page === 'home') {
    content.innerHTML = `

        ${CONFIG.siteName}
        ${CONFIG.description}

        <button class="btn-play" onclick="renderPage('gamemodes')">${t('play')} ▶</button>

      ${CONFIG.serverIP ? `

          ${CONFIG.serverIP}
          <button class="copy-btn" onclick="copyIP()">${t('copyIP')}</button>

` : ''}
    `;
  }

  else if (page === 'gamemodes') {
    if (CONFIG.gamemodes.length === 0) {
      content.innerHTML = `
        ${t('gamemodes')}

          هیچ گیم‌مودی هنوز ثبت نشده. از پنل ادمین اضافه کن!

      `;
    } else {
      content.innerHTML = `
        ${t('gamemodes')}

          ${CONFIG.gamemodes.map(m => `

              ${m.name}
              ${m.description}

`).join('')}

      `;
    }
  }

  else if (page === 'settings') {
    content.innerHTML = `
      ${t('settings')}

        <label>${t('language')}</label>
        <select id="langSelect" onchange="changeLang(this.value)">
          <option value="en" ${LANG==='en'?'selected':''}>English</option>
          <option value="fa" ${LANG==='fa'?'selected':''}>فارسی</option>
        </select>

    `;
  }

  else if (page === 'admin') {
    content.innerHTML = `

        ${t('admin')}
        <input type="password" id="adminPass" placeholder="رمز ادمین">
        <button class="btn-play" onclick="loginAdmin()" style="width:100%;margin-top:10px;">ورود</button>

    `;
  }
}

// ===== تغییر زبان =====
function changeLang(lang) {
  LANG = lang;
  localStorage.setItem("crafTopia_lang", lang);
  const current = document.querySelector('nav a.active')?.dataset.page || 'home';
  renderPage(current);
}

// ===== کپی آدرس =====
function copyIP() {
  navigator.clipboard.writeText(CONFIG.serverIP);
  document.querySelector('.copy-btn').textContent = t('copied');
  setTimeout(() => {
    document.querySelector('.copy-btn').textContent = t('copyIP');
  }, 1500);
}

// ===== ورود ادمین =====
function loginAdmin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === CONFIG.adminPassword) {
    window.location.href = 'admin.html';
  } else {
    alert('رمز اشتباهه!');
  }
}
// ===== ناوبری =====
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    renderPage(link.dataset.page);
  });
});

document.getElementById('adminBtn').addEventListener('click', () => renderPage('admin'));

// ===== شروع با صفحه خانه =====
renderPage('home');
```
