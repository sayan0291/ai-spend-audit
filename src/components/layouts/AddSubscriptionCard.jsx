import { useForm } from "react-hook-form";
import { Input } from "../../Form/FormInputSelect.jsx";
import { addSubscriptions } from "../../lib/supabse.js";
import { useUser } from "../../context/UserContext.jsx";

export const AddSubscriptionCard = ({ setOpen, open }) => {
  const { profile, refreshData } = useUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitHandler = async (data) => {
    const result = await addSubscriptions({
      user_id: profile.id,
      name: data.subscriptionName,
      amount: data.price,
      category: data.subscriptionCategory,
      billing_cycle: data.billingCycle.toLowerCase(),
      renewal_date: data.renewalDate,
    });
    if (result) {
      await refreshData();
      reset();
      setOpen(false);
    }
  };

  return (
    <div className="pop-up-card">
      <div className="pop-card-body">
        <h2>Add Subscription</h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          <Input label="Subscription Name" inputType="text" placeholder="Netflix"
            validation={register} registerFor="subscriptionName" errors={errors} />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Monthly Cost (₹)</label>
              <input type="number" className="w-full border-2 border-border rounded-md p-2"
                {...register("price", { required: "Price is required" })} />
            </div>
            <div>
              <label>Billing Cycle</label>
              <select {...register("billingCycle")}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <Input label="Category" inputType="text" placeholder="Entertainment"
            validation={register} registerFor="subscriptionCategory" errors={errors} />
          <div>
            <label>Renewal Date</label>
            <input type="date" className="w-full border-2 border-border rounded-md p-2"
              {...register("renewalDate")} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-ink-2 hover:bg-ink-3 hover:text-ink">
              Save Subscription
            </button>
            <button type="button" onClick={() => setOpen(!open)}
              className="bg-red hover:bg-red-light hover:bg-ink-2 hover:text-ink-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};