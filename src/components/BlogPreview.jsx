import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { blogPosts } from '../data/properties'

export default function BlogPreview() {
  return (
    <section className="bg-cream py-24 sm:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Market Intelligence</span>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] text-navy-900 mt-3 leading-tight">
              Insights & <em className="font-normal italic">Analysis</em>
            </h2>
          </motion.div>
          <Link to="/blog" className="btn-outline-gold py-3 px-6 text-[10px] self-start sm:self-auto">
            <span>All Articles</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-gray-100 group property-card"
            >
              <Link to={`/blog/${post.slug}`} className="block img-zoom h-52">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </Link>
              <div className="p-6">
                <span className="section-label text-[10px]">{post.category}</span>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mt-2 mb-3 leading-snug group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
