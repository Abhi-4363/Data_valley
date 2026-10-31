/**
 * DATAVALLEY Certificate Details - Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnViewCert = document.getElementById('btnViewCertificate');
  const modalCert = document.getElementById('certificateModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // ── Force PDF Download (fetch → Blob → hidden link) ──────────────────────
  function downloadPdf() {
    const pdfUrl = 'certificate.pdf';
    const fileName = 'Kommuri_Harshith_Krishna_Certificate_DV-1c5125fc.pdf';

    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error('Download failed:', err);
        // Fallback: open PDF directly in new tab
        window.open(pdfUrl, '_blank');
      });
  }

  // Wire download buttons
  const btnDownloadPdf = document.getElementById('btnDownloadPdf');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');

  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', (e) => {
      e.preventDefault();
      downloadPdf();
    });
  }

  if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadPdf();
    });
  }

  // ── View Certificate Modal ────────────────────────────────────────────────
  function openModal() {
    if (!modalCert) return;
    modalCert.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalCert) return;
    modalCert.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnViewCert) {
    btnViewCert.addEventListener('click', openModal);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Click outside to close
  if (modalCert) {
    modalCert.addEventListener('click', (e) => {
      if (e.target === modalCert) closeModal();
    });
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
