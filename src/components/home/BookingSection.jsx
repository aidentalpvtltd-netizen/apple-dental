import {
  consultationTreatments,
  branches,
  formspreeEndpoint,
  getConsultationFeesForBranch,
  onlinePaymentMethod,
  payAtClinicPaymentMethod,
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
  handleTimeSlotSelect,
  isSubmitting,
  requiresSlotSelection,
  isBookingLocked,
  submitError,
  confirmationTreatment,
  bookingLock,
  bookingCooldown,
}) {
  const isPayAtClinic = formState.paymentMethod === payAtClinicPaymentMethod
  const branchFees = getConsultationFeesForBranch(formState.branch)
  const selectedFee = isPayAtClinic ? branchFees.payAtClinic : branchFees.online

  return (
    <section className="booking-section reveal-section" id="booking-form">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Contact us</p>
          <h2>Schedule your dental consultation</h2>
        </div>
        <p className="section-text">
          Choose your consultation details and our front desk team will confirm the right doctor,
          visit type, and appointment time.
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
          <input type="hidden" name="payment_amount" value={selectedFee} />
          <input type="hidden" name="payment_method" value={formState.paymentMethod} />

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
                  {consultationTreatments.map((treatment) => (
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
              <span>
                Full name <span className="required-mark" aria-hidden="true">*</span>
              </span>
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
              <span>
                Phone number <span className="required-mark" aria-hidden="true">*</span>
              </span>
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

            <label onClick={handleDateFieldClick}>
              <span>
                Preferred date <span className="required-mark" aria-hidden="true">*</span>
              </span>
              <input
                required
                name="date"
                type="date"
                min={todayDateValue}
                value={formState.date}
                onChange={handleChange}
              />
            </label>

            {formState.date && (
              <div className="time-slot-grid booking-form-wide" aria-label="Appointment time slots">
                {appointmentSlots.map((slot) => (
                  <button
                    className={`time-slot${formState.timeSlot === slot ? ' selected' : ''}`}
                    key={slot}
                    type="button"
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            <fieldset className="consultation-fee-options booking-form-wide">
              <legend>Consultation Fee</legend>
              <label className={!isPayAtClinic ? 'selected' : ''}>
                <input
                  checked={formState.paymentMethod === onlinePaymentMethod}
                  name="paymentMethod"
                  type="radio"
                  value={onlinePaymentMethod}
                  onChange={handleChange}
                />
                <span>Pay Online</span>
                <strong>Rs {branchFees.online}</strong>
              </label>
              <label className={isPayAtClinic ? 'selected' : ''}>
                <input
                  checked={isPayAtClinic}
                  name="paymentMethod"
                  type="radio"
                  value={payAtClinicPaymentMethod}
                  onChange={handleChange}
                />
                <span>Pay at Clinic</span>
                <strong>Rs {branchFees.payAtClinic}</strong>
              </label>
            </fieldset>

            <div className="payment-summary booking-form-wide">
              <div>
                <strong>Consultation fee</strong>
                <span>
                  {isPayAtClinic
                    ? 'Pay during your visit. No online payment is required.'
                    : 'Paid securely through Razorpay before your request is sent.'}
                  {!isPayAtClinic && (
                    <span className="razorpay-mark" aria-label="Secured by Razorpay">
                      <img src="/payments/razorpay.svg" alt="Razorpay" loading="lazy" />
                    </span>
                  )}
                </span>
              </div>
              <p>Rs {selectedFee}</p>
            </div>
          </fieldset>

          <button
            className={`submit-button booking-form-wide${isSubmitting ? ' submitting' : ''}`}
            type="submit"
            disabled={isFormDisabled || requiresSlotSelection}
          >
            {isSubmitting && <span className="submit-spinner" aria-hidden="true" />}
            <span>
              {isSubmitting
                ? isPayAtClinic
                  ? 'Sending request...'
                  : 'Opening payment...'
                : isBookingLocked
                  ? 'Request limit reached'
                  : requiresSlotSelection
                    ? 'Select date and time'
                    : isPayAtClinic
                      ? `Request appointment - Pay Rs ${selectedFee} at clinic`
                      : `Pay Rs ${selectedFee} & request appointment`}
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
                  : `Thank you. Your ${confirmationTreatment} request has been received. We will contact you shortly to confirm your appointment.`
                : 'Select a treatment from the dropdown or use the treatment cards above to begin.'}
          </p>
        </div>
      </aside>
    </section>
  )
}
