# Brussels Signal - Site Architecture & Content Structure

## Visual Sitemap

```
┌─────────────────────────────────────────────────────────────────┐
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
        └───────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                    CONTENT PAGES                                │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  /newsletters           → Newsletter Landing Page              │
│  /newsletters-grid      → All Newsletters Grid                 │
│  /newsletters-promo     → Newsletter Promo Page                │
│                                                                 │
│  /subscriptions         → Subscription Plans                   │
│                                                                 │
│  /authors               → All Authors Grid                     │
│  /author/:authorSlug    → Individual Author Profile            │
│                                                                 │
│  /events                → Events Page                          │
│  /partner-with-us       → Partnership Information              │
│                                                                 │
│  /favorites             → User's Saved Articles (FavContext)   │
│  /profile               → User Profile Page                    │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                 SPECIALIZED CONTENT PAGES                       │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  /category/videos       → Videos & Podcasts Combined View      │
│  /category/videos-      → Filtered Videos                      │
│         filtered                                                │
│  /category/podcasts     → All Podcast Series View              │
│    ├─ Interference      → Podcast Series Filter                │
│    ├─ Horizon Podcast   → Podcast Series Filter                │
│    └─ Hammer Time       → Podcast Series Filter                │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Content Flow & Data Structure

```
┌──────────────────────────────────────────────────────────────────┐
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
└────────────────┘  └─────────────────┘
```

---

## Categories & Tags Relationship

### How Categories Work

Each article has a **primary category** assigned during data transformation:

```
NewsItem {
  category: 'Politics' | 'Economy' | 'Society' | 'World' | 'Commentary' | 'Videos'
  tags: string[]  // Array of tags
}
```

### Category Routing Logic

```
┌────────────────────────────────────────────────────────────────┐
│              CATEGORY URL PATTERNS                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  /category/politics       → Shows POLITICS collection          │
│  /category/economy        → Shows ECONOMY collection           │
│  /category/society        → Shows SOCIETY collection           │
│  /category/world          → Shows WORLD collection             │
│  /category/commentary     → Shows COMMENTARY collection        │
│  /category/photo-stories  → Shows PHOTO_STORIES collection     │
│  /category/videos         → Shows WATCH_VIDEOS + Podcasts      │
│  /category/news           → Mix of Politics+Economy+Society+World│
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Tags Filtering System

**Tags are secondary filters applied ON TOP of categories:**

```
┌─────────────────────────────────────────────────────────────────┐
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
  └─────────────────────┘
```

### Tag Sources

Tags come from the article's `tags` array (populated during scraping):

```javascript
// Example article with tags
{
  id: "article-123",
  title: "EU Parliament Debates New Policy",
  category: "Politics",
  tags: [
    "EU Parliament",
    "legislation",
    "European Commission",
    "international"
  ]
}
```

### Main Categories

The site has **5 main content categories**:

1. **Politics** - EU/European political news
2. **Economy** - Financial, trade, business news
3. **Society** - Social issues, culture, migration
4. **World** - International news, war, global affairs
5. **Opinion** (Commentary) - Opinion pieces and analysis

Each category is a separate collection created during data transformation based on article content and tags.

### Menu Sub-Links: Tag-Based Filtering

The mega menu displays sub-links under each main category. These sub-links use **tag-based filtering** to show narrowed content views:

**Example: Politics Category**
- Click "POLITICS" → Shows all Politics articles
- Click "EU Bubble" → Navigates to `/category/politics/tag/eu-bubble` → Shows Politics articles filtered by "eu-bubble" tag
- Click "Elections" → Navigates to `/category/politics/tag/elections` → Shows Politics articles filtered by "elections" tag

**How It Works:**
1. User clicks a sub-link (e.g., "Finance" under ECONOMY)
2. Navigates to `/category/economy/tag/finance`
3. CategoryPage receives both `category` and `tag` parameters
4. Page displays breadcrumb: **ECONOMY > Finance**
5. Articles are filtered by the tag
6. Page title shows the tag name: "Finance"

This creates a hierarchical navigation: **Main Category > Tag Filter**

---

## Navigation Structure

```
┌────────────────────────────────────────────────────────────────┐
│                    HEADER MEGA MENU                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  NEWS                                                           │
│   ├─ World            (primary category)                       │
│   ├─ Politics         (primary category)                       │
│   ├─ Economy          (primary category)                       │
│   ├─ Society          (primary category)                       │
│   └─ Photo Stories    (primary category)                       │
│                                                                 │
│  OPINION              (Commentary category)                     │
│                                                                 │
│  VIDEOS               (Shows all videos + podcasts)             │
│   ├─ All Videos       (filtered: no podcast series)            │
│   └─ Watch            (same as all videos)                     │
│                                                                 │
│  PODCASTS             (Shows podcast series view)               │
│   ├─ Interference     (podcastSeries === 'Interference')       │
│   ├─ Horizon          (podcastSeries === 'Horizon Podcast')    │
│   └─ Hammer Time      (podcastSeries === 'Hammer Time')        │
│                                                                 │
│  AUTHORS              (Author grid + profiles)                  │
│  NEWSLETTERS          (Newsletter content)                      │
│  EVENTS               (Events page)                            │
│  PARTNER WITH US      (Partnership info)                        │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Article Detail Pages

```
┌────────────────────────────────────────────────────────────────┐
│                    ARTICLE TYPES                                │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Regular Article      → /article/:slug                         │
│    - Standard news content                                      │
│    - Shows tags in article detail                              │
│    - Click tag → /category/:category/tag/:tag                  │
│                                                                 │
│  Premium Article      → /premium/:slug                         │
│    - Paywall/subscription required                             │
│    - Premium badge displayed                                    │
│                                                                 │
│  Video Article        → /video/:slug                           │
│    - Video player embedded                                      │
│    - Duration displayed                                         │
│    - Category = 'Videos'                                        │
│                                                                 │
│  Podcast Episode      → /podcast/:slug                         │
│    - Audio player embedded                                      │
│    - podcastSeries metadata                                     │
│    - Links to podcast series page                              │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Key Relationships Summary

### Category → Article (1:Many)
- Each article belongs to ONE primary category
- Categories are hardcoded collections in `data.ts`
- Articles are filtered into categories during data loading

### Article → Tags (1:Many)
- Each article can have MULTIPLE tags
- Tags are stored in the `tags[]` array
- Tags enable cross-category content discovery

### Category + Tag → Filtered View (Combined)
- URL: `/category/:category/tag/:tag`
- First filters by category, then by tag
- Creates a narrowed content view

### Special Categories
- **World**: Proper category for international news (war, global affairs, NATO, US, China, Russia, Ukraine)
- **News**: Mix of Politics + Economy + Society + World articles
- **Videos-Filtered**: Excludes all podcast content

### Author Relationships
- Authors linked to articles via `author` field
- Author pages show all articles by that author
- Authors have dedicated profile pages

---

## User Features

```
┌────────────────────────────────────────────────────────────────┐
│                 USER CONTEXT FEATURES                           │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FavoritesContext (React Context)                              │
│    ├─ Stores favorited articles                               │
│    ├─ Persists across sessions                                │
│    └─ Accessible on /favorites page                           │
│                                                                 │
│  Authentication Modals                                          │
│    ├─ LoginModal                                              │
│    └─ SignUpModal                                             │
│                                                                 │
│  User Profile                                                   │
│    └─ /profile page                                           │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation Notes

### Route Structure (App.tsx)
```javascript
<Routes>
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
</Routes>
```

### Data Transformation Pipeline
```
Scraped JSON → Transformers → Data Loader → React Components
```

1. **Scrapers** output JSON files
2. **Transformers** normalize data structure
3. **Data Loader** categorizes and exports collections
4. **Components** consume categorized data

---

## Visual Category-Tag Matrix

```
┌─────────────┬──────────────────────────────────────────────────┐
│  CATEGORY   │  COMMON TAGS (Examples)                          │
├─────────────┼──────────────────────────────────────────────────┤
│  Politics   │ EU Parliament, legislation, European Commission, │
│             │ elections, diplomacy, EU Bubble, corruption      │
├─────────────┼──────────────────────────────────────────────────┤
│  Economy    │ trade, business, finance, markets, EU budget,    │
│             │ economic policy, inflation, GDP, energy          │
├─────────────┼──────────────────────────────────────────────────┤
│  Society    │ culture, education, health, environment,         │
│             │ migration, social policy, human rights           │
├─────────────┼──────────────────────────────────────────────────┤
│   World     │ war, Ukraine, Russia, China, US, NATO,           │
│             │ international, global, Middle East, sanctions    │
├─────────────┼──────────────────────────────────────────────────┤
│ Commentary  │ opinion, analysis, editorial, perspective        │
├─────────────┼──────────────────────────────────────────────────┤
│   Videos    │ video, interview, documentary, footage           │
├─────────────┼──────────────────────────────────────────────────┤
│  Podcasts   │ Interference, Horizon Podcast, Hammer Time,      │
│             │ episode, audio, discussion                       │
└─────────────┴──────────────────────────────────────────────────┘
```

---

## HomePage Components

The HomePage (`/`) displays multiple content sections:

```
┌────────────────────────────────────────────────────────────────┐
│                       HOMEPAGE LAYOUT                           │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. FeaturedArticle                                            │
│     └─ Shows FEATURED_ARTICLE (first article from data)       │
│                                                                 │
│  2. MostReadSection                                            │
│     └─ Grid of MOST_READ articles                             │
│                                                                 │
│  3. CommentarySection                                          │
│     └─ COMMENTARY articles (opinion pieces)                   │
│                                                                 │
│  4. VideoFeed                                                  │
│     └─ Carousel of first 5 videos from WATCH_VIDEOS           │
│     └─ Horizontal scroll with navigation arrows               │
│                                                                 │
│  5. CategorySections                                           │
│     ├─ Politics articles                                      │
│     ├─ Economy articles                                       │
│     ├─ Society articles                                       │
│     └─ World articles                                         │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### VideoFeed Implementation

The VideoFeed component displays a horizontal carousel of video content:

- **Data Source**: `WATCH_VIDEOS.slice(0, 5)` - First 5 videos (excludes podcasts)
- **Display**: Horizontal scrolling carousel with left/right navigation buttons
- **Click behavior**: Navigates to `/video/:slug`
- **Note**: Previously filtered for videos with IDs starting with 'vf', now uses first 5 videos from the collection

---

## Page Component Hierarchy

```
App.tsx
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
              └─ SignUpModal
```

---

## Quick Reference: URL Examples

| Page Type | Example URL | Description |
|-----------|-------------|-------------|
| Home | `/` | Homepage with featured content |
| Category | `/category/politics` | All politics articles |
| Tagged Category | `/category/politics/tag/eu-parliament` | Politics + EU Parliament tag |
| Article | `/article/new-policy-approved` | Standard article |
| Premium | `/premium/exclusive-report` | Paywall article |
| Video | `/video/brussels-interview` | Video content |
| Podcast | `/podcast/horizon-ep-5` | Podcast episode |
| Author | `/author/john-smith` | Author profile |
| Newsletters | `/newsletters-grid` | All newsletters |
| Favorites | `/favorites` | User's saved articles |

---

**This architecture allows for:**
- Flexible content organization via categories
- Cross-category discovery via tags
- Multiple content types (articles, videos, podcasts)
- User personalization (favorites, profiles)
- Scalable navigation structure
