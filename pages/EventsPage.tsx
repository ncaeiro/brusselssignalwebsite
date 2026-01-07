import React from 'react';

const EVENTS_DATA = [
  {
    id: 'event1',
    title: 'Brussels Signal Launch Event',
    date: 'January 15, 2025',
    time: '18:00 - 21:00 CET',
    location: 'Brussels Press Club, Rue Froissart 95, 1040 Brussels',
    description: 'Join us for the official launch of Brussels Signal, featuring panel discussions on the future of European journalism and networking opportunities.',
    type: 'Past Event',
    imageUrl: import.meta.env.BASE_URL + 'images/events/launch-event.jpg'
  },
  {
    id: 'event2',
    title: 'EU Policy Debate: The Future of Migration',
    date: 'February 20, 2025',
    time: '19:00 - 21:30 CET',
    location: 'European Parliament, Brussels',
    description: 'An in-depth debate on European migration policy with MEPs, policy experts, and civil society representatives.',
    type: 'Upcoming',
    imageUrl: import.meta.env.BASE_URL + 'images/events/migration-debate.jpg'
  },
  {
    id: 'event3',
    title: 'Investigative Journalism Workshop',
    date: 'March 10, 2025',
    time: '14:00 - 18:00 CET',
    location: 'Brussels Signal Headquarters',
    description: 'A hands-on workshop for aspiring investigative journalists covering EU institutions, data journalism, and FOIA requests.',
    type: 'Upcoming',
    imageUrl: import.meta.env.BASE_URL + 'images/events/journalism-workshop.avif'
  }
];

const EventsPage: React.FC = () => {
  return (
    <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12 border-b-2 border-red-600 pb-6">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a2a44] mb-3 tracking-tight">Events</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Join Brussels Signal at our upcoming events, panel discussions, and workshops.
          Connect with journalists, policymakers, and fellow readers passionate about European affairs.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {EVENTS_DATA.map((event) => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Event Image */}
              <div className="md:col-span-1">
                <div className="aspect-video md:aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {event.type === 'Upcoming' && (
                    <div className="absolute top-4 left-4 bg-[#EE6260] text-white px-3 py-1 text-xs font-bold uppercase rounded">
                      Upcoming
                    </div>
                  )}
                  {event.type === 'Past Event' && (
                    <div className="absolute top-4 left-4 bg-gray-500 text-white px-3 py-1 text-xs font-bold uppercase rounded">
                      Past Event
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="md:col-span-2 p-6">
                <h2 className="text-2xl font-black text-[#1a2a44] mb-3">{event.title}</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-[#EE6260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="font-semibold">{event.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-[#EE6260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start text-gray-600">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-[#EE6260] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                {event.type === 'Upcoming' && (
                  <button className="bg-[#EE6260] text-white px-6 py-2 font-bold text-sm uppercase rounded hover:bg-red-700 transition">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-black text-[#1a2a44] mb-3">Want to organize an event with us?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Brussels Signal is always looking to engage with our community. If you're interested in partnering
          with us for an event or have an idea for a panel discussion, we'd love to hear from you.
        </p>
        <a
          href="mailto:events@brusselssignal.eu"
          className="inline-block bg-[#1a2a44] text-white px-8 py-3 font-bold text-sm uppercase rounded hover:bg-[#2a3a54] transition"
        >
          Contact Us
        </a>
      </div>
    </main>
  );
};

export default EventsPage;
