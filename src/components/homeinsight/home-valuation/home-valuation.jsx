"use client"
import { TrendingUp } from "lucide-react"
import "./home-valuation.css"

const HomeValuation = () => {
  return (
    <section className="home-valuation-section">
      <div className="home-valuation-container">
        <div className="valuation-content-left">
          <h2 className="valuation-main-heading">
            Find out what we think
            <br />
            your dream home is worth today
          </h2>

          <div className="data-insights-block">
            <h3 className="data-heading">
              Exclusive data from
              <br />
              250,000+ transactions
            </h3>
            <p className="data-description">
            Your insights are powered by the same data we use to help buyers make confident, informed home purchases.
            </p>
          </div>
        </div>

        <div className="valuation-content-right">
          <div className="estimated-value-card">
            <div className="card-header">
              <span className="estimated-label">Estimated value</span>
            </div>

            <div className="value-display">
              <span className="price-amount">$550,000</span>
              <div className="price-change">
                <TrendingUp size={14} className="trend-icon" />
                <span className="change-text">1.7% last 30 days</span>
              </div>
            </div>

            <div className="data-source">
              <span className="source-text">Data from HomeScope360</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeValuation
