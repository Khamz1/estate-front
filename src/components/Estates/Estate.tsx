import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstates } from "../../features/estate.slice";

function Estate() {
  const estates = useSelector((state) => state.estates.estates);
  console.log(estates);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEstates());
  }, [dispatch]);
  return (
    <div>
      {estates.map((item)=>{
        return(
            <div>{item.desc}</div>
        )
     })}
    </div>
  );
}

export default Estate;
