import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '../data/properties'

export default function Blog() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="section-label">Insights</span>
          <h1 className="font-display text-5xl text-white mt-4">Market <em className="font-normal italic text-gold">Intelligence</em></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group property-card bg-white border border-gray-100"
            >
              <Link to={`/blog/${post.slug}`} className="block img-zoom h-56">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </Link>
              <div className="p-7">
                <span className="section-label text-[10px]">{post.category}</span>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="font-display text-xl font-semibold text-navy-900 mt-2 mb-3 leading-snug group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={11} />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-dark transition-colors">
                    Read <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
