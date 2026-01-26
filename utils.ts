
export const IS_REPUBLIC_DAY_OFFER_ACTIVE = () => {
    const now = new Date();
    // Use the current date and time provided by the system for consistency
    // Today is 2026-01-26
    const offerEndDate = new Date('2026-01-26T23:50:00+05:30');
    const offerStartDate = new Date('2026-01-26T00:00:00+05:30');

    return now >= offerStartDate && now <= offerEndDate;
};

export const getDiscountedPrice = (price: number) => {
    if (!IS_REPUBLIC_DAY_OFFER_ACTIVE()) return price;

    if (price <= 1000) {
        return Math.round(price * 0.7); // 30% off
    } else {
        return Math.round(price * 0.5); // 50% off
    }
};

export const getDiscountPercentage = (price: number) => {
    if (!IS_REPUBLIC_DAY_OFFER_ACTIVE()) return 0;
    return price <= 1000 ? 30 : 50;
};
