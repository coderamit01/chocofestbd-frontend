import { HomeSection } from "@/components/store/home/home-section";
import { ReviewsSlider } from "@/components/store/home/reviews-slider";
import { HOME_REVIEWS, REVIEW_AUTOPLAY_MS, REVIEWS_HEADING } from "@/config/store-home-rails";

export function ReviewsCarousel() {
  return (
    <HomeSection aria-label={REVIEWS_HEADING.title}>
      <ReviewsSlider {...REVIEWS_HEADING} reviews={HOME_REVIEWS} interval={REVIEW_AUTOPLAY_MS} />
    </HomeSection>
  );
}
