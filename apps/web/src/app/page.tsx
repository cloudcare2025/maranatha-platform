import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-primary-900">
              Maranatha Bible Church
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/sermons" className="text-sm font-medium text-gray-600 hover:text-primary-600">
              Sermons
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary-600">
              About
            </Link>
            <Link href="/connect" className="text-sm font-medium text-gray-600 hover:text-primary-600">
              Connect
            </Link>
            <Link href="/give" className="text-sm font-medium text-gray-600 hover:text-primary-600">
              Give
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-24 text-white">
        <div className="container text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary-200">
            Welcome to
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            Maranatha Bible Church
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
            Proclaiming God&apos;s Unchanging Word in an Increasingly Unstable World
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sermons"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-900 shadow-sm hover:bg-primary-50 transition-colors"
            >
              Watch Sermons
            </Link>
            <Link
              href="/about/visit"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            Join Us This Week
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="font-serif text-xl font-semibold text-gray-900">Sunday Service</h3>
              <p className="mt-2 text-2xl font-bold text-primary-600">1:00 PM</p>
              <p className="mt-1 text-gray-600">New Testament Teaching</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="font-serif text-xl font-semibold text-gray-900">Wednesday Prayer</h3>
              <p className="mt-2 text-2xl font-bold text-primary-600">7:00 PM</p>
              <p className="mt-1 text-gray-600">Prayer Night</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="font-serif text-xl font-semibold text-gray-900">Friday Bible Study</h3>
              <p className="mt-2 text-2xl font-bold text-primary-600">7:00 PM</p>
              <p className="mt-1 text-gray-600">Old Testament Studies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Our Location
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            4701 N. Canfield Avenue, Norridge, IL 60706
          </p>
          <Link
            href="/about/visit"
            className="mt-6 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Get Directions →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Maranatha Bible Church. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.youtube.com/@mbc.chicago" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                YouTube
              </a>
              <a href="https://mbchicago.org" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                Current Site
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
