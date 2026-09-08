import API from "../services/api";

const AddressCard = ({ address, refresh }) => {

  const handleDelete = async () => {
    try {
      await API.delete(`/addresses/${address.id}`);
      refresh();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-4 bg-black/60 border border-yellow-600/30 rounded-xl text-yellow-100 shadow-lg">

      <p className="font-semibold">{address.name}</p>
      <p>{address.phone}</p>
      <p>{address.street}</p>
      <p>{address.city}, {address.state}</p>
      <p>{address.pincode}</p>

      <button
        onClick={handleDelete}
        className="mt-3 text-red-400 hover:text-red-600"
      >
        Delete
      </button>

    </div>
  );
};

export default AddressCard;