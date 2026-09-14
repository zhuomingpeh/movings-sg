// Real Google reviews, supplied by Ming (screenshots from the Moving
// Solutions Google Business Profile). Verbatim text — not edited or
// shortened, since these are someone else's words attributed to their name.
export const REVIEWS = [
  {
    name: "Janice Kho",
    source: "Google · Local Guide, 21 reviews",
    date: "8 months ago",
    text: `Was just scrolling to find a mover, yes! First-timer, just simply 2 words "HIGHLY RECOMMENDED"! From liaising with April to final moving was smooth sailing. Arrangement from April's service was way and beyond! She replied promptly and never fail to provide updates and to sending quotation. Not only these, the movers have to walk very far to load and unload my items and they did so with so much politeness and without showing any displeasure. April even checked in to ensure the movers are on the way to my place. The movers were so swift and careful with the items, ensuring my items will not get damaged any even stacking fragile things away from heavier boxes. They will gauge if it is suitable to place the boxes on top of each other. I have never been so pleased with such an extreme good service! Good job! Highly recommended! Keep the good going! Good luck!`,
  },
  {
    name: "Sam Soh",
    source: "Google · 9 reviews",
    date: "a month ago",
    priceRange: "$1,400–1,600",
    text: `I had an excellent experience with Moving Solutions. They were consistently prompt in responding, even when I sent messages late the evening, and were remarkably flexible in accommodating my requests and schedule. Their professionalism, reliability and willingness to adapt made the entire moving process smooth and stress-free. I would gladly recommend them to anyone seeking a dependable and customer-focused moving company here in Singapore.`,
  },
  {
    name: "Thel S",
    source: "Google",
    date: "a month ago",
    priceRange: "$1,000–1,200",
    text: `One of the fastest and smoothest transactions I've ever had! April was super accommodating. First spoke to her back in May but had to hold off because of a change of plans. She never made me feel like it was a hassle. Instead, she was genuinely grateful we considered her team.\n\nFast forward to July, we suddenly needed to move within 24 hours. I reached out and she immediately arranged everything. On moving day, her team handled packing, wrapping, uninstalling shelves, and more, all done in just less than 3 hours. Way quicker than expected.\n\nSuper efficient, easy to talk to, and definitely value for money. Plus, they're friendly and even gave us discounts. Honestly the best partner we worked with by far in SG. Highly recommended. They're now our go-to moving service.`,
  },
  {
    name: "Casey Low",
    source: "Google · Local Guide, 15 reviews",
    date: "3 months ago",
    text: `Had a great experience with Moving Solutions. Special thanks to April for her prompt and efficient coordination of our small-scale move at very short notice. She was responsive, helpful and made the entire process smooth and stress-free.\n\nThe worker who assisted us with the move was professional, efficient and careful with our belongings. He handled everything with care.\n\nThank you, Moving Solutions, for the excellent service.`,
  },
  {
    name: "Yew Thong",
    source: "Google · Local Guide, 31 reviews",
    date: "a year ago",
    text: `Overall the service and communication was quite smooth, everything was packed nicely, even though we had to keep on extending storage, April was kind enough to assist us to delay the storage and extend it. Items came back intact, no missing items, no damages. Timing wise also punctual, for my case they gave me a block timing and the drivers would arrive within this block so I wouldn't need to always chase them. Pricing wise quite competitive and affordable as I have compared. First time trying, highly recommend.`,
  },
] as const;

function Stars() {
  return (
    <div className="testimonial-stars" aria-label="5 out of 5 stars">
      ★★★★★
    </div>
  );
}

type Props = {
  /** Show a subset (e.g. 3 for the homepage) or all (undefined). */
  limit?: number;
};

export default function Testimonials({ limit }: Props) {
  const reviews = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  return (
    <div className="testimonial-grid">
      {reviews.map((review) => (
        <article className="testimonial-card" key={review.name}>
          <Stars />
          <p>
            {review.text.split("\n\n").map((para, i) => (
              <span key={i}>
                {i > 0 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {para}
              </span>
            ))}
          </p>
          <div className="testimonial-meta">
            <div>
              <div className="testimonial-name">{review.name}</div>
              <div className="testimonial-source">{review.source}</div>
            </div>
            <div className="testimonial-source">
              {"priceRange" in review ? review.priceRange : review.date}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
