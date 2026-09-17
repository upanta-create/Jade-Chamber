import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';
import JadeChamberLogo from './JadeChamberLogo';

const Footer = () => {
  const linkSections = [
    {
      title: 'CATEGORIES',
      links: [
        { text: 'Computing & Audio', path: '/shop?category=Computing' },
        { text: 'Developer Accessories', path: '/shop?category=Accessories' },
        { text: 'Minimalist Fashion', path: '/shop?category=Fashion' },
        { text: 'Ergonomics & Living', path: '/shop?category=Ergonomics' },
      ],
    },
    {
      title: 'MULTI-VENDOR PLATFORM',
      links: [
        { text: 'All Verified Products', path: '/shop' },
        { text: 'Vendor Registration', path: '/store' },
        { text: 'Prometheus Metrics', path: '/api/metrics' },
        { text: 'System Health Check', path: '/api/health' },
      ],
    },
    {
      title: 'HEADQUARTERS',
      links: [
        { text: 'Tech Park Sector, Bangalore, India', path: '/', icon: MapPin },
        { text: 'support@jadechamber.io', path: '/', icon: Mail },
        { text: '+91 80 4122 8899', path: '/', icon: Phone },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 pb-10 border-b border-slate-200">
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <JadeChamberLogo size={38} showText={true} />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-500 font-normal">
              Jade Chamber is an enterprise-grade multi-vendor commerce platform engineered with modern cloud-native architectures, Redis distributed caching, ArgoCD GitOps, and Progressive Canary delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {linkSections.map((sec, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-slate-900 font-mono tracking-wider uppercase mb-3.5">
                  {sec.title}
                </h4>
                <ul className="space-y-2.5">
                  {sec.links.map((link, lidx) => (
                    <li key={lidx}>
                      <Link
                        href={link.path}
                        className="hover:text-emerald-700 transition-colors flex items-center gap-1.5"
                      >
                        {link.icon && <link.icon size={13} className="text-emerald-600" />}
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-3">
          <p>© 2026 Jade Chamber • Multi-Vendor Commerce Platform.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Redis Cache Active
            </span>
            <span>•</span>
            <span className="text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              ArgoCD GitOps
            </span>
            <span>•</span>
            <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              PostgreSQL + Prisma
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;