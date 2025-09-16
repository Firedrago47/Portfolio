
const contactImages = Array.from({ length: 50 }, (_, i) =>
  `${String(i).padStart(4, "0")}.jpg`
);

export default function ContactSection() {
  return (
    <section className="scroll-sequence__container contact-container">
      
      <div className="scroll-sequence__content">
        <div className="speak">
          <h1>Contact Me</h1>
          <p>
            Let’s connect! You can reach me via email or LinkedIn.
          </p>
        </div>
        <div className="speak">
          <h1>Let’s Work Together</h1>
          <p>
            Open for freelance & full-time opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
