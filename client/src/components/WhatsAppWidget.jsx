export default function WhatsAppWidget() {
  return (
    <div className="whatsapp-widget" id="whatsapp-widget">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-widget__btn"
        aria-label="Chat on WhatsApp"
        id="whatsapp-btn"
      >
        <span className="material-symbols-outlined icon-filled">chat</span>
      </a>
      <span className="whatsapp-widget__tooltip">Talk to a Specialist</span>
    </div>
  );
}
