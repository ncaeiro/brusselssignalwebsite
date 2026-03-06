import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EVENTS_DATA } from '../src/eventsData.ts';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = EVENTS_DATA.find(e => e.id === eventId);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!event) {
    return (
      <main className="flex-grow flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#1a2a44] mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link to="/events" className="bg-[#EE6260] text-white px-8 py-3 font-bold text-sm uppercase rounded hover:bg-[#d44947] transition">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-white">

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-[#1a2a44]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a44] via-[#1a2a44]/40 to-transparent" />

        {/* Badge */}
        <div className="absolute top-6 left-6">
          <span className={`px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded ${event.type === 'Upcoming' ? 'bg-[#EE6260]' : 'bg-gray-500'} text-white`}>
            {event.type}
          </span>
        </div>

        {/* Back link */}
        <div className="absolute top-6 right-6">
          <Link
            to="/events"
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            All Events
          </Link>
        </div>

        {/* Event title over banner */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Event Meta Bar */}
      <div className="bg-[#121c2d] text-white py-5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-6 md:gap-10 text-sm">
            {/* Guests */}
            {event.guests.length > 0 && (
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Guest{event.guests.length > 1 ? 's' : ''}</p>
                  <div className="space-y-0.5">
                    {event.guests.map((g, i) => (
                      <p key={i} className="font-semibold leading-snug">
                        {g.name}
                        {g.title && <span className="text-gray-400 font-normal"> · {g.title}</span>}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Date & Time */}
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Date & Time</p>
                <p className="font-semibold">{event.date}</p>
                <p className="text-gray-300">{event.time}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#EE6260] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">

        {/* Description */}
        <section className="mb-16">
          <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">About This Event</h2>
          <p className="text-xl text-gray-700 leading-relaxed">{event.description}</p>

          {event.type === 'Upcoming' && (
            <div className="mt-8">
              <button className="bg-[#EE6260] text-white px-10 py-4 font-black text-sm uppercase tracking-widest rounded hover:bg-[#d44947] transition-all shadow-lg">
                Register Now
              </button>
            </div>
          )}
        </section>

        {/* Image Carousel */}
        <section className="mb-16">
          <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">Event Photos</h2>
          <div className="border-t border-gray-200 pt-8">
            {event.carouselImages.length > 0 ? (
              <div>
                {/* Main slide */}
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 mb-4 shadow-md">
                  <img
                    src={event.carouselImages[activeSlide]}
                    alt={`${event.title} photo ${activeSlide + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {event.carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveSlide(i => (i - 1 + event.carouselImages.length) % event.carouselImages.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        aria-label="Previous"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveSlide(i => (i + 1) % event.carouselImages.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        aria-label="Next"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {event.carouselImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === activeSlide ? 'bg-white' : 'bg-white/40'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                {event.carouselImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {event.carouselImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-colors ${i === activeSlide ? 'border-[#EE6260]' : 'border-transparent'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg py-16 text-center">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 font-semibold">Photos will be added after the event</p>
              </div>
            )}
          </div>
        </section>

        {/* Videos */}
        <section className="mb-16">
          <h2 className="text-[#EE6260] font-black text-sm uppercase tracking-[0.3em] mb-4">Event Videos</h2>
          <div className="border-t border-gray-200 pt-8">
            {event.videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.videos.map((video, i) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-md bg-black">
                    <div className="aspect-video">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-white text-sm font-semibold px-4 py-3">{video.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg py-16 text-center">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 font-semibold">Videos will be added after the event</p>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Back to events CTA */}
      <div className="bg-[#1a2a44] py-12 text-center">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest hover:text-[#EE6260] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Events
        </Link>
      </div>

    </main>
  );
};

export default EventDetailPage;
