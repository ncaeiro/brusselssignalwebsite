
import React from 'react';
import { Link } from 'react-router-dom';
import { createAuthorSlug } from '../src/utils.ts';

interface FooterProps {
  onSignInClick?: () => void;
  onBecomeMemberClick?: () => void;
  onCategoryClick?: (category: string) => void;
  onNewslettersClick?: () => void;
  onPartnerWithUsClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSignInClick, onBecomeMemberClick, onCategoryClick, onNewslettersClick, onPartnerWithUsClick }) => {
  return (
    <footer className="bg-[#1a2a44] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Newsletter Promotional Box */}
        <div className="bg-[#24375a] p-8 flex flex-col md:flex-row items-center justify-between mb-16 rounded shadow-lg border border-white/10">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
                <div className="hidden sm:flex w-14 h-14 bg-[#EE6260] rounded-full items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold">The Signal Newsletters</h3>
                    <p className="text-xs text-gray-300">Choose between daily briefings or weekly strategic analysis.</p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <Link
                  to="/newsletters"
                  className="flex-grow md:flex-none bg-[#EE6260] px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#d44947] transition shadow-lg text-center"
                >
                    SUBSCRIBE NOW
                </Link>
                <Link
                  to="/newsletters"
                  className="flex-grow md:flex-none border border-white/30 px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition text-center"
                >
                    PREVIEW EDITION
                </Link>
            </div>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-t border-white/10 pt-12 pb-12">
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">HOT TOPICS</h4>
                <ul className="text-sm space-y-3 font-medium">
                    <li><Link to="/category/society/tag/migration" className="hover:text-[#EE6260]">Mass Migration</Link></li>
                    <li><Link to="/category/society/tag/free-speech" className="hover:text-[#EE6260]">Free Speech</Link></li>
                    <li><Link to="/category/politics/tag/ukraine" className="hover:text-[#EE6260]">Ukraine</Link></li>
                    <li><Link to="/category/politics/tag/dsa" className="hover:text-[#EE6260]">DSA Pact</Link></li>
                    <li><Link to="/category/economy/tag/tariffs" className="hover:text-[#EE6260]">Tariffs</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">CATEGORIES</h4>
                <ul className="text-sm space-y-3 font-medium">
                    <li><Link to="/category/politics" className="hover:text-[#EE6260]">Politics</Link></li>
                    <li><Link to="/category/economy" className="hover:text-[#EE6260]">Economy</Link></li>
                    <li><Link to="/category/society" className="hover:text-[#EE6260]">Society</Link></li>
                    <li><Link to="/category/world" className="hover:text-[#EE6260]">World</Link></li>
                    <li><Link to="/category/commentary" className="hover:text-[#EE6260]">Opinion</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">NEWSLETTERS</h4>
                <ul className="text-sm space-y-3 font-medium">
                    <li><Link to="/newsletters" className="hover:text-[#EE6260]">Brussels Calling</Link></li>
                    <li><Link to="/newsletters" className="hover:text-[#EE6260]">Signal Horizon</Link></li>
                    <li><Link to="/profile" className="hover:text-[#EE6260]">Manage My Subscriptions</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">AUTHORS</h4>
                <ul className="text-sm space-y-3 font-medium">
                    <li><Link to={`/author/${createAuthorSlug('Krzysztof Mularczyk')}`} className="hover:text-[#EE6260]">Krzysztof Mularczyk</Link></li>
                    <li><Link to={`/author/${createAuthorSlug('Carl Deconinck')}`} className="hover:text-[#EE6260]">Carl Deconinck</Link></li>
                    <li><Link to={`/author/${createAuthorSlug('Claire Lemaire')}`} className="hover:text-[#EE6260]">Claire Lemaire</Link></li>
                    <li><Link to={`/author/${createAuthorSlug('Chris Gattringer')}`} className="hover:text-[#EE6260]">Chris Gattringer</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">MORE</h4>
                <ul className="text-sm space-y-3 font-medium">
                    <li><button onClick={onSignInClick} className="font-bold text-white hover:text-[#EE6260]">Sign In</button></li>
                    <li><button onClick={onBecomeMemberClick} className="font-bold text-[#EE6260] hover:text-[#EE6260] transition-colors">Become a Member</button></li>
                    <li><Link to="/about" className="hover:text-[#EE6260]">About Us</Link></li>
                    <li><Link to="/events" className="hover:text-[#EE6260]">Events</Link></li>
                    <li><Link to="/partner-with-us" className="hover:text-[#EE6260]">Partner with Us</Link></li>
                    <li><a href="#" className="hover:text-[#EE6260]">Contact Us</a></li>
                </ul>
            </div>
        </div>

        {/* Social & Bottom Branding */}
        <div className="flex flex-col items-center border-t border-white/10 pt-8 mt-8">
            <img src={import.meta.env.BASE_URL + "images/logo.png"} alt="Brussels Signal" className="h-10 mb-4" />
            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Follow Us on Social Media</h5>
            <div className="flex gap-6 mb-8">
                {/* Social icons: X, YouTube, Facebook, TikTok, LinkedIn, Instagram */}
                <a href="https://x.com/brusselssignal" aria-label="X" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                    <img src={import.meta.env.BASE_URL + "images/icons/icon-white-x.png"} alt="X" className="w-4 h-4" />
                </a>

                <a href="https://www.youtube.com/@BrusselsSignal" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                    <img src={import.meta.env.BASE_URL + "images/icons/icon-white-youtube.png"} alt="YouTube" className="w-4 h-4" />
                </a>

                <a href="https://www.facebook.com/brusselssignal" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                    <img src={import.meta.env.BASE_URL + "images/icons/icon-white-facebook.png"} alt="Facebook" className="w-4 h-4" />
                </a>

                <a href="https://www.tiktok.com/@brussels_signal" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                    <img src={import.meta.env.BASE_URL + "images/icons/icon-white-tiktok.png"} alt="TikTok" className="w-4 h-4" />
                </a>

                <a href="https://www.linkedin.com/company/brusselssignal/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                    <img src={import.meta.env.BASE_URL + "images/icons/icon-white-linkedin.png"} alt="LinkedIn" className="w-4 h-4" />
                </a>

                <a href="https://www.instagram.com/brusselssignal/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                    <img src={import.meta.env.BASE_URL + "images/icons/icon-white-instagram.png"} alt="Instagram" className="w-4 h-4" />
                </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Cookie Policy</a>
                <a href="#" className="hover:text-white">Terms & Conditions</a>
                <a href="#" className="hover:text-white">Subscription Terms & Conditions</a>
                <a href="#" className="hover:text-white">Corrections & Updates</a>
                <a href="#" className="hover:text-white">FAQs</a>
                <Link to="/site-architecture" className="hover:text-white">Site Architecture</Link>
            </div>
            <p className="text-[10px] text-gray-500">© 2025 REMEDIA EUROPE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
