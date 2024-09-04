function Testimonials() {
  const testimonials = [
    {
      quote:
        "Amazing products and excellent service! Will definitely shop here again.",
      name: "Jane Doe",
      role: "Verified Buyer",
      image: "/testimonials/pf1.jpg",
    },
    {
      quote:
        "The best experience I've had shopping online. Highly recommended!",
      name: "Jenny Lucifer",
      role: "Verified Buyer",
      image: "/testimonials/pf2.jpg",
    },
    {
      quote:
        "Fantastic customer support and fast delivery. Will be back for sure.",
      name: "Alice Johnson",
      role: "Verified Buyer",
      image: "/testimonials/pf3.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 max-w-xs flex items-center gap-4"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div>
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
