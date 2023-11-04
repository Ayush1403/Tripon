import React from 'react';
import hg from '../ASSETS/inh.jpg';

function Product() {
  return (
    <div className="ml-10 flex flex-col">
      <img src={hg} alt="Product Image" className="w-[200px] h-[274px] rounded-lg object-cover" />
      <div className="w-pdt flex flex-row items-center justify-between mt-4">
        <div>
          <h3 className="font-fnt2 text-xl">Sikki art</h3>
          <h5 className="font-fnt2 text-sm">Description of the product</h5>
        </div>
        <button className="h-btn w-btn text-center flex items-center rounded-full p-5 text-sm text-white bg-primary">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Product;
