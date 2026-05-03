import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy submit (later connect backend)
    if (form.name && form.email && form.message) {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          Message sent successfully 🎉
        </div>
      )}

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Contact Us 📞
        </h1>
        <p className="text-gray-600">
          We'd love to hear from you. Reach out anytime!
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT - GLASS CARD */}
        <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Get in Touch
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>📧 support@farm2home.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Lucknow, India</p>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Available 24/7 for your queries 💚
          </p>
        </div>

        {/* RIGHT - FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
        >
          {/* NAME */}
          <div className="relative">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-3 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600">
              Your Name
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-3 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600">
              Your Email
            </label>
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <textarea
              rows="4"
              required
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-3 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600">
              Your Message
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-[1.02]"
          >
            Send Message 🚀
          </button>
        </form>
      </div>

      {/* MAP */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=lucknow&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-72 border-0"
          ></iframe>
        </div>
      </div>

    </div>
  );
}