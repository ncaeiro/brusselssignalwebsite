import React, { useState, useEffect } from 'react';

const SiteArchitecturePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'sitemap',
        'content-flow',
        'categories-tags',
        'category-routing',
        'tag-filtering',
        'navigation',
        'article-types',
        'relationships',
        'user-features',
        'technical',
        'matrix',
        'hierarchy',
        'url-examples'
      ];

      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="bg-gray-50 flex-grow">
      {/* Page Header */}
      <section className="bg-[#1a2a44] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-[#EE6260]"></div>
            <span className="text-[#EE6260] font-black text-xs uppercase tracking-[0.3em]">DOCUMENTATION</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Site Architecture
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Complete visual guide to Brussels Signal's page structure, content organization, and the relationship between categories and tags.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Navigation */}
            <aside className="lg:w-64 lg:sticky lg:top-24 self-start">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">On This Page</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'sitemap', label: 'Visual Sitemap' },
                    { id: 'content-flow', label: 'Content Flow' },
                    { id: 'categories-tags', label: 'Categories & Tags' },
                    { id: 'category-routing', label: 'Category Routing' },
                    { id: 'tag-filtering', label: 'Tag Filtering' },
                    { id: 'navigation', label: 'Navigation Structure' },
                    { id: 'article-types', label: 'Article Types' },
                    { id: 'relationships', label: 'Key Relationships' },
                    { id: 'user-features', label: 'User Features' },
                    { id: 'technical', label: 'Technical Notes' },
                    { id: 'matrix', label: 'Category-Tag Matrix' },
                    { id: 'hierarchy', label: 'Component Hierarchy' },
                    { id: 'url-examples', label: 'URL Examples' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#EE6260] text-white font-bold'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-[#EE6260]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-5xl">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 lg:p-12 space-y-16">

                {/* Overview */}
                <section id="overview">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Overview
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Brussels Signal is built as a React single-page application with a sophisticated content organization system.
                    Content is scraped from various sources, transformed, and categorized into collections that power the site's navigation and filtering capabilities.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The architecture supports multiple content types (articles, videos, podcasts), primary category classification,
                    secondary tag-based filtering, and cross-category content discovery through tags.
                  </p>
                </section>

                {/* Visual Sitemap */}
                <section id="sitemap">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Visual Sitemap
                  </h2>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-xs leading-relaxed">
                    <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                        Brussels Signal                           │
│                    (Root: index.html)                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                  │
   ┌────▼─────┐                      ┌────▼────────┐
   │  Header  │                      │   Footer    │
   └────┬─────┘                      └────┬────────┘
        │                                  │
        │                       (Repeated navigation)
        │
┌───────┴────────────────────────────────────────────────────────┐
│                        MAIN PAGES                               │
└────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────────────────┐
        │                                                       │
┌───────▼────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  HomePage (/)  │  │ Article Pages│  │  Category Pages    │  │
└───────┬────────┘  └──────┬───────┘  └─────────┬──────────┘  │
        │                  │                     │              │
        │                  │                     │              │
┌───────▼───────┐  ┌───────▼────────┐  ┌────────▼─────────┐  │
│ Featured      │  │ /article/:slug │  │ /category/:cat   │  │
│ Most Read     │  │ /premium/:slug │  │ with TAG filter  │  │
│ Top Videos    │  │ /video/:slug   │  │ /category/:cat/  │  │
│ Commentary    │  │ /podcast/:slug │  │   tag/:tag       │  │
│ VideoFeed     │  └────────────────┘  └──────────────────┘  │
│ Politics      │                                             │
│ Economy       │                                             │
│ Society       │                                             │
│ Photo Stories │                                             │
│ Watch         │                                             │
└───────────────┘                                             │
        │                                                       │
        └───────────────────────────────────────────────────────┘`}</pre>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-bold text-blue-900 mb-2">Content Pages</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Newsletters (landing & grid)</li>
                        <li>• Subscription Plans</li>
                        <li>• Authors (grid & profiles)</li>
                        <li>• Events</li>
                        <li>• Partner With Us</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                      <h4 className="font-bold text-purple-900 mb-2">User Pages</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Favorites (saved articles)</li>
                        <li>• User Profile</li>
                        <li>• Login/Sign Up (modals)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Content Flow */}
                <section id="content-flow">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Content Flow & Data Structure
                  </h2>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-xs leading-relaxed mb-6">
                    <pre>{`┌──────────────────────────────────────────────────────────────────┐
│                      DATA SOURCES                                 │
│                   (Scraped JSON Files)                           │
└────────────────────────────┬─────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐  ┌─────▼──────┐  ┌───▼──────────┐
        │  News     │  │  Comment   │  │    Video     │
        │ Articles  │  │  Articles  │  │   Articles   │
        └─────┬─────┘  └─────┬──────┘  └───┬──────────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────▼────────┐
                    │ dataTransformers │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   dataLoader    │
                    │   (data.ts)     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼──────────┐
│  Categorized   │  │   Podcast       │  │   All Articles   │
│   Collections  │  │  Collections    │  │   (Combined)     │
├────────────────┤  ├─────────────────┤  └──────────────────┘
│ - POLITICS     │  │ - INTERFERENCE  │
│ - ECONOMY      │  │ - HORIZON       │
│ - SOCIETY      │  │ - HAMMER_TIME   │
│ - WORLD        │  │ - WATCH_VIDEOS  │
│ - COMMENTARY   │  │                 │
│ - PHOTO_STORIES│  │                 │
└────────────────┘  └─────────────────┘`}</pre>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                    <h4 className="font-bold text-amber-900 mb-2">Data Pipeline</h4>
                    <p className="text-sm text-amber-800">
                      <strong>1.</strong> Scrapers output JSON → <strong>2.</strong> Transformers normalize structure →
                      <strong>3.</strong> Data Loader categorizes → <strong>4.</strong> Components consume collections
                    </p>
                  </div>
                </section>

                {/* Categories & Tags */}
                <section id="categories-tags">
                  <div className="flex items-center justify-between mb-6 border-b-2 border-[#EE6260] pb-3">
                    <h2 className="font-serif text-3xl font-bold text-[#1a2a44]">
                      Categories & Tags Relationship
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#EE6260] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[#d44947] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Why Tags?
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-xl text-[#1a2a44] mb-3">How Categories Work</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Each article has a <strong>primary category</strong> assigned during data transformation.
                        This is the main classification that determines which collection the article belongs to.
                      </p>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <pre>{`NewsItem {
  category: 'Politics' | 'Economy' | 'Society' | 'World' | 'Commentary' | 'Videos'
  tags: string[]  // Array of tags
}`}</pre>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#1a2a44] mb-3">How Tags Work</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Tags are <strong>secondary filters</strong> that enable cross-category content discovery.
                        An article can have multiple tags, and users can filter any category by specific tags.
                      </p>
                      <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2"><strong>Example Article:</strong></p>
                        <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs">
{`{
  id: "article-123",
  title: "EU Parliament Debates New Policy",
  category: "Politics",
  tags: ["EU Parliament", "legislation", "European Commission"]
}`}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-xl text-[#1a2a44] mb-3">Main Categories</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The site has <strong>5 main content categories</strong>:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                        <li><strong>Politics</strong> - EU/European political news</li>
                        <li><strong>Economy</strong> - Financial, trade, business news</li>
                        <li><strong>Society</strong> - Social issues, culture, migration</li>
                        <li><strong>World</strong> - International news, war, global affairs</li>
                        <li><strong>Opinion</strong> (Commentary) - Opinion pieces and analysis</li>
                      </ol>
                      <p className="text-sm text-gray-600 italic">
                        Each category is a separate collection created during data transformation based on article content and tags.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-xl text-[#1a2a44] mb-3">Menu Sub-Links: Tag-Based Filtering</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The mega menu displays sub-links under each main category. These sub-links use <strong>tag-based filtering</strong> to show narrowed content views:
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                        <p className="text-sm text-blue-900 mb-2"><strong>Example: Politics Category</strong></p>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Click "POLITICS" → Shows all Politics articles</li>
                          <li>• Click "EU Bubble" → <code className="bg-white px-1 rounded text-xs">/category/politics/tag/eu-bubble</code> → Shows Politics articles filtered by "eu-bubble" tag</li>
                          <li>• Click "Elections" → <code className="bg-white px-1 rounded text-xs">/category/politics/tag/elections</code> → Shows Politics articles filtered by "elections" tag</li>
                        </ul>
                      </div>
                      <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 font-bold mb-2">How It Works:</p>
                        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                          <li>User clicks a sub-link (e.g., "Finance" under ECONOMY)</li>
                          <li>Navigates to <code className="bg-white px-1 rounded text-xs">/category/economy/tag/finance</code></li>
                          <li>CategoryPage receives both <code className="bg-white px-1 rounded text-xs">category</code> and <code className="bg-white px-1 rounded text-xs">tag</code> parameters</li>
                          <li>Page displays breadcrumb: <strong>ECONOMY &gt; Finance</strong></li>
                          <li>Articles are filtered by the tag</li>
                          <li>Page title shows the tag name: "Finance"</li>
                        </ol>
                        <p className="text-sm text-gray-600 mt-3 italic">
                          This creates a hierarchical navigation: <strong>Main Category &gt; Tag Filter</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Category Routing */}
                <section id="category-routing">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Category Routing Logic
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#1a2a44] text-white">
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">URL Pattern</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">Shows</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {[
                          { url: '/category/politics', shows: 'POLITICS collection' },
                          { url: '/category/economy', shows: 'ECONOMY collection' },
                          { url: '/category/society', shows: 'SOCIETY collection' },
                          { url: '/category/world', shows: 'WORLD collection' },
                          { url: '/category/commentary', shows: 'COMMENTARY collection (Opinion)' },
                          { url: '/category/photo-stories', shows: 'PHOTO_STORIES collection' },
                          { url: '/category/videos', shows: 'WATCH_VIDEOS + Podcasts' },
                          { url: '/category/news', shows: 'Mix: Politics + Economy + Society + World' }
                        ].map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-300 px-4 py-3 font-mono text-xs text-[#EE6260]">{row.url}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.shows}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Tag Filtering */}
                <section id="tag-filtering">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Tag Filtering System
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Tags are secondary filters applied <strong>ON TOP</strong> of categories.
                    The URL pattern <code className="bg-gray-100 px-2 py-1 rounded text-sm">/category/:category/tag/:tag</code> first
                    loads the category, then filters by the specified tag.
                  </p>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-xs leading-relaxed mb-6">
                    <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                 TAG FILTERING FLOW                               │
└─────────────────────────────────────────────────────────────────┘

  URL: /category/:category/tag/:tag
  Example: /category/politics/tag/eu-parliament

  ┌─────────────────────┐
  │ 1. Load Category    │  → Get all articles in POLITICS
  └──────────┬──────────┘
             │
  ┌──────────▼──────────┐
  │ 2. Apply Tag Filter │  → Filter by tag: "eu-parliament"
  └──────────┬──────────┘
             │
  ┌──────────▼──────────┐
  │ 3. Search in:       │  → article.tags.includes(tag)
  │   - tags[] array    │  → article.title.includes(tag)
  │   - title           │  → article.fullContent.includes(tag)
  │   - fullContent     │
  └──────────┬──────────┘
             │
  ┌──────────▼──────────┐
  │ 4. Display Results  │  → Show filtered articles with tag badge
  └─────────────────────┘`}</pre>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-bold text-green-900 mb-2">Example: Tag Filtering</h4>
                    <p className="text-sm text-green-800">
                      When a user clicks "EU Bubble" under POLITICS, they navigate to <code className="bg-white px-1 rounded">/category/politics/tag/eu-bubble</code>.
                      The page shows a breadcrumb <strong>POLITICS &gt; EU Bubble</strong> and displays only Politics articles that contain the "eu-bubble" tag.
                    </p>
                  </div>
                </section>

                {/* Navigation Structure */}
                <section id="navigation">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Navigation Structure
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'NEWS',
                        items: [
                          'World (primary category)',
                          'Politics (primary category)',
                          'Economy (primary category)',
                          'Society (primary category)',
                          'Photo Stories (primary category)'
                        ],
                        color: 'blue'
                      },
                      {
                        title: 'OPINION',
                        items: ['Commentary category'],
                        color: 'purple'
                      },
                      {
                        title: 'VIDEOS',
                        items: [
                          'All Videos + Podcasts',
                          'Watch (same as all videos)'
                        ],
                        color: 'red'
                      },
                      {
                        title: 'PODCASTS',
                        items: [
                          'Interference (podcastSeries === "Interference")',
                          'Horizon (podcastSeries === "Horizon Podcast")',
                          'Hammer Time (podcastSeries === "Hammer Time")'
                        ],
                        color: 'green'
                      },
                      {
                        title: 'OTHER',
                        items: ['Authors', 'Newsletters', 'Events', 'Partner With Us'],
                        color: 'gray'
                      }
                    ].map((section, idx) => (
                      <div key={idx} className={`bg-${section.color}-50 border-l-4 border-${section.color}-500 p-4 rounded`}>
                        <h4 className={`font-bold text-${section.color}-900 mb-2 text-sm uppercase tracking-wider`}>{section.title}</h4>
                        <ul className={`text-sm text-${section.color}-800 space-y-1`}>
                          {section.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Article Types */}
                <section id="article-types">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Article Detail Pages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        type: 'Regular Article',
                        url: '/article/:slug',
                        description: 'Standard news content with tags',
                        color: 'blue'
                      },
                      {
                        type: 'Premium Article',
                        url: '/premium/:slug',
                        description: 'Paywall/subscription required content',
                        color: 'purple'
                      },
                      {
                        type: 'Video Article',
                        url: '/video/:slug',
                        description: 'Video player with duration display',
                        color: 'red'
                      },
                      {
                        type: 'Podcast Episode',
                        url: '/podcast/:slug',
                        description: 'Audio player with series metadata',
                        color: 'green'
                      }
                    ].map((article, idx) => (
                      <div key={idx} className={`bg-${article.color}-50 border border-${article.color}-200 rounded-lg p-4`}>
                        <h4 className={`font-bold text-${article.color}-900 mb-1`}>{article.type}</h4>
                        <p className={`font-mono text-xs text-${article.color}-700 mb-2`}>{article.url}</p>
                        <p className={`text-sm text-${article.color}-800`}>{article.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Clicking a tag in article detail navigates to:
                      <code className="bg-white px-2 py-1 rounded mx-1 text-xs">/category/:category/tag/:tag</code>
                    </p>
                  </div>
                </section>

                {/* Key Relationships */}
                <section id="relationships">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Key Relationships Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-lg text-[#1a2a44] mb-2">Category → Article (1:Many)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Each article belongs to ONE primary category</li>
                        <li>• Categories are hardcoded collections in data.ts</li>
                        <li>• Articles are filtered into categories during data loading</li>
                      </ul>
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-lg text-[#1a2a44] mb-2">Article → Tags (1:Many)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Each article can have MULTIPLE tags</li>
                        <li>• Tags are stored in the tags[] array</li>
                        <li>• Tags enable cross-category content discovery</li>
                      </ul>
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-lg text-[#1a2a44] mb-2">Category + Tag → Filtered View (Combined)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• URL: /category/:category/tag/:tag</li>
                        <li>• First filters by category, then by tag</li>
                        <li>• Creates a narrowed content view</li>
                      </ul>
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-lg text-[#1a2a44] mb-2">Author Relationships</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Authors linked to articles via author field</li>
                        <li>• Author pages show all articles by that author</li>
                        <li>• Authors have dedicated profile pages</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* User Features */}
                <section id="user-features">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    User Context Features
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                      <h4 className="font-bold text-indigo-900 mb-2">FavoritesContext (React Context)</h4>
                      <ul className="text-sm text-indigo-800 space-y-1">
                        <li>• Stores favorited articles</li>
                        <li>• Persists across sessions</li>
                        <li>• Accessible on /favorites page</li>
                      </ul>
                    </div>
                    <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded">
                      <h4 className="font-bold text-pink-900 mb-2">Authentication</h4>
                      <ul className="text-sm text-pink-800 space-y-1">
                        <li>• LoginModal component</li>
                        <li>• SignUpModal component</li>
                        <li>• Modal-based authentication flow</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded">
                      <h4 className="font-bold text-teal-900 mb-2">User Profile</h4>
                      <ul className="text-sm text-teal-800 space-y-1">
                        <li>• /profile page for user settings</li>
                        <li>• User preferences management</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Technical Notes */}
                <section id="technical">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Technical Implementation Notes
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-xl text-[#1a2a44] mb-3">Route Structure (App.tsx)</h3>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-xs leading-relaxed">
                        <pre>{`<Routes>
  <Route path="/" />                              // HomePage
  <Route path="/article/:slug" />                 // Standard article
  <Route path="/premium/:slug" />                 // Premium article
  <Route path="/video/:slug" />                   // Video article
  <Route path="/podcast/:slug" />                 // Podcast episode
  <Route path="/category/:category" />            // Category view
  <Route path="/category/:category/tag/:tag" />   // Tagged category
  <Route path="/author/:authorSlug" />            // Author profile
  <Route path="/newsletters-grid" />              // Newsletter grid
  <Route path="/subscriptions" />                 // Plans
  <Route path="/events" />                        // Events
  <Route path="/favorites" />                     // User favorites
</Routes>`}</pre>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#1a2a44] mb-3">Data Transformation Pipeline</h3>
                      <div className="flex items-center gap-2 flex-wrap text-sm">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold">Scraped JSON</span>
                        <span className="text-gray-400">→</span>
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full font-bold">Transformers</span>
                        <span className="text-gray-400">→</span>
                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full font-bold">Data Loader</span>
                        <span className="text-gray-400">→</span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">React Components</span>
                      </div>
                      <ol className="mt-4 space-y-2 text-sm text-gray-700">
                        <li><strong>1.</strong> Scrapers output JSON files</li>
                        <li><strong>2.</strong> Transformers normalize data structure</li>
                        <li><strong>3.</strong> Data Loader categorizes and exports collections</li>
                        <li><strong>4.</strong> Components consume categorized data</li>
                      </ol>
                    </div>
                  </div>
                </section>

                {/* Category-Tag Matrix */}
                <section id="matrix">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Category-Tag Matrix
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#1a2a44] text-white">
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">Category</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">Common Tags (Examples)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { category: 'Politics', tags: 'EU Parliament, legislation, European Commission, elections, diplomacy, EU Bubble, corruption' },
                          { category: 'Economy', tags: 'trade, business, finance, markets, EU budget, economic policy, inflation, GDP, energy' },
                          { category: 'Society', tags: 'culture, education, health, environment, migration, social policy, human rights' },
                          { category: 'World', tags: 'war, Ukraine, Russia, China, US, NATO, international, global, Middle East, sanctions' },
                          { category: 'Commentary', tags: 'opinion, analysis, editorial, perspective' },
                          { category: 'Videos', tags: 'video, interview, documentary, footage' },
                          { category: 'Podcasts', tags: 'Interference, Horizon Podcast, Hammer Time, episode, audio, discussion' }
                        ].map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-300 px-4 py-3 font-bold text-[#1a2a44]">{row.category}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.tags}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Component Hierarchy */}
                <section id="hierarchy">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Page Component Hierarchy
                  </h2>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-xs leading-relaxed">
                    <pre>{`App.tsx
  └─ BrowserRouter (basename: /brusselssignal/website)
      └─ FavoritesProvider
          └─ AppContent
              ├─ Header
              │   └─ MegaMenu (categories, navigation)
              ├─ Ticker
              ├─ Routes
              │   ├─ HomePage
              │   ├─ ArticlePage
              │   │   ├─ ArticleDetail
              │   │   ├─ PremiumArticleDetail
              │   │   ├─ VideoArticleDetail
              │   │   └─ PodcastArticleDetail
              │   ├─ CategoryPageWrapper
              │   │   ├─ CategoryPage
              │   │   ├─ PodcastCategoryPage
              │   │   ├─ VideosAndPodcastsPage
              │   │   └─ FilteredVideosAndPodcastsPage
              │   ├─ AuthorPageWrapper
              │   │   └─ AuthorPage
              │   ├─ AuthorsPage (grid of all authors)
              │   ├─ NewslettersGridPage
              │   ├─ EventsPage
              │   ├─ FavoritesPage
              │   └─ UserProfilePage
              ├─ Footer
              ├─ LoginModal
              └─ SignUpModal`}</pre>
                  </div>
                </section>

                {/* URL Examples */}
                <section id="url-examples">
                  <h2 className="font-serif text-3xl font-bold text-[#1a2a44] mb-6 border-b-2 border-[#EE6260] pb-3">
                    Quick Reference: URL Examples
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#1a2a44] text-white">
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">Page Type</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">Example URL</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-bold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { type: 'Home', url: '/', desc: 'Homepage with featured content' },
                          { type: 'Category', url: '/category/politics', desc: 'All politics articles' },
                          { type: 'Tagged Category', url: '/category/politics/tag/eu-parliament', desc: 'Politics + EU Parliament tag' },
                          { type: 'Article', url: '/article/new-policy-approved', desc: 'Standard article' },
                          { type: 'Premium', url: '/premium/exclusive-report', desc: 'Paywall article' },
                          { type: 'Video', url: '/video/brussels-interview', desc: 'Video content' },
                          { type: 'Podcast', url: '/podcast/horizon-ep-5', desc: 'Podcast episode' },
                          { type: 'Author', url: '/author/john-smith', desc: 'Author profile' },
                          { type: 'Newsletters', url: '/newsletters-grid', desc: 'All newsletters' },
                          { type: 'Favorites', url: '/favorites', desc: "User's saved articles" }
                        ].map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-300 px-4 py-3 font-bold text-[#1a2a44]">{row.type}</td>
                            <td className="border border-gray-300 px-4 py-3 font-mono text-xs text-[#EE6260]">{row.url}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Final Summary */}
                <div className="bg-gradient-to-r from-[#1a2a44] to-[#2a3a54] text-white rounded-lg p-8 mt-12">
                  <h3 className="font-serif text-2xl font-bold mb-4">Architecture Highlights</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>✓ Flexible content organization via categories</li>
                    <li>✓ Cross-category discovery via tags</li>
                    <li>✓ Multiple content types (articles, videos, podcasts)</li>
                    <li>✓ User personalization (favorites, profiles)</li>
                    <li>✓ Scalable navigation structure</li>
                    <li>✓ Tag-based filtering on top of categories</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal: Tags vs Sub-Categories */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1a2a44] text-white px-6 py-4 flex items-center justify-between border-b border-gray-200 rounded-t-lg">
              <h3 className="text-2xl font-bold">Tags vs Sub-Categories: System Comparison</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-[#EE6260] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-8 space-y-8">

              {/* Introduction */}
              <div>
                <h4 className="text-xl font-bold text-[#1a2a44] mb-4">Differences between the current tag-based system versus a hierarchical sub-category system like WordPress</h4>
              </div>

              {/* Current System */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h5 className="font-bold text-lg text-blue-900 mb-3">Current System: Categories + Tags (Flat Structure)</h5>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  <pre>{`POLITICS (category)
  ├─ Article 1 [tags: EU Bubble, legislation]
  ├─ Article 2 [tags: elections, diplomacy]
  └─ Article 3 [tags: EU Bubble, corruption]`}</pre>
                </div>
                <div className="text-sm text-blue-900">
                  <p className="font-bold mb-2">How it works:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Each article belongs to <strong>one primary category</strong></li>
                    <li>Articles can have <strong>multiple tags</strong> for cross-referencing</li>
                    <li>Tags enable filtering: <code className="bg-blue-100 px-2 py-0.5 rounded">/category/politics/tag/eu-bubble</code></li>
                  </ul>
                </div>
              </div>

              {/* Alternative System */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <h5 className="font-bold text-lg text-amber-900 mb-3">Alternative: Hierarchical Sub-Categories (WordPress Style)</h5>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  <pre>{`POLITICS (parent category)
  ├─ EU BUBBLE (sub-category)
  │   ├─ Article 1
  │   └─ Article 3
  ├─ ELECTIONS (sub-category)
  │   └─ Article 2
  └─ DIPLOMACY (sub-category)
      └─ Article 4`}</pre>
                </div>
                <div className="text-sm text-amber-900">
                  <p className="font-bold mb-2">How it works:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Each article belongs to <strong>one sub-category</strong> (and inherits parent category)</li>
                    <li>URLs: <code className="bg-amber-100 px-2 py-0.5 rounded">/category/politics/eu-bubble</code></li>
                    <li>More rigid structure</li>
                  </ul>
                </div>
              </div>

              {/* Comparison Table */}
              <div>
                <h5 className="font-bold text-lg text-[#1a2a44] mb-4">Comparison: Tags vs Sub-Categories</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">Aspect</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">Tags (Current)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">Sub-Categories (WordPress)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Flexibility</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Articles can have multiple tags</td>
                        <td className="border border-gray-300 px-4 py-3 bg-red-50">❌ Article typically in one sub-category</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Cross-categorization</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Easy (politics article can have energy tag, linking to Economy)</td>
                        <td className="border border-gray-300 px-4 py-3 bg-red-50">❌ Difficult (article can't be in both Politics/EU-Bubble AND Economy/Energy)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Content discovery</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Users find related content across categories</td>
                        <td className="border border-gray-300 px-4 py-3 bg-yellow-50">⚠️ Content siloed within sub-category</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Complexity</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Simple structure</td>
                        <td className="border border-gray-300 px-4 py-3 bg-yellow-50">⚠️ More complex hierarchy to manage</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">SEO</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Tags as keywords</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Clear URL hierarchy</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Editorial workflow</td>
                        <td className="border border-gray-300 px-4 py-3 bg-yellow-50">⚠️ Authors must choose relevant tags</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Clear structure for content organization</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Navigation</td>
                        <td className="border border-gray-300 px-4 py-3 bg-yellow-50">⚠️ Can become cluttered with many tags</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Clean nested menus</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Future scalability</td>
                        <td className="border border-gray-300 px-4 py-3 bg-green-50">✅ Add tags without restructuring</td>
                        <td className="border border-gray-300 px-4 py-3 bg-yellow-50">⚠️ Adding sub-categories requires hierarchy changes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real-World Example */}
              <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg">
                <h5 className="font-bold text-lg text-[#1a2a44] mb-4">Real-World Example</h5>
                <p className="text-sm text-gray-700 mb-4"><strong>Scenario:</strong> An article about "EU Parliament votes on energy sanctions against Russia"</p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h6 className="font-bold text-sm text-green-700 mb-2">With Current Tag System:</h6>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                      <li><strong>Category:</strong> Politics</li>
                      <li><strong>Tags:</strong> EU Parliament, sanctions, energy, Russia, legislation</li>
                      <li><strong>Discoverability:</strong>
                        <ul className="ml-4 mt-1 space-y-1 list-circle">
                          <li>Shows in Politics category</li>
                          <li>Filterable by any tag</li>
                          <li>Links to Economy (energy tag) and World (Russia tag)</li>
                          <li>Users browsing "energy" tag see this alongside Economy articles</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h6 className="font-bold text-sm text-red-700 mb-2">With Sub-Category System:</h6>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                      <li><strong>Category:</strong> Politics → EU Bubble</li>
                      <li><strong>Problem:</strong>
                        <ul className="ml-4 mt-1 space-y-1 list-circle">
                          <li>Doesn't show in Economy or World</li>
                          <li>Users interested in "energy" or "Russia" won't find it unless they browse Politics/EU-Bubble</li>
                          <li>Can't appear in multiple sub-categories simultaneously</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Advantages of Tags */}
              <div>
                <h5 className="font-bold text-lg text-[#1a2a44] mb-3">Advantages of Tags (Current System)</h5>
                <div className="space-y-3">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-green-900 mb-1">1. Multi-dimensional Organization</h6>
                    <ul className="text-sm text-green-900 ml-4 list-disc space-y-1">
                      <li>One article can connect to multiple topics</li>
                      <li>Example: Politics article with "energy" tag appears when users filter Economy articles by energy</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-green-900 mb-1">2. Better for News/Journalism</h6>
                    <ul className="text-sm text-green-900 ml-4 list-disc space-y-1">
                      <li>News stories often span multiple topics</li>
                      <li>Tags allow fluid content relationships</li>
                      <li>Matches how journalists think about stories</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-green-900 mb-1">3. Simpler Content Management</h6>
                    <ul className="text-sm text-green-900 ml-4 list-disc space-y-1">
                      <li>No need to decide "which sub-category?"</li>
                      <li>Just tag with all relevant keywords</li>
                      <li>Less hierarchical rigidity</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-green-900 mb-1">4. Future-Proof</h6>
                    <ul className="text-sm text-green-900 ml-4 list-disc space-y-1">
                      <li>New topics emerge → just add new tags</li>
                      <li>No need to restructure entire category tree</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Advantages of Sub-Categories */}
              <div>
                <h5 className="font-bold text-lg text-[#1a2a44] mb-3">Advantages of Sub-Categories (WordPress Style)</h5>
                <div className="space-y-3">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-blue-900 mb-1">1. Clear Content Hierarchy</h6>
                    <ul className="text-sm text-blue-900 ml-4 list-disc space-y-1">
                      <li>Useful for very structured content (documentation, knowledge bases)</li>
                      <li>Clear parent-child relationships</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-blue-900 mb-1">2. Easier Navigation Design</h6>
                    <ul className="text-sm text-blue-900 ml-4 list-disc space-y-1">
                      <li>Dropdown menus naturally follow the hierarchy</li>
                      <li>Users understand "I'm in Politics → EU Bubble section"</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-blue-900 mb-1">3. Better for E-commerce/Large Catalogs</h6>
                    <ul className="text-sm text-blue-900 ml-4 list-disc space-y-1">
                      <li>Products fit neatly in categories</li>
                      <li>Example: Electronics → Laptops → Gaming Laptops</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                    <h6 className="font-bold text-sm text-blue-900 mb-1">4. Forced Organization</h6>
                    <ul className="text-sm text-blue-900 ml-4 list-disc space-y-1">
                      <li>Editors must categorize properly</li>
                      <li>Prevents "tag chaos" where articles have random tags</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-r from-[#1a2a44] to-[#2d3e5f] text-white p-6 rounded-lg">
                <h5 className="font-bold text-xl mb-4">My Recommendation for Brussels Signal</h5>
                <p className="text-lg mb-4"><strong>Stick with the current tag system because:</strong></p>
                <ol className="space-y-2 ml-6 list-decimal">
                  <li><strong>News is multidimensional</strong> - A single political story might relate to economy, world events, and society</li>
                  <li><strong>Cross-category discovery</strong> - Content benefits from flexible linking (users interested in "Ukraine" should see Politics, World, AND Economy articles)</li>
                  <li><strong>We already have 5 main categories</strong> - These provide enough structure; tags add flexibility without over-complicating</li>
                  <li><strong>Scalability</strong> - As European news evolves (new topics, new crises), tags are easier to manage than restructuring sub-categories</li>
                  <li><strong>Better user experience for journalism</strong> - Tags work like keyword search, matching how readers think about topics</li>
                </ol>
              </div>

              {/* When Sub-Categories Would Be Better */}
              <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
                <h5 className="font-bold text-lg text-yellow-900 mb-3">When Sub-Categories Would Be Better</h5>
                <p className="text-sm text-yellow-900 mb-3">Sub-categories would make sense if Brussels Signal were:</p>
                <ul className="text-sm text-yellow-900 ml-4 list-disc space-y-1">
                  <li>A documentation site (clear hierarchies)</li>
                  <li>An e-commerce store (product catalogs)</li>
                  <li>A highly structured knowledge base</li>
                  <li>Focused on a narrow topic with clear subdivisions</li>
                </ul>
                <p className="text-sm text-yellow-900 mt-3 font-semibold">But for news journalism with diverse, overlapping topics, tags are superior.</p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end rounded-b-lg">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-[#EE6260] text-white font-bold uppercase tracking-wider rounded hover:bg-[#d44947] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SiteArchitecturePage;
