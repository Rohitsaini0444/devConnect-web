export const BASE_URL = "https://rohitsdev.com/api";
export const PREMIUM_PLANS = [
    {
        name: "Silver",
        price: "₹199",
        period: "/month",
        description: "Great for getting started",
        features: [
            "Unlimited connections",
            "Connection suggestions",
            "Profile visibility",
            "Basic support",
        ],
        button: "Choose Silver",
        style: "border-slate-300",
        badge: "bg-slate-500",
    },
    {
        name: "Gold",
        price: "₹399",
        period: "/month",
        description: "For users who want more",
        features: [
            "Everything in Silver",
            "Advanced connection suggestions",
            "Priority profile visibility",
            "Premium badge",
            "Priority support",
        ],
        button: "Choose Gold",
        style: "border-yellow-400",
        badge: "bg-yellow-500",
    },
];