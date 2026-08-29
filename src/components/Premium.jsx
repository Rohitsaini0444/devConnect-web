import { PREMIUM_PLANS } from "../utils/constants";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const PremiumPlans = () => {
  const handlePlanSelect = async (planName) => {
    // Handle plan selection logic here
    const selectedPlan = PREMIUM_PLANS.find((plan) => plan.name === planName);
    const requestBody = {
      "amount": selectedPlan.price.replace("₹", ""),
      "currency": "INR",
      "membershipType": "silver"
    };
    const response = await axios.post(`${BASE_URL}/payment/create`, requestBody, { withCredentials: true });
    const data = response.data;
    console.log("Payment response:", data);
  }

  return (
    <section className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Upgrade Your Experience</h1>
          <p className="mt-3 text-base-content/60">
            Choose a plan that works best for you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {PREMIUM_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card border-2 ${plan.style} bg-base-100 shadow-xl`}
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>

                  <span
                    className={`badge ${plan.badge} badge-lg text-white`}
                  >
                    Premium
                  </span>
                </div>

                <p className="mt-2 text-base-content/60">
                  {plan.description}
                </p>

                <div className="my-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-base-content/60">
                    {plan.period}
                  </span>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="card-actions mt-auto">
                  <button
                    className={`btn w-full ${plan.name === "Gold"
                      ? "btn-warning"
                      : "btn-neutral"
                      }`}
                    onClick={() => handlePlanSelect(plan.name)}
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumPlans;
