const FAQItem = ({ question, answer }) => {
  return (
    <div className="py-3 border-b border-gray-800 last:border-0">
      <h4 className="text-lg font-semibold text-white mb-2">{question}</h4>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default FAQItem;