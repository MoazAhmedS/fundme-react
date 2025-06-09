import { useState } from "react";
import NumberInput from "./NumberInput";

function NumberExample() {
  const [age, setAge] = useState("");

  return (
    <div className="p-4 max-w-sm">
      <NumberInput
        label="Your Age"
        name="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        min={0}
        max={120}
        placeholder="Enter your age"
        error={age < 18 && age !== "" ? "You must be at least 18" : ""}
      />
    </div>
  );
}

export default NumberExample;