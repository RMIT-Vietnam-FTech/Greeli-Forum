import React from "react";
import forumFAQ from "../data/forumFAQ";
import "../style/faq.css";

const FAQ = () => {
    return (
      <div className="accordion accordion-flush p-3" id="accordionFlushExample">
        {forumFAQ.map((item) => (
          <div className="accordion-item rounded-3 mb-2" key={item.id}>
            <h1 className="accordion-header" id={`flush-heading${item.id}`}>
              <button
                className="accordion-button collapsed fs-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${item.id}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${item.id}`}
              >
                {item.question}
              </button>
            </h1>
            <div
              id={`flush-collapse${item.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`flush-heading${item.id}`}
              data-bs-parent="#accordionFlushExample"
            >
              <p className="accordion-body">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    );
}

export default FAQ;