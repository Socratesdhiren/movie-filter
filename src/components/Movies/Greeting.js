import { useState } from "react";

const Greeting = () => {
  const [isChange, setIsChange] = useState(false);

  const changeHandler = () => {
    setIsChange(true);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: " 30px" }}>
      <h2>Hello Unit Test World!</h2>
      {!isChange && <p>It's glad to see you!</p>}
      {isChange && <p>Changed!</p>}

      <button onClick={changeHandler}>Change text!</button>
    </div>
  );
};

export default Greeting;
