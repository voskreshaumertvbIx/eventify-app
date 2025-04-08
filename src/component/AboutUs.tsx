
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Eventify</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Empowering connections through unforgettable events.
          </p>
        </div>

        
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Eventify, our mission is to simplify the way people discover, attend, and host events.
              Whether it&apos;s a tech meetup, a music festival, or a cozy local workshop — we bring communities together
              by making events accessible, inclusive, and exciting.
            </p>
          </div>
          <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/our_mission.jpg"
              alt="Our mission"
              fill
              className="object-cover"
            />
          </div>
        </section>

        
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
            <Image
              src="/our_team.webp"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We’re a passionate group of developers, designers, and event lovers dedicated to creating a seamless platform
              that connects people and experiences. Our diverse team shares a common goal: to build tools that make event
              discovery and management easy, meaningful, and fun.
            </p>
          </div>
        </section>


        <section className="text-center mb-20">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Eventify?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "User-Centered Design",
                desc: "We prioritize simplicity, accessibility, and joy in every interaction."
              },
              {
                title: "Real-time Updates",
                desc: "Stay informed with instant notifications about upcoming events and changes."
              },
              {
                title: "Community-Driven",
                desc: "Eventify grows with its users — your feedback shapes our future."
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

       


       
          <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-8 text-center">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                text: "Eventify completely changed how I discover local events. Super intuitive and easy to use!",
              },
              {
                name: "Liam T.",
                text: "As an event organizer, it’s been a game-changer. The dashboard is simple yet powerful.",
              },
              {
                name: "Nina R.",
                text: "I’ve met so many amazing people through events I found on Eventify. Highly recommended!",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                  “{testimonial.text}”
                </p>
                <div className="text-right font-semibold text-gray-700 dark:text-gray-300">
                  — {testimonial.name}
                </div>
              </div>
            ))}
          </div>
          </section>
      </div>
            
       

    </div>
  );
}
