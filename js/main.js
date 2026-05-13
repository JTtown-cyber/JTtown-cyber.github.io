(function() { const $ = (sel) => document.querySelector(sel);
const titleInput = $('#title'); const descInput = $('#desc'); const logoInput = $('#logoUrl'); const bgInput = $('#bgUrl');
const fillBtn = $('#btnFill'); const buildBtn = $('#btnBuild'); const saveBtn = $('#btnSave');
const poster = $('#poster'); const posterBg = $('#posterBg'); const posterLogo = $('#posterLogo'); const posterTitle = $('#posterTitle'); const posterDesc = $('#posterDesc');
function setDefaults() { if (!titleInput.value) titleInput.value = 'JTtown · 活动海报示例'; if (!descInput.value) { descInput.value = '时间：2026/06/01\n地点：线上直播\n亮点：\n- 要点一\n- 要点二\n- 要点三'; } if (!logoInput.value) logoInput.value = '/images/logo.png'; if (!bgInput.value) bgInput.value = '/images/poster-bg.jpg'; }
fillBtn?.addEventListener('click', function() { setDefaults(); });
buildBtn?.addEventListener('click', function() { posterTitle.textContent = titleInput.value || ''; posterDesc.textContent = descInput.value || '';

if (bgInput.value) {
  posterBg.src = bgInput.value;
  posterBg.style.display = 'block';
} else {
  posterBg.removeAttribute('src');
  posterBg.style.display = 'none';
}

if (logoInput.value) {
  posterLogo.src = logoInput.value;
  posterLogo.style.display = 'block';
} else {
  posterLogo.removeAttribute('src');
  posterLogo.style.display = 'none';
}

if (saveBtn) saveBtn.disabled = false;
});
saveBtn?.addEventListener('click', async function() { if (!posterTitle.textContent && !posterDesc.textContent) { alert('请先点击“生成海报”'); return; }

saveBtn.disabled = true;
const originalText = saveBtn.textContent;
saveBtn.textContent = '正在生成...';

try {
  const canvas = await html2canvas(poster, {
    useCORS: true,
    scale: 2,
    backgroundColor: '#ffffff'
  });
  const dataURL = canvas.toDataURL('image/png');

  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'poster.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
} catch (err) {
  console.error(err);
  alert('生成失败：请检查图片路径是否可访问，或稍后再试。');
} finally {
  saveBtn.disabled = false;
  saveBtn.textContent = originalText || '下载图片';
}
}); })();
