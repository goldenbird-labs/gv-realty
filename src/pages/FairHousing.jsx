export default function FairHousing() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-16 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="font-display text-4xl text-white mt-3">Fair Housing Statement</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
          <div className="bg-cream border-l-4 border-gold p-6">
            <p className="font-semibold text-navy-900 mb-2">Our Commitment</p>
            <p>G&V Realty is committed to the principles of the Fair Housing Act and Equal Opportunity in housing for all people.</p>
          </div>
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Equal Opportunity Housing</h2>
            <p>G&V Realty fully supports the principles of the Federal Fair Housing Act (Title VIII of the Civil Rights Act of 1968), as amended, which prohibits discrimination in the sale, rental, and financing of housing based on:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Race</li>
              <li>Color</li>
              <li>National Origin</li>
              <li>Religion</li>
              <li>Sex</li>
              <li>Familial Status</li>
              <li>Disability</li>
            </ul>
            <p className="mt-4">Additionally, G&V Realty complies with all state and local fair housing laws in California and Florida, which provide additional protections including sexual orientation, gender identity, marital status, age, and source of income.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Our Practice</h2>
            <p>All of our agents are trained in fair housing laws and practices. We do not engage in, nor will we tolerate, any form of discriminatory behavior in our business practices. We are dedicated to providing equal professional services to all people regardless of their membership in any protected class.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Report a Concern</h2>
            <p>If you believe you have experienced housing discrimination, you may file a complaint with the U.S. Department of Housing and Urban Development (HUD) at <a href="https://www.hud.gov/fairhousing" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">hud.gov/fairhousing</a> or call 1-800-669-9777.</p>
            <p className="mt-3">You may also contact us directly at <a href="mailto:hello@gvrealty.com" className="text-gold hover:underline">hello@gvrealty.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
