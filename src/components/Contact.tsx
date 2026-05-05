export default function Contact() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: form.get("message"),
      }),
    });

    alert("Message sent!");
  };

  return (
    <section id="contact" className="py-20 px-10 text-center">
      <h2 className="text-3xl mb-6">Contact</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          name="message"
          className="w-full max-w-md p-3 text-black"
          placeholder="Your message"
        />

        <br />

        <button className="mt-4 bg-green-500 px-6 py-2 rounded-full">
          Send
        </button>
      </form>
    </section>
  );
}