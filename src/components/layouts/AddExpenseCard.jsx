import { useForm } from "react-hook-form";
import { Input } from "../../Form/FormInputSelect.jsx";
import { addExpense } from "../../lib/supabse.js";
import { useUser } from "../../context/UserContext.jsx";

export const AddExpenseCard = ({ setOpen, open }) => {
  const { profile, refreshData } = useUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitHandler = async (data) => {
    const result = await addExpense({
      user_id: profile.id,
      title: data.expenseTitle,
      amount: data.amount,
      category: data.category,
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
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          <Input label="Title" inputType="text" placeholder="e.g. Pizza"
            validation={register} registerFor="expenseTitle" errors={errors} />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Amount (₹)</label>
              <input type="number" placeholder="300"
                className="w-full border-2 border-border rounded-md p-2"
                {...register("amount", { required: "Amount is required" })} />
            </div>
            <div>
              <label>Category</label>
              <select {...register("category")}>
                <option>Food</option>
                <option>Shopping</option>
                <option>Travel</option>
                <option>Bills</option>
              </select>
            </div>
          </div>
          <div>
            <label>Date</label>
            <input type="date" className="w-full border-2 border-border rounded-md p-2"
              {...register("date")} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-ink-2 hover:bg-ink-3 hover:text-ink">
              Save Expense
            </button>
            <button type="button" onClick={() => setOpen(!open)}
              className="bg-red hover:bg-red-light hover:bg-ink-2 hover:text-ink">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};