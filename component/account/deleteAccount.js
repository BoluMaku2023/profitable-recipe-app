const deleteAccount = () => {
  return (
    <div className="mt-12 h-auto max-w-2xl flex-col rounded-lg bg-primary px-10 py-8 shadow-lg">
      <h3 className="mb-7 text-xl font-bold text-bgPurple">Account Status</h3>
      <h3 className="my-6 text-dogwoodRose">
        Delete my account and all the information it contains
      </h3>
      <button className="flex max-h-24 w-auto items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose">
        Delete Account
      </button>
    </div>
  );
};

export default deleteAccount;
