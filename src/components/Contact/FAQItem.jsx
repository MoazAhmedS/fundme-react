const FAQItem = ({ question, answer }) => {
  return (
    <div className="py-6 border-b border-gray-800 last:border-0 max-w-2xl mx-auto">
      <h4 className="text-xl font-semibold text-white mb-3 text-center">
        {question}
      </h4>
      <p className="text-gray-400 text-center leading-relaxed">
        {answer}
      </p>
    </div>
  );
};

export default FAQItem;