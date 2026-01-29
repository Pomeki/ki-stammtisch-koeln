import { getPublishedPosts } from '@/lib/blog';
import { connectToDatabase } from '@/lib/db';
import { EventModel, getSettings } from '@/models';
import { LandingPage } from '@/components';

async function getHomeData() {
  try {
    await connectToDatabase();

    const settings = await getSettings();

    // Get next event
    let nextEvent = null;
    if (settings.nextEventId) {
      nextEvent = await EventModel.findById(settings.nextEventId).lean();
    }
    if (!nextEvent) {
      nextEvent = await EventModel.findOne({
        isActive: true,
        date: { $gte: new Date() },
      }).sort({ date: 1 }).lean();
    }

    // Get past events if archive is enabled
    let pastEvents: typeof nextEvent[] = [];
    if (settings.showEventArchive) {
      pastEvents = await EventModel.find({
        date: { $lt: new Date() },
      }).sort({ date: -1 }).limit(3).lean();
    }

    return {
      settings: JSON.parse(JSON.stringify(settings)),
      nextEvent: nextEvent ? JSON.parse(JSON.stringify(nextEvent)) : null,
      pastEvents: JSON.parse(JSON.stringify(pastEvents)),
    };
  } catch (error: any) {
    // Only log error if it's NOT a connection refused error (to reduce noise in dev)
    if (!error.message?.includes('ECONNREFUSED') && !error.message?.includes('buffering timed out')) {
      console.error('Error fetching home data:', error);
    }

    return {
      settings: {
        showCountdown: true,
        showEventArchive: true,
        heroTitle: 'KI-Stammtisch Köln',
        heroSubtitle: 'Der Treffpunkt für Selbstständige, Unternehmer und Firmen, die KI in ihr Geschäft integrieren möchten.',
      },
      nextEvent: null,
      pastEvents: [],
      isOffline: true
    };
  }
}

export default async function Home() {
  const { settings, nextEvent, pastEvents } = await getHomeData();
  const blogPosts = getPublishedPosts().slice(0, 3);

  return (
    <LandingPage
      settings={settings}
      nextEvent={nextEvent}
      pastEvents={pastEvents}
      blogPosts={blogPosts}
    />
  );
}
