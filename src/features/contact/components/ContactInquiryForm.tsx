export function ContactInquiryForm() {
  return (
    <section className="ct-form-panel" aria-label="Contact inquiry form">
      <form className="ct-form" action="#" method="post">
        <div className="ct-form__field">
          <label htmlFor="ct-full-name" className="ct-form__label">
            Full Name
          </label>
          <input
            id="ct-full-name"
            name="fullName"
            type="text"
            className="ct-form__input"
            placeholder="Full Name"
            autoComplete="name"
            required
          />
        </div>

        <div className="ct-form__field">
          <label htmlFor="ct-email" className="ct-form__label">
            Email address
          </label>
          <input
            id="ct-email"
            name="email"
            type="email"
            className="ct-form__input"
            placeholder="Enter your email address"
            autoComplete="email"
            required
          />
        </div>

        <div className="ct-form__field">
          <label htmlFor="ct-inquiry" className="ct-form__label">
            About your inquiry
          </label>
          <textarea
            id="ct-inquiry"
            name="inquiry"
            className="ct-form__textarea"
            placeholder="Enter your message"
            rows={6}
            required
          />
        </div>

        <button type="submit" className="ct-form__submit">
          Submit
        </button>
      </form>
    </section>
  );
}
