import MyButton from "../../../components/MyButton/MyButton";
import MyTitle from "../../../components/MyTitle/MyTitle";
import { faqData } from "../../../data/faqData";

const FAQSection = () => {
  return (
    <>
      <div className="text-center max-w-3xl w-full mx-auto">
        <MyTitle>Frequently Asked Question (FAQ)</MyTitle>

        <p>
          Enhance picture, mobility, and well-being effortlessly with Pecistan
          Pin. Achieve proper alignment, reduce path, and strengthen your body
          with speed
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div
            key={item.id}
            className="collapse collapse-arrow bg-base-200 border border-base-300 accordion-checked"
          >
            <input type="radio" name="FAQ" defaultChecked={i === 0} />
            <div className="collapse-title text-xl text-secondary font-medium">
              {item.question}
            </div>

            <div className="collapse-content">
              <p className="text-gray-600 border-t border-gray-300 pt-3.5">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <MyButton>See More FAQ's</MyButton>
      </div>
    </>
  );
};

export default FAQSection;
