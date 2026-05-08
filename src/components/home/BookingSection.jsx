import {
  treatments,
  branches,
  formspreeEndpoint,
  consultationFeeAmount,
  concernWordLimit,
  onlinePaymentMethod,
  getWords,
  appointmentSlots,
} from '../../config/siteContent.js'

export function BookingSection({
  selectedTreatment,
  formState,
  isFormDisabled,
  handleSubmit,
  handleChange,
  handleDateFieldClick,
  todayDateValue,
  suggestedDates,
  handleDateSuggestion,
  hasAvailableSelectedDate,
  appointmentStatusMessage,
  availabilityError,
  handleTimeSlotSelect,
  isSubmitting,
  requiresSlotSelection,
  isBookingLocked,
  submitError,
  confirmationTreatment,
  bookingLock,
  bookingCooldown,
}) {
  return (
    <section className="booking-section reveal-section" id="booking-form">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Contact us</p>
          <h2>Schedule your dental consultation</h2>
        </div>
        <p className="section-text">
          Tell us what you need help with and our front desk team will confirm the right doctor,
          visit type, and available appointment slot.
        </p>
      </div>

      <aside className="booking-panel booking-panel-full" id="booking">
        <div className="booking-header">
          <p className="eyebrow">Consultation form</p>
          <h3>{selectedTreatment.name}</h3>
          <p>{selectedTreatment.details}</p>
        </div>

        <form
          className="booking-form booking-form-grid"
          name="consultation"
          action={formspreeEndpoint}
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form_type" value="consultation" />
          <input type="hidden" name="_subject" value="New dental consultation request" />
          <input type="hidden" name="treatment_name" value={selectedTreatment.name} />
          <input type="hidden" name="branch_name" value={formState.branch} />
          <input type="hidden" name="timeSlot" value={formState.timeSlot} />
          <input type="hidden" name="payment_amount" value={consultationFeeAmount} />
          <input type="hidden" name="payment_method" value={onlinePaymentMethod} />

          <fieldset disabled={isFormDisabled}>
            <label className="select-label">
              Treatment
              <span className="select-control">
                <select
                  required
                  name="treatment"
                  value={formState.treatment}
                  onChange={handleChange}
                >
                  {treatments.map((treatment) => (
                    <option key={treatment.id} value={treatment.id}>
                      {treatment.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label className="select-label">
              Branch
              <span className="select-control">
                <select required name="branch" value={formState.branch} onChange={handleChange}>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label>
              Full name
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone number
              <input
                required
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength="10"
                title="Enter a 10 digit phone number"
                placeholder="9876543210"
                value={formState.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              Email address
              <input
                required
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                title="Enter a valid email address"
                placeholder="yourname@gmail.com"
                value={formState.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Reffered by
              <input
                name="referredBy"
                type="text"
                pattern="[A-Za-z ]*"
                title="Use alphabets and spaces only"
                placeholder="Doctor, friend, family, or online"
                value={formState.referredBy}
                onChange={handleChange}
              />
            </label>

            <label onClick={handleDateFieldClick}>
              Preferred date
              <input
                required
                name="date"
                type="date"
                min={todayDateValue}
                value={formState.date}
                onChange={handleChange}
              />
            </label>

            <div className="booking-availability booking-form-wide">
              <div className="date-suggestions" aria-label="Available appointment dates">
                {suggestedDates.map((date) => (
                  <button
                    className={`date-chip${formState.date === date.value ? ' selected' : ''}`}
                    disabled={date.isUnavailable}
                    key={date.value}
                    type="button"
                    onClick={() => handleDateSuggestion(date.value)}
                  >
                    <span>{date.label}</span>
                    <small>{date.isUnavailable ? 'Closed' : 'Open'}</small>
                  </button>
                ))}
              </div>

              <p
                className={`availability-note${
                  hasAvailableSelectedDate ? ' available' : formState.date ? ' unavailable' : ''
                }`}
              >
                {appointmentStatusMessage}
              </p>
              {availabilityError && (
                <p className="availability-note unavailable">{availabilityError}</p>
              )}

              {formState.date && (
                <div className="time-slot-grid" aria-label="Available appointment time slots">
                  {appointmentSlots.map((slot) => (
                    <button
                      className={`time-slot${formState.timeSlot === slot ? ' selected' : ''}`}
                      disabled={!hasAvailableSelectedDate}
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="payment-summary booking-form-wide">
              <div>
                <strong>Consultation fee</strong>
                <span>
                  Paid securely before the appointment request is sent.
                  <span className="razorpay-mark" aria-label="Powered by Razorpay">
                    <img src="/payments/razorpay.svg" alt="" />
                  </span>
                </span>
              </div>
              <p>Rs {consultationFeeAmount}</p>
            </div>

            <label className="booking-form-wide">
              <span className="field-label-row">
                <span>What would you like help with?</span>
                <span>
                  {getWords(formState.concern).length}/{concernWordLimit} words
                </span>
              </span>
              <textarea
                required
                name="concern"
                rows="4"
                placeholder="Tell us about your smile goals or dental concern."
                value={formState.concern}
                onChange={handleChange}
              />
            </label>
          </fieldset>

          <button
            className={`submit-button booking-form-wide${isSubmitting ? ' submitting' : ''}`}
            type="submit"
            disabled={isFormDisabled || requiresSlotSelection}
          >
            {isSubmitting && <span className="submit-spinner" aria-hidden="true" />}
            <span>
              {isSubmitting
                ? 'Opening payment...'
                : isBookingLocked
                  ? 'Request limit reached'
                  : requiresSlotSelection
                    ? 'Select date and time'
                    : `Pay Rs ${consultationFeeAmount} & request appointment`}
            </span>
          </button>
        </form>

        <div
          className={`confirmation-card${
            submitError ? ' visible error' : confirmationTreatment ? ' visible success' : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {confirmationTreatment && !submitError && (
            <span className="confirmation-icon" aria-hidden="true" />
          )}
          <strong>
            {submitError
              ? 'Request not sent'
              : confirmationTreatment
                ? 'Appointment request received'
                : 'Consultation request ready'}
          </strong>
          <p>
            {submitError
              ? submitError
              : confirmationTreatment
                ? bookingLock
                  ? `Thank you. Your ${confirmationTreatment} request has been sent to our reception team. This device has reached four requests, so the form is paused for about ${bookingCooldown}.`
                  : `Thank you. Your ${confirmationTreatment} request and Rs ${consultationFeeAmount} consultation fee have been received. We will contact you shortly to confirm your appointment.`
                : 'Select a treatment from the dropdown or use the treatment cards above to begin.'}
          </p>
        </div>
      </aside>
    </section>
  )
}
