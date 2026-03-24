import PinballAnimation from '../components/pinball';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
          Welcome to Our Arcade
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Step into the world of pinball. Classic games, modern vibes.
        </p>
        <button className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Get Started
        </button>
      </section>

      {/* Pinball Animation */}
      <section className="py-12">
        <PinballAnimation />
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Classic Games', desc: 'Experience authentic pinball machines' },
          { title: 'Modern Arcade', desc: 'Updated classics with a contemporary twist' },
          { title: 'Community', desc: 'Join other pinball enthusiasts and compete' },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}