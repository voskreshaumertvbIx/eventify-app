

import EventsAll from "@/component/event/EventsAll";


const page = () => {
  return (
    <main className="p-4 dark:bg-gray-900 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">All Events</h1>
      <EventsAll />
    </main>
  );
};

export default page;
