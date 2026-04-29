export default function Accessibility() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-16 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="font-display text-4xl text-white mt-3">Accessibility Statement</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Our Commitment</h2>
            <p>G&V Realty is committed to ensuring our website is accessible to all users, including those with disabilities. We strive to meet WCAG 2.1 Level AA accessibility standards and continually work to improve the accessibility of our digital experience.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Measures We Take</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing text alternatives for non-text content</li>
              <li>Ensuring sufficient color contrast throughout the site</li>
              <li>Making all functionality available via keyboard navigation</li>
              <li>Ensuring forms and interactive elements are properly labeled</li>
              <li>Using semantic HTML to support assistive technologies</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Known Limitations</h2>
            <p>While we strive for full accessibility, some third-party content and tools embedded on our site may not yet meet all accessibility standards. We are actively working to address these gaps.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">Feedback & Contact</h2>
            <p>If you experience any accessibility barriers on our website or need assistance with any content, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p>Email: <a href="mailto:hello@gvrealty.com" className="text-gold hover:underline">hello@gvrealty.com</a></p>
              <p>Phone: <a href="tel:+15628571007" className="text-gold hover:underline">+1 (562) 857-1007</a></p>
            </div>
            <p className="mt-3">We aim to respond to accessibility feedback within 2 business days.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
