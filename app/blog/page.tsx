import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import ServicesLoadingWrapper from "@/components/ui/loading-wrapper";

const Blog = () => {
    return (
        <>
            <ServicesLoadingWrapper minLoadingTime={2000}>
                <main className="pt-32">
                    {/* Hero Section */}
                    <section className="bg-babu-primary text-white py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-4xl lg:text-6xl font-gunteerz font-bold mb-6">
                                BA-BU Beauty Blog
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                                Discover beauty tips, trends, and insights from our expert stylists
                            </p>
                        </div>
                    </section>

                    {/* Featured Post */}
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="aspect-video relative rounded-2xl overflow-hidden">
                                        <Image
                                            src={
                                                siteConfig.blogPosts[0]?.image ||
                                                "https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800"
                                            }
                                            alt={siteConfig.blogPosts[0]?.title || "Featured Post"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{siteConfig.blogPosts[0]?.date}</span>
                                            </div>
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-babu-primary mb-4">
                                            {siteConfig.blogPosts[0]?.title}
                                        </h2>
                                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                            {siteConfig.blogPosts[0]?.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${siteConfig.blogPosts[0]?.slug}`}
                                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
                                        >
                                            <span>Read Full Article</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Blog Posts Grid */}
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-serif font-bold text-babu-primary mb-12 text-center">
                                Latest Articles
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {siteConfig.blogPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                                    >
                                        <div className="aspect-video relative">
                                            <Image
                                                src={
                                                    post.image ||
                                                    "https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800"
                                                }
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-serif font-bold text-babu-primary mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center space-x-2 text-babu-teal hover:text-babu-teal-dark font-semibold transition-colors"
                                            >
                                                <span>Read More</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Newsletter Section */}
                    <section className="py-20 bg-gradient-to-br from-[#77530a] via-[#ffd277] to-[#77530a]">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-6">
                                Stay Updated with Beauty Trends
                            </h2>
                            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                                Subscribe to our newsletter for the latest beauty tips, exclusive offers, and salon updates
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-2 focus:ring-black/20 focus:outline-none text-black placeholder-black/60 font-medium"
                                />
                                <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </ServicesLoadingWrapper>
        </>
    );
};
export default Blog;
