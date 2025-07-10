import "./benefits-section.css"

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-grid">
          <div className="benefits-left">
            <h2 className="benefits-main-title">Why buy directly from HomeScope360?</h2>
          </div>

          <div className="benefits-right">
            <div className="benefit-item">
              <h3 className="benefit-title">The price you see is the price you pay</h3>
              <p className="benefit-description">
                There's no bidding or losing to higher offers when you sign the contract first.
              </p>
            </div>

            <div className="benefit-divider"></div>

            <div className="benefit-item">
              <h3 className="benefit-title">Buy the home directly from us to save thousands</h3>
              <p className="benefit-description">Save thousands compared to list price when you buy from us.</p>
            </div>

            <div className="benefit-divider"></div>

            <div className="benefit-item">
              <h3 className="benefit-title">Back out any time and get your money back</h3>
              <p className="benefit-description">
                If you change your mind before closing you'll get all your earnest money back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
