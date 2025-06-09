  import { useState } from "react";
  import CheckboxInput from "../Checkbox/CheckboxInput";

  function CheckboxExample() {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="p-4">
        <CheckboxInput
          label="I agree to the terms"
          name="terms"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </div>
    );
  }

  export default CheckboxExample;
