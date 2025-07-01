const Basket = () => {
  return (
    <div>
      {/* Handle */}
      <div className="absolute top-[calc(53%-180px)] w-40 h-24 rounded-t-[100%] border-[10px] border-[#8b4513] border-b-0"></div>
      
      {/* Basket Body */}
      <div className="relative w-52 h-32 rounded-b-full bg-[saddlebrown] shadow-inner overflow-hidden">
        <div className="absolute top-[-20px] left-0 w-full h-5 bg-[#8b4513] rounded-t-full"></div>
        <div className="absolute inset-0 weave-overlay"></div>
      </div>
    </div>
  );
};

export default Basket;
